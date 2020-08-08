import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Input, Select, Button, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { register, getUser } from "services/api";
import { Store } from "antd/lib/form/interface";

export const Register: React.FC = () => {
  const { Option } = Select;

  const [registerSucceeded, setRegisterSucceeded] = useState(false);

  useEffect(() => {
    if (getUser()) {
      if (process.env.NODE_ENV !== "production") {
        console.log("Found user, redirecting away...");
      }
      setRegisterSucceeded(true);
    }
  }, []);

  const onFinish = (values: Store) => {
    register(values.email, values.password, values.role).then(
      () => {
        setRegisterSucceeded(true);
      },
      (error) => {
        setRegisterSucceeded(false);
        alert(error);
      }
    );
  };

  const RegisterForm = () => {
    return (
      <>
        <Form name="register" className="register-form" onFinish={onFinish}>
          <Form.Item
            name="role"
            label="Role"
            hasFeedback
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Select>
              <Option value="student">Student</Option>
              <Option value="teacher">Teacher</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "The input is not a valid E-mail!",
              },
              {
                required: true,
                message: "Please input your email!",
              },
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
            hasFeedback
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
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Space direction="vertical">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
            <Link to="/passwordreset">
              <Button>Reset Password</Button>
            </Link>
            <Link to="/login">
              <Button>Back to Login</Button>
            </Link>
          </Space>
        </Form>
      </>
    );
  };

  return registerSucceeded ? <Redirect to="/" /> : <RegisterForm />;
};
