import { Router } from "express";
import bcrypt from "bcrypt";
import { User, TokenContent } from "../models";
import { body, validationResult } from "express-validator";
import {
  generateAccessToken,
  generateRefreshToken,
  generateAccessTokenFromRefreshToken,
  generateRefreshTokenFromRefreshToken,
} from "../helpers";
import { ROLES } from "../utils";
import { hasValidRefreshToken } from "../middleware";

const authRouter = Router();

// @route POST /api/auth/signup
authRouter.post(
  "/signup",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
  body("role").custom((val) => {
    return (
      val === ROLES.Student || val === ROLES.Teacher || val === ROLES.Admin
    );
  }),
  async (req, res) => {
    // Deal with validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // If no validation errors occured, these fields will exist
    const { email, password, role } = req.body;

    // Check to see if user already exists

    if (await User.findOne({ email })) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Generate hash with 10 rounds
    const hash = await bcrypt.hash(password, 10);

    // Save email and hash into new user
    const newUser = await User.create({
      email: email,
      password: hash,
      role: role,
    });

    const tokenContent: TokenContent = {
      user: { _id: newUser._id, email: newUser.email, role: newUser.role },
    };

    // Generate access token, used for accessing API in the future
    const access_token = await generateAccessToken(tokenContent);

    // Generate refresh token, used for getting new access tokens in the future
    const refresh_token = await generateRefreshToken(tokenContent);

    return res.json({
      message: "Signup Successful",
      access_token: access_token,
      refresh_token: refresh_token,
    });
  }
);

// @route POST /api/auth/login
authRouter.post(
  "/login",
  body("email").isEmail().normalizeEmail(),
  body("password").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({
        error: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Confirm user exists before continuing
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({
        message: "User doesn't exist",
      });
    }

    // Check password against hash
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(500).json({
        message: "Incorrect password",
      });
    }

    const tokenContent: TokenContent = {
      user: { _id: user._id, email: user.email, role: user.role },
    };

    // Generate access token, used for accessing API in the future
    const access_token = await generateAccessToken(tokenContent);

    // Generate refresh token, used for getting new access tokens in the future
    const refresh_token = await generateRefreshToken(tokenContent);

    return res.json({
      message: "Login Successful",
      access_token: access_token,
      refresh_token: refresh_token,
    });
  }
);

// @route POST /api/auth/refresh_access
authRouter.post(
  "/refresh_access",
  hasValidRefreshToken,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({
        error: errors.array(),
      });
    }

    const { refresh_token } = req.body;

    const newAccessToken = await generateAccessTokenFromRefreshToken(
      refresh_token
    );

    const newRefreshToken = await generateRefreshTokenFromRefreshToken(
      refresh_token
    );

    return res.json({
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    });
  }
);

export { authRouter };
