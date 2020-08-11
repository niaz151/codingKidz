import React from "react";
import { getUser } from "services/api";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface Props extends RouteProps {}

const PrivateRoute: React.FC<Props> = (props) => {
  const user = getUser();
  return user ? <Route {...props} /> : <Redirect to="/login" />;
};

export default PrivateRoute;
