import React from "react";
import { ExclamationTriangle } from "react-bootstrap-icons";
import { useUser } from "services/api";
import "../styles/Home.css";

const Home: React.FC = () => {
  const [user, userLoading, userError] = useUser();

  return (
    <div className="home-container">
      {userError && (
        <div>
          <p>
            <ExclamationTriangle color="#EED202" /> Error loading user
          </p>
        </div>
      )}

      <div className="home-subcontainer">
        <div className="welcome-wrap wrap">
          <span className="welcome-txt"> WELCOME </span>
          {userLoading && <span>Loading user info...</span>}
          {!userLoading && user && (
            <span className="welcome-email"> {user.email}! </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
