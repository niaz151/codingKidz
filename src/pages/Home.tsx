import React from "react";
import {Button} from 'react-bootstrap';
import { ExclamationTriangle } from "react-bootstrap-icons";
import { useUser, useRole, useUnits } from "services/api";
import {Unit} from 'models';
import '../styles/Home.css';


const Home: React.FC = () => {

  const [user, , userError] = useUser();
  const [roleData, roleLoading, roleError] = useRole();
  const [units, unitsLoading, unitError] = useUnits();

  units?.map( unit => {
    
  })

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
          {units?.map((unit) => (
            <Button className="home-language-btn"> {unit.name} </Button>
          ))}
        </div>
      </div>


    </div>
  );
};

export default Home;
