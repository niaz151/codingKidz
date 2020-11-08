import React, { useState } from "react";
import { resetPassword } from "services/api";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, FormControl } from "react-bootstrap";

const PasswordReset: React.FC = () => {
  const [sent, setSent] = useState(false);

  const PasswordResetForm = () => {
    const [email, setEmail] = useState<string>();
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      if (!email) {
        console.log("got empty email from required input");
      } else {
        resetPassword(email).then(
          () => {
            setSent(true);
          },
          (error) => {
            setSent(false);
            alert(error);
          }
        );
      }

      event.preventDefault();
    };
    return (
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <FormControl.Feedback type="invalid">
            Please enter email
          </FormControl.Feedback>
        </Form.Group>
        <Row>
          <Col>
            <Button variant="primary" type="submit">
              Reset Password
            </Button>
          </Col>
          <Col>
            <Link to="/login">
              <Button>Back to Login</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/register">
              <Button>Go To Register</Button>
            </Link>
          </Col>
        </Row>
      </Form>
    );
  };

  return sent ? <p>Check your email!</p> : <PasswordResetForm />;
};

export default PasswordReset;
