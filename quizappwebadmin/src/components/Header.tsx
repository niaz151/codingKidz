import { useAppDispatch, useAppSelector } from "../ducks/hooks";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../pages/auth/authSlice";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

const Header = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const handleSignOut = () => {
    dispatch(logout());
  };

  return (
    <Navbar>
      <Navbar.Brand>
        <Link to="/">codingKIDZ</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        {accessToken ? (
          <>
            <Nav.Item>
              <NavLink exact activeClassName="active" to="/units">
                Units
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <Button onClick={handleSignOut}>LOGOUT</Button>
            </Nav.Item>
          </>
        ) : (
          <Nav.Item>
            <NavLink exact activeClassName="active" to="/login">
              Login
            </NavLink>
          </Nav.Item>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
