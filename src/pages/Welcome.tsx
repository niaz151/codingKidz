import React from "react";

import { RouteComponentProps, useNavigate } from "@reach/router";

import { signOut } from "services/api";

interface Props extends RouteComponentProps {}

export const Welcome: React.FC<Props> = () => {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut().then(() => console.log("signed out"));
  };
  
  const goToUnits = async () => {
    navigate('/units')
  }

  return (
    <div>
      <p>You logged in!</p>
      <button onClick={goToUnits}>View Units</button>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
};
