import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { signOut, getUser } from "services/api";

// interface Props {
//   user?: firebase.User
// }

// export const Navbar: React.FC<Props> = (props) => {
export const Navbar: React.FC = () => {
  // const {user} = props;
  const user = getUser();

  const handleSignOut = async () => {
    await signOut().then(() => {
      console.log("signed out");
      return <Redirect to="/login" />;
    });
  };

  return (
    <>
      <NavLink to="/">Home</NavLink> •<NavLink to="/units">Units</NavLink> •
      {user ? (
        <button onClick={handleSignOut}>Logout</button>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </>
  );
};
