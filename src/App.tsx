import React from "react";
import "./styles/App.css";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import Splash from './pages/Splash';

import "bootstrap/dist/css/bootstrap.min.css";

import {
  Login,
  Register,
  Welcome,
  PasswordReset,
  Units,
  Quiz,
  EditTopic,
} from "pages";

import { PrivateRoute, PublicRoute } from "components";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { signOut, useUser } from "services/api";

const App: React.FC = () => {
  const [user] = useUser();

  const handleSignOut = async () => {
    await signOut().then(() => {
      console.log("signed out");
      window.location.reload();
    });
  };

  return (
    <div className="app-container">
      <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Splash} />
            <Route exact path="/passwordreset" component={PasswordReset} />
            <PrivateRoute exact path="/units" component={Units} />
            <PrivateRoute
              exact
              path="/units/edit/:unit_id/:topic_id"
              component={EditTopic}
            />
            <PrivateRoute
              exact
              path="/units/quiz/:unit_id/:topic_id"
              component={Quiz}
            />
          </Switch>
    </div>
  );
};

export default App;
