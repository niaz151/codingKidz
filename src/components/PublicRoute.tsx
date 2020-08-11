import React from "react";
import { getUser } from "services/api";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface Props extends RouteProps {}

const PublicRoute: React.FC<Props> = (props) => {
  const user = getUser();
  return !user ? <Route {...props} /> : <Redirect to="/" />;
};

export default PublicRoute;
