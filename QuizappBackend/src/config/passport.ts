import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  Strategy as JWTstrategy,
  ExtractJwt as ExtractJWT,
} from "passport-jwt";
import { User, IUser } from "../models";
import { JWT_SECRET } from "../utils/index";
import { CallbackError } from "mongoose";

export default function (): void {
  passport.use(
    "signup",
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await User.create({ email, password });

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        User.findOne({ email }, function (err: CallbackError, user: IUser) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          if (!user.isValidPassword(password)) {
            return done(null, false);
          }

          return done(null, user);
        });
      }
    )
  );

  passport.use(
    "JWT",
    new JWTstrategy(
      {
        secretOrKey: JWT_SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
}
