import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends mongoose.Document {
  email: string;
  password: string;

  isValidPassword: (password: string) => boolean;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre<IUser>("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // salt 10 rounds
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    next();
  });
});

// methods are defined on an instance (Document) of UserSchema
UserSchema.methods.isValidPassword = async function (password: string) {
  // workaround to get this to be IUser not Document<Any>
  const user = this as IUser;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

export const User: mongoose.Model<IUser> = mongoose.model("User", UserSchema);