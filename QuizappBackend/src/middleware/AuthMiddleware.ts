import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenContent } from "../models";
import { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET, ROLES } from "../utils";

const hasValidAccessToken = (
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

  const access_token = bearerHeader[1];

  if (!access_token) {
    return res.status(401).json({ error: "Access Denied, token missing" });
  } else {
    try {
      /* If the incoming request has a valid token, we extract the 
      payload from the token and attach it to the request object */

      jwt.verify(
        access_token,
        ACCESS_JWT_SECRET,
        // eslint-disable-next-line @typescript-eslint/ban-types
        function (err: jwt.VerifyErrors | null, payload: object | undefined) {
          const decoded = { ...payload } as TokenContent;
          if (err) {
            throw err;
          }

          if (decoded) {
            req.user = decoded.user;
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

const hasValidAccessTokenAndRole = (role: ROLES) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return hasValidAccessToken(req, res, function () {
    // if (req.user.role !== role) {
    //   return res.status(401).json({
    //     error:
    //       "You do not have the required permissions to access this content",
    //   });
    // }

    console.log(req.user);

    next();
  });
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
            req.body = {...req.body, refresh_token: refresh_token};
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

export { hasValidAccessToken, hasValidAccessTokenAndRole, hasValidRefreshToken };
