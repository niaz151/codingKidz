import React from "react";
import { ExclamationTriangle } from "react-bootstrap-icons";
import { useUser } from "services/api";
import '../styles/Home.css';

const Home: React.FC = () => {
  const [user, , userError] = useUser();

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
          <p>
            <span> Welcome </span> 
            <span className="welcome-border"> {user.email}! </span>
          </p>
        </div>

        <div className="role-wrap wrap">
            You are a ....
        </div>

        <div className="language-wrap wrap">
            What language do you want to learn?
        </div>
      </div>


    </div>
  );
};

export default Home;
