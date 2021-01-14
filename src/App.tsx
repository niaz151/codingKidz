import React, { useState } from "react";
import "./styles/App.css";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Splash from "./pages/Splash";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  Login,
  Register,
  Home,
  PasswordReset,
  Units,
  Quiz,
  EditTopic,
  Settings,
} from "pages";

import { Tab, Tabs } from "react-bootstrap";
import { useUser } from "services/api";
import { BookFill, GearFill, HouseFill } from "react-bootstrap-icons";

const App: React.FC = () => {
  const [user] = useUser();

  const history = useHistory();

  enum TabNames {
    Home = "home",
    Units = "units",
    Settings = "settings",
  }

  const [currentTab, setCurrentTab] = useState<TabNames | null>(
    user === undefined ? TabNames.Settings : TabNames.Home
  );

  const handleTabChange = (key: string | null) => {
    switch (key) {
      case TabNames.Home:
        setCurrentTab(key);
        history.push(`/${TabNames.Home}`);
        break;
      case TabNames.Units:
        setCurrentTab(key);
        history.push(`/${TabNames.Units}`);
        break;
      case TabNames.Settings:
        setCurrentTab(key);
        history.push(`/${TabNames.Settings}`);
        break;
      default:
        console.log("tried to access tab that doesn't exist??");
    }
  };

  return (
    <div className="app-container">
      <Tabs
        activeKey={currentTab}
        onSelect={handleTabChange}
        transition={false}
      >
        <Tab
          eventKey={TabNames.Home}
          title={<HouseFill />}
          disabled={user === undefined}
        >
          <Switch>
            <Route exact path={`/${TabNames.Home}`} component={Home} />
          </Switch>
        </Tab>
        <Tab
          eventKey={TabNames.Units}
          title={<BookFill />}
          disabled={user === undefined}
        >
          <Switch>
            <Route exact path={`/${TabNames.Units}`} component={Units} />
            <Route
              exact
              path={`/${TabNames.Units}/edit/:unit_id/:topic_id`}
              component={EditTopic}
            />
            <Route
              exact
              path={`/${TabNames.Units}/quiz/:unit_id/:topic_id`}
              component={Quiz}
            />
          </Switch>
        </Tab>
        <Tab eventKey={TabNames.Settings} title={<GearFill />}>
          <Switch>
            <Route exact path={`/${TabNames.Settings}`}>
              {user === undefined ? (
                <Redirect to={`/${TabNames.Settings}/splash`} />
              ) : (
                <Redirect to={`/${TabNames.Settings}/settings`} />
              )}
            </Route>
            <Route
              exact
              path={`/${TabNames.Settings}/settings`}
              component={Settings}
            />
            <Route
              exact
              path={`/${TabNames.Settings}/splash`}
              component={Splash}
            />
            <Route
              exact
              path={`/${TabNames.Settings}/passwordreset`}
              component={PasswordReset}
            />
            <Route
              exact
              path={`/${TabNames.Settings}/login`}
              component={Login}
            />
            <Route
              exact
              path={`/${TabNames.Settings}/register`}
              component={Register}
            />
          </Switch>
        </Tab>
      </Tabs>
    </div>
  );
};

export default App;
