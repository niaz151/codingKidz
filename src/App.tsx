import React, { useEffect, useState } from "react";
import { Router } from "@reach/router";
import { Login as LoginPage } from "pages/Login";
import { Register as RegisterPage } from "pages/Register";
import { Welcome as WelcomePage } from "pages/Welcome";
import { PasswordReset as PasswordResetPage } from "pages/PasswordReset";
import { Units } from "pages/Units";
import { Quiz } from "pages/Quiz";

import { auth } from "services/firebase";

const App: React.FC = () => {
  const [user, setUser] = useState<firebase.User>();
  const [loadingUser, setLoadingUser] = useState(true);
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.log("Loaded App");
    }
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      // setLoadingUser(true)
      if (userAuth) {
        if (process.env.NODE_ENV !== "production") {
          console.log("user logged in");
        }
        setUser(userAuth);
        setLoadingUser(false);
      } else {
        if (process.env.NODE_ENV !== "production") {
          console.log("user logged out");
        }
        setUser(undefined);
        setLoadingUser(false);
      }
    });
  }, []);

  return !loadingUser ? (
    user ? (
      <Router>
        <WelcomePage path="/" default />
        <Units path="/units" />
        <Quiz path="/quiz/:unit" />
      </Router>
    ) : (
      <Router>
        <LoginPage path="/login" default />
        <RegisterPage path="/register" />
        <PasswordResetPage path="/passwordreset" />
      </Router>
    )
  ) : (
    <p>Checking Login...</p>
  );
};

export default App;
