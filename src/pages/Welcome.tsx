import React, { useState } from "react";

import { getUser, getRole } from "services/api";

const Welcome: React.FC = () => {
  const [role, setRole] = useState<string>();
  const user = getUser();

  if (user) {
    getRole().then((r) => {
      setRole(r);
    });
  }

  return user ? (
    <>
      <p>Welcome {user.email}</p>
      {role ? <p>You are a {role}</p> : <p>Loading role...</p>}
    </>
  ) : (
    <p>Click above to login!</p>
  );
};

export default Welcome;
