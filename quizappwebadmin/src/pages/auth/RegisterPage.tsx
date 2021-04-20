import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../ducks/hooks";
import { Roles } from "../../utils/constants";
import { register as reduxregister } from "./authSlice";

type FormData = {
  email: string;
  password: string;
  role: Roles;
};

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    dispatch(
      reduxregister({
        email: data.email,
        password: data.password,
        role: data.role,
      })
    );
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input type="email" {...(register("email"), { required: true })} />
        <label>Password</label>
        <input type="password" {...(register("password"), { required: true })} />
        <label>Role</label>
        <select {...(register("role"), { required: true })}>
          {Object.entries(Roles).map((role) => {
            return <option value={role[0]}>{role[1]}</option>;
          })}
        </select>
        <input type="submit" value="Register"/>
      </form>
      <Link to="/login">
        <button>Back to Login</button>
      </Link>
    </div>
  );
};

export default RegisterPage;
