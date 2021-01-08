import React from "react";
import "./styles/App.css";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import Splash from "./pages/Splash";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  Login,
  Register,
  Home,
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
      window.location.reload();
    });
  };

  return (
    <div className="app-container">
      <Navbar fixed="bottom">
        <Navbar.Brand>
          <Link to="/">codingKIDZ Quizapp</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Item>
              <Nav.Link as={Link} to="/units">
                Units
              </Nav.Link>
            </Nav.Item>
            {user ? (
              <Button onClick={handleSignOut}>Logout</Button>
            ) : (
              <Nav.Item>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/register" component={Register} />
        <PublicRoute exact path="/" component={Splash} />
        <PrivateRoute exact path="/home" component={Home} />
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
