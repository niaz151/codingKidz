import { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth.service";
import { TokenService, UserService } from "../services";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, role, birthday } = req.body;

    const { accessToken, refreshToken } = await AuthService.signup(
      email,
      password,
      role,
      new Date(birthday)
    );

    return res.json({
      message: "Signup Successful",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    return next(error);
  }
};

const logIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await AuthService.login(
      email,
      password
    );

    return res.json({
      message: "Login Successful",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    return next(error);
  }
};

const logOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = TokenService.extractTokenFromRequest(req);

    const deleteToken = await AuthService.logout(refreshToken);

    return res.json({
      message: "Logout successful",
    });
  } catch (error) {
    return next(error);
  }
};

const listUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserService.findAllUsers();

    return res.json({
      message: "Successfully fetched all users",
      users: users,
    });
  } catch (error) {
    return next(error);
  }
};

const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshTokenData = TokenService.readRefreshToken(
      TokenService.extractTokenFromRequest(req)
    );

    const newAccessToken = TokenService.createAccessToken(refreshTokenData);

    return res.json({
      access_token: newAccessToken,
    });
  } catch (error) {
    return next(error);
  }
};

const refreshRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshTokenData = TokenService.readRefreshToken(
      TokenService.extractTokenFromRequest(req)
    );

    const newRefreshToken = await TokenService.createRefreshToken(
      refreshTokenData
    );

    return res.json({
      refresh_token: newRefreshToken,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(400).json({
        error: "Token previously invalidated, please log in again",
      });
    }

    return next(error);
  }
};

export default {
  signUp,
  logIn,
  logOut,
  listUsers,
  refreshAccessToken,
  refreshRefreshToken,
};
