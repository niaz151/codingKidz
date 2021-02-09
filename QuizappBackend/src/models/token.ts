import mongoose from "mongoose";

// Refresh token

export type TokenContent = {
  user: {
    _id: string;
    email: string;
    role: string;
  };
};

export interface IToken extends mongoose.Document {
  token: string;
}

const TokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
});

export const Token: mongoose.Model<IToken> = mongoose.model(
  "Token",
  TokenSchema
);
