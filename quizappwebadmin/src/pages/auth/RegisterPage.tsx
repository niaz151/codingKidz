import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { useAppDispatch } from "../../ducks/hooks";
import { Roles } from "../../utils/constants";
import { register } from "./authSlice";

const RegisterPage = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Roles>();

  const onSubmit = () => {
    if (!email || !password || !role) {
      alert("Please fill out form!");
    } else {
      dispatch(register({ email: email, password: password, role: role }));
    }
  };

  return (
    <div>
      <form>
        <label>Email</label>
        <input
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <label>Role</label>
        <select
          value={role}
          onChange={(event) => {
            switch (event.target.value.toUpperCase()) {
              case Roles.Admin:
                setRole(Roles.Admin);
                break;
              case Roles.Student:
                setRole(Roles.Student);
                break;
              case Roles.Teacher:
                setRole(Roles.Teacher);
                break;
              default:
                console.error("Invalid role selected somehow");
                break;
            }
          }}
        >
          <option selected disabled>
            Please choose an option...
          </option>
          {Object.entries(Roles).map((role) => {
            return (
              <option value={role[0]} key={role[0]}>
                {role[1]}
              </option>
            );
          })}
        </select>
      </form>
      <Button onClick={onSubmit}>Register</Button>
      <Link to="/login">
        <Button>Back to Login</Button>
      </Link>
    </div>
  );
};

export default RegisterPage;
