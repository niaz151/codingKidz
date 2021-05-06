import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../ducks/hooks";
import { Roles } from "../../utils/constants";
import { register } from "./authSlice";

const RegisterPage = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [role, setRole] = useState<Roles>();

  const onSubmit = () => {
    if (email && password && role) {
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
            switch (event.target.value) {
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
          {Object.entries(Roles).map((role) => {
            return <option value={role[0]}>{role[1]}</option>;
          })}
        </select>
      </form>
      <button onClick={onSubmit}>Login</button>
      <Link to="/login">
        <button>Back to Login</button>
      </Link>
    </div>
  );
};

export default RegisterPage;
