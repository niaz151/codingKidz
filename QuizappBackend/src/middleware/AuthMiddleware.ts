import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_JWT_SECRET } from "../utils";
import { TokenContent } from "../models";

const checkAccess = (req: Request, res: Response, next: NextFunction) => {
  const { access_token } = req.body;

  if (!access_token) {
    return res.status(401).json({ error: "Access Denied, token missing" });
  } else {
    try {
      //if the incoming request has a valid token, we extract the payload from the token and attach it to the request object.
      // const payload = jwt.verify(access_token, ACCESS_JWT_SECRET);
      // if (typeof payload === "string") {
      //   throw new Error("Weird payload");
      // } else {

      //   req.user = payload.user as TokenContent;
      // }

      jwt.verify(
        access_token,
        ACCESS_JWT_SECRET,
        // eslint-disable-next-line @typescript-eslint/ban-types
        function (err: jwt.VerifyErrors | null, decoded: object | undefined) {
          if (err) {
            throw err;
          }

          console.log(decoded);
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

export { checkAccess };
