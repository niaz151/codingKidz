import React from "react";

import { ExclamationTriangle } from "react-bootstrap-icons";

import { useUser } from "services/api";

const Home: React.FC = () => {
  const [user, , userError] = useUser();

  return (
    <div>
      {userError && (
        <p>
          <ExclamationTriangle color="#EED202" /> Error loading user
        </p>
      )}
      <p style={{ textAlign: "center" }}>Hello {user.email}!</p>
    </div>
  );
};

export default Home;
