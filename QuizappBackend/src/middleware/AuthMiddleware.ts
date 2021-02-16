import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db, ROLES } from "../../prisma";
import {
  extractTokenFromRequest,
  readAccessToken,
  TokenContent,
} from "../helpers";
import { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET } from "../utils";

const hasValidAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /* If the incoming request has a valid token, we extract the 
      payload from the token and attach it to the request object */

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
          req.user = decoded;
        } else {
          return res.status(500).json({
            error: "Unable to decode token, please try again later",
          });
        }
      }
    );

    next();
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
      return res.status(400).json({ error });
    }
  }
};

const hasRole = (role: ROLES) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const access_token_contents = readAccessToken(extractTokenFromRequest(req));

    if (access_token_contents.roles.includes(role)) {
      next();
    } else {
      // TODO Add status
      return res.json({
        message: "Access denied, you do not have the required permission",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Error reading role",
    });
  }
};

const hasValidRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers.authorization?.split(" ");

  if (bearerHeader === undefined) {
    return res.status(401).json({
      error: "Access Denied, auth header must be of form `Bearer token`",
    });
  }

  if (bearerHeader[0] !== "Bearer") {
    return res.status(401).json({
      error: "Access Denied, auth header must be of form `Bearer token`",
    });
  }

  const refresh_token = bearerHeader[1];

  if (!refresh_token) {
    return res.status(401).json({ error: "Access Denied, token missing" });
  } else {
    try {
      /* If the incoming request has a valid token, we extract the 
      payload from the token and attach it to the request object */

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

      next();
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
        return res.status(400).json({ error });
      }
    }
  }
};

export {
  hasValidAccessToken,
  hasValidRefreshToken,
  hasRole
};
