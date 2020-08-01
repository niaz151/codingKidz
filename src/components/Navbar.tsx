import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { signOut, getUser } from "services/api";
import { Space, Button } from "antd";

export const Navbar: React.FC = () => {
  const user = getUser();

  const handleSignOut = async () => {
    await signOut().then(() => {
      console.log("signed out");
      return <Redirect to="/login" />;
    });
  };

  return (
    <>
      <Space align="center" size="middle">
        <NavLink to="/"><Button>Home</Button></NavLink>
        <NavLink to="/units"><Button>Units</Button></NavLink>
        {user ? (
          <Button onClick={handleSignOut}>Logout</Button>
        ) : (
          <NavLink to="/login"><Button>Login</Button></NavLink>
        )}
      </Space>
    </>
  );
};
