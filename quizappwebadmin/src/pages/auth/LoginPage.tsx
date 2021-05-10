import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../ducks/hooks";
import { login } from "./authSlice";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onSubmit = () => {
    if (email && password) {
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
      <button onClick={onSubmit}>Login</button>
      <Link to="/register">
        <button>Go to Register</button>
      </Link>
    </div>
  );
};

export default LoginPage;
