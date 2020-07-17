import React, { useEffect, useState } from "react";

import { Form, Input, Button, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { Link, Redirect } from "react-router-dom";
import { login, getUser } from "services/api";
import { Store } from "antd/lib/form/interface";

export const Login: React.FC = () => {
  const [loginSucceeded, setLoginSucceeded] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.log("Loaded Login");
    }

    if (getUser()) {
      setLoginSucceeded(true);
    }
  }, []);

  const onFinish = (values: Store) => {
    console.log(values);
    login(values.email, values.password).then(
      () => {
        setLoginSucceeded(true);
      },
      (error) => {
        setLoginSucceeded(false);
        alert(error);
      }
    );
  };

  const LoginForm = () => {
    return (
      <>
        <Form name="login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              { required: true, message: "Please input your email!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="email"
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <Space direction="vertical">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log In
              </Button>
            </Form.Item>
            <Link to="/passwordreset">
              <Button>Reset Password</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </Space>
        </Form>
      </>
    );
  };

  return loginSucceeded ? <Redirect to="/" /> : <LoginForm />;
};
