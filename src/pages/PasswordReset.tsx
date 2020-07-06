import React, { useEffect, useState } from "react";
import { resetPassword } from "services/api";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type Inputs = {
  email: string;
};

export const PasswordReset: React.FC = () => {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, errors } = useForm<Inputs>();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.log("Loaded Password Reset");
    }
  }, []);

  const onSubmit = handleSubmit((data) => {
    resetPassword(data.email).then(
      () => {
        setSent(true);
      },
      (error) => {
        setSent(false);
      }
    );
  });

  const PasswordResetForm = () => {
    return (
      <>
        <form onSubmit={onSubmit}>
          <h3>Reset Password:</h3>
          <label>Email:</label>
          <input
            name="email"
            placeholder="Enter Email..."
            ref={register({ required: "Email is required" })}
          />
          <ErrorMessage errors={errors} name="email" />
          <input type="submit" value="resetPassword" />
        </form>
        <Link to="/login">Go to Login</Link>
        <Link to="/register">Go to Register</Link>
      </>
    );
  };

  return sent ? <p>Check your email!</p> : <PasswordResetForm />;
};
