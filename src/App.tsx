import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Login } from "pages/Login";
import { Register } from "pages/Register";
import { Welcome } from "pages/Welcome";
import { PasswordReset } from "pages/PasswordReset";
import { Units } from "pages/Units";
import { Quiz } from "pages/Quiz";

import { Navbar } from "components/Navbar";
import { PrivateRoute } from "components/PrivateRoute";

import { auth } from "services/firebase";

const App: React.FC = () => {
  const [loadingUser, setLoadingUser] = useState(true);
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.log("Loaded App");
    }
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      setLoadingUser(true);
      if (userAuth) {
        if (process.env.NODE_ENV !== "production") {
          console.log("user logged in");
        }
        setLoadingUser(false);
      } else {
        if (process.env.NODE_ENV !== "production") {
          console.log("user logged out");
        }
        setLoadingUser(false);
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/passwordreset" component={PasswordReset}/>
        <PrivateRoute exact path="/units" component={Units}/>
        <PrivateRoute exact path="/quiz/:unit" component={Quiz}/>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};
export default App;
