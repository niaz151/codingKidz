import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { login } from "./loginSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div>
      <h3>Login:</h3>
      <div>
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
        <button onClick={handleSubmit}>Login</button>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};
