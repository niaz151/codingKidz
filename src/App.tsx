import React, { useCallback, useEffect, useState } from "react";
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

  const [currentTab, setCurrentTab] = useState<TabNames | null>(TabNames.Home);

  const handleTabChange = useCallback(
    (key: string | null) => {
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
          break;
      }
    },
    [TabNames.Home, TabNames.Settings, TabNames.Units, history]
  );

  useEffect(() => {
    if (user) {
      handleTabChange(TabNames.Home);
    }
  }, [TabNames.Home, handleTabChange, history, user]);

  return (
    <div className="app-container">
      {!user ? (
        <Switch>
          <Route exact path="/">
          <Splash auth={true}/>
          </Route>
          <Route exact path="/passwordreset" component={PasswordReset} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      ) : (
        <Tabs
          activeKey={currentTab}
          onSelect={handleTabChange}
          transition={false}
          mountOnEnter
        >
          <Tab eventKey={TabNames.Home} title={<HouseFill />}>
            <Switch>
              <Route exact path="/">
                <Redirect to={`/${TabNames.Home}`} />
              </Route>
              <Route exact path={`/${TabNames.Home}`} component={Home} />
            </Switch>
          </Tab>
          <Tab eventKey={TabNames.Units} title={<BookFill />}>
            <Switch>
              <Route exact path="/">
                <Redirect to={`/${TabNames.Units}`} />
              </Route>
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
              <Route exact path="/">
                <Redirect to={`/${TabNames.Settings}`} />
              </Route>
              <Route
                exact
                path={`/${TabNames.Settings}/`}
                component={Settings}
              />
            </Switch>
          </Tab>
        </Tabs>
      )}
    </div>
  );
};

export default App;
