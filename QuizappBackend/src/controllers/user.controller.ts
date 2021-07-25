import { NextFunction, Request, Response } from "express";
import { UserService, QuizService } from "../services";

const uploadAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      throw new Error("No uploaded avatar found in controller");
    }

    const { userId } = req.params;
    const avatar = req.file.buffer;

    const updatedProfile = await UserService.uploadAvatar(
      Number(userId),
      avatar
    );

    return res.status(200).json({
      message: "avatar upload success!",
      user: updatedProfile,
    });
  } catch (error) {
    return next(error);
  }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;

    const user = await UserService.getProfile(Number(userId));

    return res.status(200).json({
      message: "Fetched profile",
      user: user,
    });
  } catch (error) {
    return next(error);
  }
};

export default { uploadAvatar, getProfile };
