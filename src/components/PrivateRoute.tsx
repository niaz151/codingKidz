import React from "react";
import {auth} from '../services/firebase'
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  authenticated: boolean;
  exact: boolean;
}> = (props) => (
  <Route
    render={() =>
      auth().currentUser ? (
        <Route path={props.path} exact={props.exact} component={props.component}/>
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);
