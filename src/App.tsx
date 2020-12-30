import React from "react";
import "./styles/App.css";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import Splash from './pages/Splash';

import "bootstrap/dist/css/bootstrap.min.css";

import {
  Login,
  Register,
  Welcome,
  PasswordReset,
  Units,
  Quiz,
  EditTopic,
} from "pages";

import { PrivateRoute, PublicRoute } from "components";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { signOut, useUser } from "services/api";

const App: React.FC = () => {
  const [user] = useUser();

  const handleSignOut = async () => {
    await signOut().then(() => {
      console.log("signed out");
      window.location.reload();
    });
  };

  return (
    <div className="app-container">
      <Splash/>
    </div>
  );
};

export default App;
