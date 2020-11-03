import React from "react";

import { ExclamationTriangle } from "react-bootstrap-icons";

import { useUser } from "services/api";
import { Button } from "react-bootstrap";

const Welcome: React.FC = () => {
  const [user, , userError] = useUser();
  const languages = ["Scratch", "ScratchJR"];

  return user ? (
    <div style={{ marginTop: 80 }}>
      {userError && (
        <p>
          <ExclamationTriangle color="#EED202" /> Error loading user
        </p>
      )}
      <p style={{ textAlign: "center" }}>Welcome {user.email}!</p>
      <p style={{ textAlign: "center" }}>Please select a language</p>
      {languages.map((language) => (
        <p key={language} style={{ marginLeft: 660 }}>
          <Button>{language}</Button>
        </p>
      ))}
    </div>
  ) : (
    <p>Click above to login!</p>
  );
};

export default Welcome;
