import React from "react";
import { Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { signOut } from "services/api";

const Settings: React.FC = () => {
  const history = useHistory();
  const handleSignOut = async () => {
    await signOut().then(() => {
      history.push("/")
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
