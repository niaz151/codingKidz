import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db, ROLES } from "../../prisma";
import {
  extractTokenFromRequest,
  readAccessToken,
  TokenContent,
} from "../helpers";
import { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET } from "../utils";
import { Logger } from "../utils";

const hasValidAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const access_token = extractTokenFromRequest(req);

    jwt.verify(
      access_token,
      ACCESS_JWT_SECRET,
      // eslint-disable-next-line @typescript-eslint/ban-types
      function (err: jwt.VerifyErrors | null, payload: object | undefined) {
        const decoded = { ...payload };
        if (err) {
          throw err;
        }

        if (decoded) {
          return next();
        } else {
          return res.status(500).json({
            error: "Unable to decode token, please try again later",
          });
        }
      }
    );
  } catch (error) {
    // token can be expired or invalid. Send appropriate errors in each case:
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Session timed out, please login again" });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ error: "Invalid token, please login again" });
    } else {
      //catch other unprecedented errors
      console.error(error);
      return res.status(400).json({ error });
    }
  }
};

const hasValidRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /* If the incoming request has a valid token, we extract the 
      payload from the token and attach it to the request object */
    const refresh_token = extractTokenFromRequest(req);

    jwt.verify(
      refresh_token,
      REFRESH_JWT_SECRET,
      // eslint-disable-next-line @typescript-eslint/ban-types
      function (err: jwt.VerifyErrors | null, payload: object | undefined) {
        const decoded = { ...payload } as TokenContent;
        if (err) {
          throw err;
        }

        if (decoded) {
          req.body = { ...req.body, refresh_token: refresh_token };
        } else {
          return res.status(500).json({
            error: "Unable to decode token, please try again later",
          });
        }
      }
    );

    return next();
  } catch (error) {
    // token can be expired or invalid. Send appropriate errors in each case:
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Session timed out, please login again" });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ error: "Invalid token, please login again!" });
    } else {
      //catch other unprecedented errors
      console.error(error);
      return res.status(500).json({ error });
    }
  }
};

// Accepts a list of acceptable roles for the route
const hasRole = (roles: ROLES[]) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const access_token_contents = readAccessToken(extractTokenFromRequest(req));

    const filteredRoles = roles.filter((role) => {
      return access_token_contents.roles.includes(role);
    });

    if (filteredRoles.length > 0) {
      return next();
    }

    return res.status(400).json({
      message: "Access denied, you do not have the required permission",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error reading role",
    });
  }
};

export { hasValidAccessToken, hasValidRefreshToken, hasRole };
