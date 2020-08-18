import React, { useState } from "react";

import { getUser, getRole } from "services/api";
import { Button } from "antd";

const Welcome: React.FC = () => {
  const [role, setRole] = useState<string>();
  const user = getUser();
  const languages = ["Scratch", "Python", "JavaScript", "Java"];
  const languageList = languages.map((l) => (
    <p key={l} style={{ marginLeft: 660 }}>
      <Button size="middle">{l}</Button>
    </p>
  ));

  if (user) {
    getRole().then((r) => {
      setRole(r);
    });
  }

  return user ? (
    <div style={{ marginTop: 80 }}>
      <p style={{ textAlign: "center" }}>Welcome {user.email}!</p>
      {role ? (
        <p style={{ textAlign: "center" }}>Your role is: {role}</p>
      ) : (
        <p>Loading role...</p>
      )}
      <p style={{ textAlign: "center" }}>Please select a language</p>
      {languageList}
    </div>
  ) : (
    <p>Click above to login!</p>
  );
};

export default Welcome;
