import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, FormControl, Col, Row } from "react-bootstrap";
import { register, signOut } from "services/api";
import { Role } from "models";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [role, setRole] = useState<string>();

  const onSubmit = () => {
    if (!email || !password || !confirmPassword || !role) {
      console.log("got empty value from form");
    } else if (password !== confirmPassword) {
      alert("passwords must match");
    } else {
      let derivedRole: Role;
      if (role === "student") {
        derivedRole = "student";
      } else if (role === "teacher") {
        derivedRole = "teacher";
      } else {
        derivedRole = "student";
      }

      // TODO: Make this not terrible

      register(email, password, derivedRole).then(
        () => {
          console.log("registered successfully");
          return signOut();
        },
        (error) => {
          alert(error);
        }
      );
    }
  };

  return (
    <>
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
          <Form.Control
            required
            type="text"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <FormControl.Feedback type="invalid">
            Please enter password
          </FormControl.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="text"
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
          <FormControl.Feedback type="invalid">
            Please confirm password
          </FormControl.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Choose Role</Form.Label>
          <Form.Control
            required
            as="select"
            onChange={(event) => {
              setRole(event.target.value);
            }}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </Form.Control>
        </Form.Group>
        <Row>
          <Col>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Col>
          <Col>
            <Link to="/passwordreset">
              <Button>Reset Password</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/login">
              <Button>Back to Login</Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
