import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, FormControl, Col, Row } from "react-bootstrap";
import { register, signOut } from "services/api";
import { Role } from "models";
import '../styles/Register.css';
import mouse_logo from '../images/mouse_cutter.svg';


const Register: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [role, setRole] = useState<string>();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

      // TODO: Make role setting not terrible

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

    event.preventDefault();
  };

  return (
    <div className="register-container">

      <img src={mouse_logo} className="register-img" />
      
      <div className="register-title">
        REGISTER
      </div>

      <Form onSubmit={onSubmit}>
        
        <Form.Group>
          <Form.Control
            placeholder="Email"
            className="register-field"
            id="first-field"
            required
            type="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <FormControl.Feedback type="invalid">
            Please enter email
          </FormControl.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Control
            placeholder="Choose Role"
            className="register-field role-field"
            required
            as="select"
            onChange={(event) => {
              setRole(event.target.value);
            }}
          >
            <option value="" disabled selected>Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Control
            placeholder="Password"
            className="register-field password-field"
            required
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <FormControl.Feedback type="invalid">
            Please enter password
          </FormControl.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Confirm Password"
            className="register-field"
            required
            type="password"
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
          <FormControl.Feedback type="invalid">
            Please confirm password
          </FormControl.Feedback>
        </Form.Group>
     
        <Button className="register-btn" type="submit">
          Create Account
        </Button>
        <div className="login-forgot-password">
          <Link to="/login"> Have An Account? </Link>
        </div>
      </Form>
    </div>
  );
};

export default Register;
