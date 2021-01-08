import React, { useState } from "react";
import { Form, Button, FormControl, Col, Row, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { login } from "services/api";
import '../styles/Login.css';
import mouse_logo from '../images/vertical_mouse.svg';

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
    <div className="login-container">
      <div className="login-field-container">   
        <img src={mouse_logo} className="login-img"/>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Control
              className="login-field"
              placeholder="Email"
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
            <InputGroup>
            <Form.Control
              className="login-field"
              placeholder="Password"
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
          <Button type="submit" className="login-login-btn">
            SIGN IN
          </Button>
          <div className="login-forgot-password">
            <Link to="/forgotpassword"> FORGOT PASSWORD </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
