import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { register } from "./registerSlice";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <form className="">
      <h3>Register:</h3>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setConfirmPassword(event.target.value);
            }}
          />
        </label>
        <button onClick={handleSubmit}>Login</button>
        <Link to="/login">Login</Link>
    </form>
  );
};
