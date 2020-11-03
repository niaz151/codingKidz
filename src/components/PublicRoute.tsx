import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "services/firebase";

interface Props extends RouteProps {}

const PublicRoute: React.FC<Props> = (props) => {
  const [user] = useAuthState(auth);
  return !user ? <Route {...props} /> : <Redirect to="/" />;
};

export default PublicRoute;
