import { RouteComponentProps, useNavigate } from "@reach/router";
import React, { useEffect, useState } from "react";
import { register } from "ducks/api";

interface Props extends RouteComponentProps {}

export const Register: React.FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.log("Loaded Register");
    }
  }, []);

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    if (password === confirmPassword) {
      register(email, password).then(
        () => {
          console.log("registered, going back to login...");
          navigate("/");
        },
        (error) => {
          alert(error);
        }
      );
    } else {
      alert("Passwords must match!");
      setPassword("");
      setConfirmPassword("");
    }
  };

  const goToLogin = () => {
    navigate("/login");
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
      <button onClick={handleSubmit}>Register</button>
      <button onClick={goToLogin}>Back to Login</button>
    </form>
  );
};
