import { useState } from "react";
import { useLoginMutation } from "../services/aspiAPI";
import { login } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputWithLabel from "../components/shared/InputWithLabel";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        navigate("/");
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
        <div>
            <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                <div className="max-w-lg mx-auto">
                    <h1 className="text-2xl font-bold text-center sm:text-3xl">
                        Welcome to our website
                    </h1>

                    <form
                        onSubmit={handleOnSubmit}
                        className="mt-6 mb-0 space-y-4 rounded-lg card bg-base-200"
                    >
                        <p className="pt-4 text-lg font-medium text-center">
                            Sign in to your account
                        </p>
                        <div className="card-body">
                            <div>
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

                            <div>
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
                                <NavLink to={"/register"} className="underline">
                                    Sign up
                                </NavLink>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
