import React, { useEffect, useState } from "react";
import { resetPassword } from "services/api";
import { Link } from "react-router-dom";
import { Form, Input, Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Store } from "antd/lib/form/interface";

export const PasswordReset: React.FC = () => {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.log("Loaded Password Reset");
    }
  }, []);

  const onFinish = (values: Store) => {
    resetPassword(values.email).then(
      () => {
        setSent(true);
      },
      (error) => {
        setSent(false);
        alert(error);
      }
    );
  };

  const PasswordResetForm = () => {
    return (
      <>
        <Form
          name="resetPassword"
          className="reset-password-form"
          onFinish={onFinish}
        >
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
              prefix={<UserOutlined className="site-form-item-icon"/>}
              type="email"
              placeholder="Email"
            />
          </Form.Item>
          <Space direction="vertical">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Reset Password
            </Button>
          </Form.Item>
          <Link to="/login"><Button>Go to Login</Button></Link>
        <Link to="/register"><Button>Go to Register</Button></Link>
        </Space>
        </Form>
        
      </>
    );
  };

  return sent ? <p>Check your email!</p> : <PasswordResetForm />;
};
