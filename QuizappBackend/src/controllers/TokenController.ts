import jwt from "jsonwebtoken";

import { Token, User, TokenContent } from "../models";
import { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET } from "../utils";

const generateAccessToken = async (
  tokenContent: TokenContent
): Promise<string> => {
  const user = await User.findOne({ _id: tokenContent.user._id });

  if (!user) {
    throw new Error("No user found, cannot generate token");
  }

  // Access tokens are generated on the fly and not stored due to short expire time
  return jwt.sign(tokenContent, ACCESS_JWT_SECRET, { expiresIn: "30m" });
};

const generateAccessTokenFromRefreshToken = async (
  refreshToken: string
): Promise<string> => {
  const tokenContents = readRefreshToken(refreshToken) as TokenContent;

  const user = await User.findOne({ _id: tokenContents.user._id });

  if (!user) {
    throw new Error("No user found, cannot generate token");
  }

  const newTokenContents: TokenContent = {
    user: {
      _id: tokenContents.user._id,
      email: tokenContents.user.email,
      role: tokenContents.user.role
    },
  };

  // Access tokens are generated on the fly and not stored due to short expire time
  return generateAccessToken(newTokenContents);
};

const verifyAccessToken = (token: string) => {
  const decoded = jwt.verify(token, ACCESS_JWT_SECRET);

  return decoded;
};

const readAccessToken = (token: string) => {
  const decoded = jwt.verify(token, ACCESS_JWT_SECRET);

  return decoded;
};

const generateRefreshToken = async (
  tokenContent: TokenContent
): Promise<string> => {
  const user = await User.findOne({ _id: tokenContent.user._id });

  if (!user) {
    throw new Error("No user found, cannot generate token");
  }

  /* Refresh tokens are generated and stored so they can be
    potentially invalidated (deleted) before their longer expiration 
    TODO: Automatically clean up expired stored tokens because they are no longer useful
    */
  const token = jwt.sign(tokenContent, REFRESH_JWT_SECRET, {
    expiresIn: "30m",
  });

  const newRefreshToken = await Token.create({ token: token });

  return newRefreshToken.token;
};

const generateRefreshTokenFromRefreshToken = async (
  refreshToken: string
): Promise<string> => {
  const tokenContents = readRefreshToken(refreshToken) as TokenContent;

  const user = await User.findOne({ _id: tokenContents.user._id });

  if (!user) {
    throw new Error("No user found, cannot generate token");
  }

  const newTokenContents: TokenContent = {
    user: {
      _id: tokenContents.user._id,
      email: tokenContents.user.email,
      role: tokenContents.user.role
    },
  };

  // Delete previous token
  await Token.findOneAndDelete({token: refreshToken});

  // Access tokens are generated on the fly and not stored due to short expire time
  return generateRefreshToken(newTokenContents);
};

const verifyRefreshToken = (token: string) => {
  try {
    readAccessToken(token);
    return true;
  } catch {
    return false;
  }
};

const readRefreshToken = (token: string) => {
  const decoded = jwt.verify(token, REFRESH_JWT_SECRET);

  return decoded;
};

export {
  generateAccessToken,
  generateAccessTokenFromRefreshToken,
  generateRefreshToken,
  generateRefreshTokenFromRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  readAccessToken,
  readRefreshToken,
};
