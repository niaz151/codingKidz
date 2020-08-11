import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Select, Button, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { register, signOut } from "services/api";
import { Store } from "antd/lib/form/interface";

const Register: React.FC = () => {
  const { Option } = Select;

  const onFinish = (values: Store) => {
    register(values.email, values.password, values.role).then(
      () => {
        console.log("registered successfully");
        return signOut();
      },
      (error) => {
        alert(error);
      }
    );
  };

  // const RegisterForm = () => {
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

export default Register;
