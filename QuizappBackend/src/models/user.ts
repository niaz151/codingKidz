import mongoose from "mongoose";

import { ROLES } from "../utils";
export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  role: ROLES;
}

export const User: mongoose.Model<IUser> = mongoose.model(
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
