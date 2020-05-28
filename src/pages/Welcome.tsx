import React from "react";

import { RouteComponentProps } from "@reach/router";

import { signOut } from "ducks/api";

interface Props extends RouteComponentProps {}

const handleSignOut = async () => {
  await signOut().then(() => console.log("signed out"));
};

export const Welcome: React.FC<Props> = () => {
  return (
    <div>
      <p>You logged in!</p>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
};
