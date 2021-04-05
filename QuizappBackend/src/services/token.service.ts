import jwt from "jsonwebtoken";
import { Request } from "express";

import { DataStoredInToken } from "../interfaces/auth.interface";
import {
  ACCESS_EXPIRATION_TIME,
  ACCESS_JWT_SECRET,
  REFRESH_EXPIRATION_TIME,
  REFRESH_JWT_SECRET,
} from "../utils";
import { db } from "../prisma";
import { HttpException } from "../exceptions";

const extractTokenFromRequest = (req: Request): string => {
  const bearerHeader = req.headers.authorization?.split(" ");

  if (bearerHeader === undefined || bearerHeader[0] !== "Bearer") {
    throw new HttpException(
      400,
      "Access Denied, auth header must be of form `Bearer token`"
    );
  } else if (bearerHeader[1].split(".").length !== 3) {
    throw new HttpException(400, "Invalid JWT Format");
  }

  return bearerHeader[1];
};

const createAccessToken = (data: DataStoredInToken) => {
  return jwt.sign(data, ACCESS_JWT_SECRET, {
    expiresIn: ACCESS_EXPIRATION_TIME,
  });
};

const createRefreshToken = async (data: DataStoredInToken) => {
  const storeToken = await db.token.create({
    data: {
      token: jwt.sign(data, REFRESH_JWT_SECRET, {
        expiresIn: REFRESH_EXPIRATION_TIME,
      }),
    },
  });

  return storeToken.token;
};

const readAccessToken = (token: string): DataStoredInToken => {
  const decoded = jwt.verify(token, ACCESS_JWT_SECRET);

  if (typeof decoded === "string") {
    throw new Error("JWT decoded to string");
  } else {
    return { ...decoded } as DataStoredInToken;
  }
};

const readRefreshToken = (token: string): DataStoredInToken => {
  const decoded = jwt.verify(token, REFRESH_JWT_SECRET);

  if (typeof decoded === "string") {
    throw new Error("JWT decoded to string");
  } else {
    return { ...decoded } as DataStoredInToken;
  }
};

export default {
  extractTokenFromRequest,
  createAccessToken,
  createRefreshToken,
  readAccessToken,
  readRefreshToken,
};
