import { useAppDispatch, useAppSelector } from "../ducks/hooks";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../pages/auth/authSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const handleSignOut = () => {
    dispatch(logout());
  };
  return (
    <nav style={{ width: "100vw" }}>
      <div>
        <Link to="/">codingKIDZ</Link>
        <div>
          <ul>
            {accessToken ? (
              <>
                <li>
                  <NavLink exact activeClassName="active" to="/units">
                    {" "}
                    Units{" "}
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleSignOut}>LOGOUT</button>
                </li>
              </>
            ) : (
              <li>
                <NavLink exact activeClassName="active" to="/login">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
