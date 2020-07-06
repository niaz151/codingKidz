import React from "react";
import { isLoggedIn } from "services/api";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface Props extends RouteProps {}

export const PrivateRoute: React.FC<Props> = (props) => {
  return isLoggedIn() ? <Route {...props} /> : <Redirect to="/login" />;
};
