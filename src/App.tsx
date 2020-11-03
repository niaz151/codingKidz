import React from "react";
import "./App.css";
import { Switch, Route, Redirect, NavLink, Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

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
  const [user, userLoading, userError] = useUser();

  const handleSignOut = async () => {
    await signOut().then(() => {
      console.log("signed out");
      return <Redirect to="/login" />;
    });
  };

  return (
    <Container>
      <Col>
        <Row>
          <Navbar>
            <Navbar.Brand>
              <Link to="/">codingKIDZ Quizapp</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse>
              <Nav className="mr-auto">
                <Nav.Link><Link to="/units">Units</Link></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Row>

        <Row>
          <Switch>
            <PublicRoute exact path="/login" component={Login} />
            <PublicRoute exact path="/register" component={Register} />
            <Route exact path="/" component={Welcome} />
            <Route exact path="/passwordreset" component={PasswordReset} />
            <PrivateRoute exact path="/units" component={Units} />
            <PrivateRoute
              exact
              path="/units/edit/:unit/:topic"
              component={EditTopic}
            />
            <PrivateRoute
              exact
              path="/units/quiz/:unit/:topic"
              component={Quiz}
            />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Row>

        <Row style={{ textAlign: "center" }}>
          QuizApp ©2020 Created by codingKIDZ
        </Row>
      </Col>
    </Container>
  );
};

export default App;
