import { User } from "@prisma/client";
import { HttpException } from "../exceptions";
import { db, ROLES } from "../prisma";
import bcrypt from "bcrypt";

const findAllUsers = async () => {
  const users = await db.user.findMany({});

  if (!users) throw new HttpException(404, "No users");

  return users;
};

const findUserById = async (userId: User["id"]) => {
  const user = await db.user.findUnique({ where: { id: userId } });

  if (!user) throw new HttpException(404, "User not found");

  return user;
};

const findUserByEmail = async (email: User["email"]) => {
  const user = await db.user.findUnique({ where: { email: email } });

  if (!user) throw new HttpException(404, "User not found");

  return user;
};

const createUser = async (
  email: User["email"],
  password: string,
  role: ROLES
) => {
  const existingUser = await db.user.findUnique({ where: { email: email } });

  if (existingUser) throw new HttpException(409, "User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.user.create({
    data: {
      email: email,
      password: hashedPassword,
      roles: role,
    },
  });

  if (!newUser) throw new HttpException(500, "Error creating new user");

  return newUser;
};

const updatePassword = async (userId: User["id"], newPassword: string) => {
  const existingUser = await db.user.findUnique({ where: { id: userId } });
  if (!existingUser) throw new HttpException(404, "User not found");

  const newHash = await bcrypt.hash(newPassword, 10);

  const updatedUser = await db.user.update({
    where: {
      id: userId,
    },
    data: {
      password: newHash,
    },
  });

  return updatedUser;
};

const deleteUser = async (userId: User["id"]) => {
  const user = await db.user.delete({
    where: {
      id: userId,
    },
  });

  if (!user) throw new HttpException(404, "User not found");

  return user;
};

export default {
  findAllUsers,
  findUserByEmail,
  findUserById,
  createUser,
  updatePassword,
  deleteUser,
};
