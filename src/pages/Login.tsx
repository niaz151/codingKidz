import React, { useEffect, useState } from "react";
import { RouteComponentProps, useNavigate } from "@reach/router";
import { signIn } from "ducks/api";

interface Props extends RouteComponentProps {}

export const Login: React.FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.log("Loaded Login");
    }
  }, []);

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    signIn(email, password).then(
      () => {
        console.log("signed in, should auto redirect");
      },
      (error) => {
        alert(error);
      }
    );
  };

  const goToRegister = () => {
    navigate("/register");
  };

  const goToPasswordReset = () => {
    navigate("/passwordreset");
  };

  return (
    <form className="">
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
        <button onClick={goToPasswordReset}>Reset Password</button>
        <button onClick={goToRegister}>Sign Up</button>
      </div>
    </form>
  );
};
