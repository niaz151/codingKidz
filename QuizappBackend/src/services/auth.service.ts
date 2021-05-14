import { Profile, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { HttpException } from "../exceptions";
import { db, ROLES } from "../prisma";
import { TokenService, UserService } from "./index";

const signup = async (
  email: User["email"],
  password: User["password"],
  role: ROLES,
  birthday: Profile["birthday"]
) => {
  const newUser = await UserService.createUser(email, password, role);
  await UserService.createProfile(newUser.id, birthday);

  const accessToken = TokenService.createAccessToken({
    id: newUser.id,
    email: newUser.email,
    roles: newUser.roles,
  });

  const refreshToken = await TokenService.createRefreshToken({
    id: newUser.id,
    email: newUser.email,
    roles: newUser.roles,
  });

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

const login = async (email: User["email"], password: User["password"]) => {
  const user = await UserService.findUserByEmail(email);

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) throw new HttpException(403, "Incorrect password");

  const accessToken = TokenService.createAccessToken({
    id: user.id,
    email: user.email,
    roles: user.roles,
  });

  const refreshToken = await TokenService.createRefreshToken({
    id: user.id,
    email: user.email,
    roles: user.roles,
  });

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

const logout = async (token: string) => {
  const deletedToken = await db.token.delete({
    where: {
      token: token,
    },
  });

  return deletedToken;
};

export default { signup, login, logout };
