import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { signIn, getUser } from "services/api";
import { useForm } from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message'

type Inputs = {
  email: string;
  password: string;
};

export const Login: React.FC = () => {
  const [loginSucceeded, setLoginSucceeded] = useState(false);
  const { register, handleSubmit, errors } = useForm<Inputs>();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.log("Loaded Login");
    }

    if(getUser()) {
      setLoginSucceeded(true)
    }
  }, []);

  const onSubmit = handleSubmit((data) => {
    signIn(data.email, data.password).then(
      () => {
        setLoginSucceeded(true)
      },
      (error) => {
        setLoginSucceeded(false)
      }
    );
  });

  const LoginForm = () => {
    return (
      <>
      <form onSubmit={onSubmit}>
        <h3>Login:</h3>
        <label>Email:</label>
        <input name="email" placeholder="Enter email..." ref={register({required: "Email is required"})}/>
        <ErrorMessage errors={errors} name="email"/>
        <label>Password:</label>
        <input name="password" type="password" placeholder="Enter password..." ref={register({required: "Password is required"})}/>
        <ErrorMessage errors={errors} name="password"/>
        <input type="submit" value="Login"/>
      </form>
      <Link to="/passwordreset">Reset Password</Link>
      <Link to="/register">Register</Link>
      </>
    );
  };

  return loginSucceeded ? <Redirect to="/" /> : <LoginForm/>
};
