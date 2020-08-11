import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { signOut, getUser } from "services/api";
import { Space, Button } from "antd";

const Navbar: React.FC = () => {
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
        <NavLink to="/">
          <Button style={{ marginLeft: 16, marginTop: 16 }}>Home</Button>
        </NavLink>
        <NavLink to="/units">
          <Button style={{ marginTop: 16 }}>Units</Button>
        </NavLink>
        {user ? (
          <Button onClick={handleSignOut} style={{ marginTop: 16 }}>
            Logout
          </Button>
        ) : (
          <NavLink to="/login">
            <Button style={{ marginTop: 16 }}>Login</Button>
          </NavLink>
        )}
      </Space>
    </>
  );
};

export default Navbar;
