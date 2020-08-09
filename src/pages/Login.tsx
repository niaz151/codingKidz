import React from "react";

import { Form, Input, Button, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { login } from "services/api";
import { Store } from "antd/lib/form/interface";

export const Login: React.FC = () => {

  const onFinish = (values: Store) => {
    login(values.email, values.password).then(
      () => {
        console.log("successfully registered")
      },
      (error) => {
        alert(error);
      }
    );
  };

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
