import mongoose from "mongoose";

/* Refresh tokens are stored so that they can be
 invalidated before their longer expiration time */

export type TokenContent = {
  user: {
    _id: string;
    email: string;
    role: string;
  };
};

export interface IToken {
  token: string;
}

// Define statics here eg Token.deleteByEmail("test@test.com")
interface ITokenDoc extends IToken, mongoose.Document {

}

// Define methods here eg tokenOne.doSomethingToThatToken()
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ITokenModel extends mongoose.Model<ITokenDoc> {}

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
});

export const Token: mongoose.Model<ITokenDoc & ITokenModel> = mongoose.model(
  "Token",
  tokenSchema
);
