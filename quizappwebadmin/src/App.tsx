import { LoginPage, RegisterPage, SplashPage, UnitsPage } from "./pages";
import { Header } from "./components";
import { useAppSelector } from "./ducks/hooks";
import { Redirect, Route, Switch } from "react-router-dom";

function App() {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  return (
    <>
      <Header />
      <Switch>
        {accessToken ? (
          <>
            <Route exact path="*">
              <Redirect to="/units" />
            </Route>
            <Route exact path="/units" component={UnitsPage} />
          </>
        ) : (
          <>
            <Route exact path="/">
              <SplashPage />
            </Route>
            {/* <Route exact path="/passwordreset" component={PasswordReset} /> */}
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
          </>
        )}
      </Switch>
    </>
  );
}

export default App;
