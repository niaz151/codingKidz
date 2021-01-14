import React from "react";
import { Button, Container } from "react-bootstrap";
import { signOut } from "services/api";

const Settings: React.FC = () => {
  const handleSignOut = async () => {
    await signOut().then(() => {
      console.log("about to reload")
      window.location.reload();
    });
  };

  return (
    <Container>
    <ul>
      <li>
        <p>This will be the settings page later!</p>
      </li>
      <li>
        <p>This is a setting</p>
      </li>
    </ul>
    <Button onClick={handleSignOut}>Logout</Button>
    </Container>
  );
};

export default Settings;
