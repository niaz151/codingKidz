import React, { useState } from "react";

import { Form, Button, FormControl, Col, Row, InputGroup } from "react-bootstrap";
import { Person, Lock } from "react-bootstrap-icons";

import { Link } from "react-router-dom";
import { login } from "services/api";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!email || !password) {
      console.log("got empty values from required inputs");
    } else {
      login(email, password).then(
        () => {
          console.log("successfully logged in");
        },
        (error) => {
          console.log(error)
          alert(error);
        }
      );
    }
    event.preventDefault()
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <FormControl.Feedback type="invalid">
          Please enter email
        </FormControl.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <InputGroup>
        <Form.Control
          required
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        </InputGroup>
        <FormControl.Feedback type="invalid">
          Please enter password
        </FormControl.Feedback>
      </Form.Group>
      <Row>
        <Col>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Col>
        <Col>
          <Link to="/passwordreset">
            <Button>Reset Password</Button>
          </Link>
        </Col>
        <Col>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </Col>
      </Row>
    </Form>
  );
};

export default Login;
