import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { signIn, getUser } from "services/api";
import { useForm } from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message'

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const Register: React.FC = () => {
  const [registerSucceeded, setRegisterSucceeded] = useState(false);
  const { register, handleSubmit, errors } = useForm<Inputs>();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.log("Loaded Register");
    }

    if(getUser()) {
      setRegisterSucceeded(true)
    }
  }, []);

  const onSubmit = handleSubmit((data) => {
    signIn(data.email, data.password).then(
      () => {
        setRegisterSucceeded(true)
      },
      (error) => {
        setRegisterSucceeded(false)
      }
    );
  });

  const RegisterForm = () => {
    return (
      <>
      <form onSubmit={onSubmit}>
        <h3>Register:</h3>
        <label>Email:</label>
        <input name="email" placeholder="Enter email..." ref={register({required: "Email is required"})}/>
        <ErrorMessage errors={errors} name="email"/>
        <label>Password:</label>
        <input name="password" type="password" placeholder="Enter password..." ref={register({required: "Password is required"})}/>
        <ErrorMessage errors={errors} name="password"/>
        <input name="confirmPassword" type="password" placeholder="Enter password again..." ref={register({required: "Confirm Password is required"})}/>
        <ErrorMessage errors={errors} name="password"/>
        <input type="submit" value="Register"/>
      </form>
      <Link to="/passwordreset">Reset Password</Link>
      <Link to="/login">Back to Login</Link>
      </>
    );
  };

  return registerSucceeded ? <Redirect to="/" /> : <RegisterForm/>
};
