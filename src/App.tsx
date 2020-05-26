import React from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

// import { auth } from "./services/firebase";

import {Login as LoginPage} from "./pages/Login"
import {Register as RegisterPage} from "./pages/Register"
import {PasswordReset as PasswordResetPage} from "./pages/PasswordReset"
import {Units} from './pages/Units'

const App: React.FC = () => {

  const user = null;

  return (
    user ? 
    <Units/> : 
    <Router>
      {/* <Navbar /> */}
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/passwordreset" component={PasswordResetPage} />
      </Switch>
    </Router>
  );
};

export default App;
