import React from "react";

import { RouteComponentProps, useNavigate } from "@reach/router";

import { signOut } from "ducks/api";

interface Props extends RouteComponentProps {}

export const Welcome: React.FC<Props> = () => {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut().then(() => console.log("signed out"));
  };
  
  const goToQuiz = async () => {
    navigate('/quiz')
  }

  return (
    <div>
      <p>You logged in!</p>
      <button onClick={goToQuiz}>Continue to quiz</button>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
};
