import mongoose from "mongoose";

import { ROLES } from "../utils";
export interface IUser {
  email: string;
  password: string;
  role: ROLES;
}

interface IUserDoc extends IUser, mongoose.Document {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IUserModel extends mongoose.Model<IUserDoc> {}

export const User: mongoose.Model<IUserDoc & IUserModel> = mongoose.model(
  "User",
  new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["STUDENT", "TEACHER", "ADMIN"],
    },
  })
);
