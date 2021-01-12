import React from "react";
import {Button} from 'react-bootstrap';
import { ExclamationTriangle } from "react-bootstrap-icons";
import { useUser, useRole } from "services/api";
import '../styles/Home.css';

const Home: React.FC = () => {
  const [user, , userError] = useUser();
  const [roleData, roleLoading, roleError] = useRole();

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
          <span className="welcome-email"> {user.email}! </span>
        </div>

        <div className="role-wrap wrap">
          <span className="role-txt"> YOU ARE A </span>
          <span className="role-btn-wrap"> <Button className="role-btn"> {roleData?.role.toUpperCase()} </Button></span>
        </div>

        <div className="language-wrap wrap">
            WHAT LANGUAGE DO YOU WANT TO LEARN TODAY?
        </div>

        <div className="btn-wrap wrap">
            <Button className="home-language-btn">Test</Button>
            <Button className="home-language-btn">Test</Button>
        </div>
      </div>


    </div>
  );
};

export default Home;
