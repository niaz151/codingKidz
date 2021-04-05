import { HttpException } from "../exceptions";
import { Request, Response, NextFunction } from "express";
import { logger } from "../utils";
import { validationResult } from "express-validator";

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || "Something went wrong";

    logger.error(`StatusCode : ${status}, Message : ${message}`);
    return res.status(status).json({ message });
  } catch (error) {
    return next(error);
  }
};

const checkForValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  return next();
};

export default { errorMiddleware, checkForValidationErrors };
