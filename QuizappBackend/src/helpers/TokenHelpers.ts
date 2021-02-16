import { Request } from "express";
import jwt from "jsonwebtoken";

import { db, ROLES } from "../../prisma";
import { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET } from "../utils";

interface TokenContent {
  id: number;
  email: string;
  roles: ROLES[];
}

const extractTokenFromRequest = (req: Request): string => {
  const bearerHeader = req.headers.authorization?.split(" ");

  if (bearerHeader === undefined || bearerHeader[0] !== "Bearer") {
    throw new Error(
      "Access Denied, auth header must be of form `Bearer token`"
    );
  } else if (bearerHeader[1].split(".").length !== 3) {
    throw new Error("Invalid JWT Format");
  }

  return bearerHeader[1];
};

const generateAccessToken = async (
  tokenContent: TokenContent
): Promise<string> => {
  const user = await db.user.findUnique({
    where: {
      id: tokenContent.id,
    },
  });

  if (!user) {
    throw new Error("No user found, cannot generate token");
  }

  const newTokenContent: TokenContent = {
    id: user.id,
    email: user.email,
    roles: user.roles,
  };

  // Access tokens are generated on the fly and not stored due to short expire time
  return jwt.sign(newTokenContent, ACCESS_JWT_SECRET, { expiresIn: "30m" });
};

const generateAccessTokenFromRefreshToken = async (
  refreshToken: string
): Promise<string> => {
  const tokenContents = readRefreshToken(refreshToken) as TokenContent;

  const user = await db.user.findUnique({
    where: { id: tokenContents.id },
  });

  if (!user) {
    throw new Error("No user found, cannot generate token");
  }

  // Access tokens are generated on the fly and not stored due to short expire time
  return generateAccessToken({
    id: tokenContents.id,
    email: tokenContents.email,
    roles: tokenContents.roles,
  });
};

const readAccessToken = (token: string): TokenContent => {
  const decoded = jwt.verify(token, ACCESS_JWT_SECRET);

  if (typeof decoded === "string") {
    throw new Error("JWT decoded to string");
  } else {
    return { ...decoded } as TokenContent;
  }
};

const generateRefreshToken = async (
  tokenContent: TokenContent
): Promise<string> => {
  const user = await db.user.findUnique({
    where: {
      id: tokenContent.id,
    },
  });

  if (!user) {
    throw new Error("No user found, cannot generate token");
  }

  /* Refresh tokens are generated and stored so they can be
    potentially invalidated (deleted) before their longer expiration 
    TODO: Automatically clean up expired stored tokens because they are no longer useful
    */
  const token = jwt.sign(tokenContent, REFRESH_JWT_SECRET, {
    expiresIn: "7d",
  });

  const newRefreshToken = await db.token.create({
    data: {
      token: token,
    },
  });

  return newRefreshToken.token;
};

const generateRefreshTokenFromRefreshToken = async (
  refreshToken: string
): Promise<string> => {
  const tokenContent = readRefreshToken(refreshToken) as TokenContent;

  const user = await db.user.findUnique({
    where: {
      id: tokenContent.id,
    },
  });

  if (!user) {
    throw new Error("No user found, cannot generate token");
  }

  // Invalidate / delete previous token
  await db.token.delete({
    where: {
      token: refreshToken,
    },
  });

  return generateRefreshToken({
    id: user.id,
    email: user.email,
    roles: user.roles,
  });
};

const readRefreshToken = (token: string): TokenContent => {
  const decoded = jwt.verify(token, REFRESH_JWT_SECRET);

  if (typeof decoded === "string") {
    throw new Error("JWT decoded to string");
  } else {
    return { ...decoded } as TokenContent;
  }
};

export {
  generateAccessToken,
  generateAccessTokenFromRefreshToken,
  generateRefreshToken,
  generateRefreshTokenFromRefreshToken,
  readAccessToken,
  readRefreshToken,
  extractTokenFromRequest,
  TokenContent
};
