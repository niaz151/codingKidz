import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User: mongoose.Model<IUser> = mongoose.model("User", UserSchema);
