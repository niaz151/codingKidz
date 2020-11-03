import React, { useEffect, useState } from "react";
import { resetPassword } from "services/api";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.log("Loaded Password Reset");
    }
  }, []);

  const onFinish = () => {
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
  };

  const PasswordResetForm = () => {
    return (
      <>
        <Form name="resetPassword" onSubmit={onFinish}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
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
      </>
    );
  };

  return sent ? <p>Check your email!</p> : <PasswordResetForm />;
};

export default PasswordReset;
