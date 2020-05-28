import React, { useEffect, useState } from "react";
import { RouteComponentProps, useNavigate } from "@reach/router";
import { resetPassword } from "ducks/api";

interface Props extends RouteComponentProps {}

export const PasswordReset: React.FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.log("Loaded Login");
    }
  }, []);

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    resetPassword(email).then(
      () => {
        setSent(true)
      },
      (error) => {
        alert(error);
      }
    );
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      {!sent ? (
        <form className="">
          <h3>Reset Password:</h3>
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
            <button onClick={handleSubmit}>Send Reset Email</button>
          </div>
        </form>
      ) : (
        <p>Check your email!</p>
      )}

      <button onClick={goToLogin}>Back to Login</button>
    </>
  );
};
