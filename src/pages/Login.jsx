import { useEffect, useState } from "react";
import { useLoginMutation } from "../services/aspiAPI";
import { login } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputWithLabel from "../components/shared/InputWithLabel";

const Login = () => {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/");
            return;
        }
    }, [token]);

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const [
        handleSubmit,
        { isError, error, isSuccess, data, isLoading, reset },
    ] = useLoginMutation();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        handleSubmit(user);
    };

    if (isSuccess) {
        dispatch(login(data));
        toast.success("Welcome back!");
        navigate("/categories");
    }

    if (isError) {
        if (!error.data.errors && error.data) {
            toast.error(error.data);
            reset();
        } else {
            if (error.data.errors.Username) {
                error.data.errors.Username.map((err) => toast.error(err));
                reset();
            }
            if (error.data.errors.Password) {
                error.data.errors.Password.map((err) => toast.error(err));
                reset();
            }
        }
    }

    return (
        <>
            <div className="container min-h-screen hero bg-base-200">
                <div className="flex-col hero-content lg:flex-row-reverse">
                    <div className="text-center ">
                        <h1 className="text-5xl font-bold ">Login now!</h1>
                        <p className="py-6">
                            Welcome to our Educational website
                        </p>
                        <Link className="btn btn-link" to={"/"}>
                            Back to home
                        </Link>
                    </div>
                    <div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
                        <form onSubmit={handleOnSubmit} className="card-body">
                            <div className="form-control">
                                <InputWithLabel
                                    label={"Username"}
                                    isLoading={isLoading}
                                    key={"username"}
                                    name="username"
                                    placeholder="Enter username"
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            username: e.target.value,
                                        })
                                    }
                                    value={user.username}
                                />
                            </div>
                            <div className="form-control">
                                <InputWithLabel
                                    label={"Password"}
                                    isLoading={isLoading}
                                    key={"password"}
                                    name="password"
                                    type="password"
                                    placeholder="Enter password"
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            password: e.target.value,
                                        })
                                    }
                                    value={user.password}
                                />
                            </div>
                            <div className="mt-6 form-control">
                                <button
                                    type="submit"
                                    className={
                                        isLoading
                                            ? "btn btn-primary btn-block"
                                            : "btn btn-primary btn-block"
                                    }
                                    disabled={isLoading}
                                >
                                    Sign in
                                </button>
                                <p className="text-sm text-center text-gray-500">
                                    No account?
                                    <NavLink
                                        to={"/register"}
                                        className="underline"
                                    >
                                        Sign up
                                    </NavLink>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
