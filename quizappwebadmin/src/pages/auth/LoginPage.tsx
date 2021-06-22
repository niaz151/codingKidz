import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../ducks/hooks";
import { login } from "./authSlice";

import Button from "react-bootstrap/Button";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    if (!email || !password) {
      alert("Please fill out form!")
    } else {
      dispatch(login({ email: email, password: password }));
    }
  };

  return (
    <div className="flex flex-col">
      <form>
        <label>Email</label>
        <input
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </form>
      <Button onClick={onSubmit}>Login</Button>
      <Link to="/register">
        <Button>Go to Register</Button>
      </Link>
    </div>
  );
};

export default LoginPage;
