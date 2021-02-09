import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Token, TokenContent } from "../models";
import { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET } from "../utils";
import { body, validationResult } from "express-validator";
import {
  generateAccessToken,
  readAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateRefreshToken,
  readRefreshToken,
  generateAccessTokenFromRefreshToken,
  generateRefreshTokenFromRefreshToken,
} from "../controllers";

const authRouter = Router();

// @route POST /api/auth/signup
authRouter.post(
  "/auth/signup",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    // Deal with validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // If no validation errors occured, these fields will exist
    const { email, password } = req.body;

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
    });

    const tokenContent: TokenContent = {
      user: { _id: newUser._id, email: newUser.email },
    };

    // Generate access token, used for accessing API in the future
    const access_token = generateAccessToken(tokenContent);

    // Generate refresh token, used for getting new access tokens in the future
    const refresh_token = generateRefreshToken(tokenContent);

    return res.json({
      message: "Signup Successful",
      access_token: access_token,
      refresh_token: refresh_token,
    });
  }
);

// @route POST /api/auth/login
authRouter.post(
  "/auth/login",
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
      user: { _id: user._id, email: user.email },
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
  "/auth/refresh_access",
  body("refresh_token").isString(),
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
      refresh_token: newRefreshToken
    });
  }
);

// authRouter.post(
//   "/auth/token_test",
//   body("refresh_token").isString(),
//   body("access_token").isString(),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(403).json({
//         error: errors.array(),
//       });
//     }

//     const { refresh_token, access_token } = req.body;

//     const user = await User.findOne({ email: "test@test.com" });

//     const testTokenContent: TokenContent = {
//       user: {
//         _id: user!._id,
//         email: user!.email,
//       },
//     };

//     console.log("doing a lot");
//     const readAccess = readAccessToken(access_token);
//     const verifyAccess = verifyAccessToken(access_token);
//     const newAccessToken = await generateAccessToken(testTokenContent);
//     const readNewAccess = readAccessToken(newAccessToken);

//     const readRefresh = readRefreshToken(refresh_token);
//     const verifyRefresh = verifyRefreshToken(refresh_token);
//     const newRefreshToken = await generateRefreshToken(testTokenContent);

//     console.log("creating access from refresh");
//     const newAccessFromRefresh = await generateAccessTokenFromRefreshToken(
//       refresh_token
//     );

//     console.log("creating refresh from refresh");
//     const newRefreshFromRefresh = await generateRefreshTokenFromRefreshToken(
//       refresh_token
//     );

//     return res.json({
//       readAccess: readAccess,
//       verifyAccess: verifyAccess,
//       newAccess: newAccessToken,
//       readNewAccess: readNewAccess,
//       readRefresh: readRefresh,
//       verifyRefresh: verifyRefresh,
//       newRefreshToken: newRefreshToken,
//       newAccessFromRefresh: newAccessFromRefresh,
//       newRefreshFromRefresh: newRefreshFromRefresh,
//     });
//   }
// );

export { authRouter };
