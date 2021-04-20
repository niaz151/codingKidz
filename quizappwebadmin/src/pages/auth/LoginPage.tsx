import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../ducks/hooks";
import { login } from "./authSlice";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    dispatch(login({ email: data.email, password: data.password }));
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input {...(register("email"), { required: true })} />
        <label>Password</label>
        <input {...(register("password"), { required: true })} />
        <input type="submit" value="Login" />
      </form>
      <Link to="/register">
        <button>Go to Register</button>
      </Link>
    </div>
  );
};

export default LoginPage;
