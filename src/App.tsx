import React from "react";
import "./App.css";
import { Switch, Route, Redirect, Link } from "react-router-dom";

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
      window.location.reload();
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
              path="/units/edit/:unit_id/:topic_id"
              component={EditTopic}
            />
            <PrivateRoute
              exact
              path="/units/quiz/:unit_id/:topic_id"
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
