import { Router } from "express";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import {
  generateAccessToken,
  generateRefreshToken,
  generateAccessTokenFromRefreshToken,
  generateRefreshTokenFromRefreshToken,
  extractTokenFromRequest,
} from "../helpers";

import { db } from "../../prisma";

import { hasValidRefreshToken } from "../middleware";

const authRouter = Router();

// @route POST /api/auth/signup
authRouter.post(
  "/signup",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
  body("role"),
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

    if (
      await db.user.findUnique({
        where: {
          email: email,
        },
      })
    ) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Generate hash with 10 rounds
    const hash = await bcrypt.hash(password, 10);

    // Save email and hash into new user
    const newUser = await db.user.create({
      data: {
        email: email,
        password: hash,
        roles: [role],
      },
    });

    // Generate access token, used for accessing API in the future
    const access_token = await generateAccessToken({
      id: newUser.id,
      email: newUser.email,
      roles: newUser.roles,
    });

    // Generate refresh token, used for getting new access tokens in the future
    const refresh_token = await generateRefreshToken({
      id: newUser.id,
      email: newUser.email,
      roles: newUser.roles,
    });

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
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

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

    // Generate access token, used for accessing API in the future
    const access_token = await generateAccessToken({
      id: user.id,
      email: user.email,
      roles: user.roles,
    });

    // Generate refresh token, used for getting new access tokens in the future
    const refresh_token = await generateRefreshToken({
      id: user.id,
      email: user.email,
      roles: user.roles,
    });

    return res.json({
      message: "Login Successful",
      access_token: access_token,
      refresh_token: refresh_token,
    });
  }
);

// Refresh access and refresh tokens from refresh token
authRouter.post("/refresh_access", hasValidRefreshToken, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json({
      error: errors.array(),
    });
  }

  const refresh_token = extractTokenFromRequest(req);

  try {
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
  } catch (error) {
    if(error.code === "P2025") {
      return res.status(400).json({
        error: "Token previously invalidated, please log in again"
      });
    }
    return res.status(500).json({
      error: error,
    });
  }
});

authRouter.get("/users",
// hasRole(["ADMIN"]), 
async (req, res) => {
  const users = await db.user.findMany();

  return res.json({
    message: "Succesfully fetched users",
    users: users,
  });
});

export { authRouter };
