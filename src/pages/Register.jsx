import { useRegisterMutation } from "../services/aspiAPI";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        watch,
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            stdUserName: "",
            password: "",
            passwordConfirmation: "",
            stdName: "",
            esuInst: "",
            roles: ["Reader"],
        },
    });
    const [
        handleSubmit,
        { isError, error, isSuccess, data, isLoading, reset },
    ] = useRegisterMutation();

    const handleOnSubmit = (data) => {
        handleSubmit(data);
    };

    if (isError) {
        if (!error.data.errors && error.data) {
            if (error.data == "succecfull registered, please login") {
                toast.success(error.data);
                navigate("/login");
            } else {
                toast.error(error.data);
                reset();
            }
            reset();
        } else {
            Object.keys(error.data.errors).forEach((key) => {
                error.data.errors[key].map((err) => toast.error(err));
            });
            reset();
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
                        onSubmit={handleFormSubmit(handleOnSubmit)}
                        className="mt-6 mb-0 space-y-4 rounded-lg card bg-base-200"
                    >
                        <p className="pt-4 text-lg font-medium text-center">
                            Create your new account
                        </p>
                        <div className="card-body">
                            <div>
                                <label className="w-full form-control">
                                    <div className="label">
                                        <span className="label-text">
                                            Name
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    </div>
                                    <input
                                        type={"text"}
                                        placeholder={"Enter name"}
                                        className="w-full input input-bordered"
                                        disabled={isLoading}
                                        {...register("stdName", {
                                            required: "Name is required",
                                            minLength: {
                                                value: 3,
                                                message:
                                                    "Name should be at least 3 characters",
                                            },
                                        })}
                                    />
                                </label>
                                <p className="mt-1 text-xs text-red-500">
                                    {errors?.stdName?.message}
                                </p>
                            </div>

                            <div>
                                <label className="w-full form-control">
                                    <div className="label">
                                        <span className="label-text">
                                            Username
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    </div>
                                    <input
                                        type={"text"}
                                        placeholder={"Enter username"}
                                        className="w-full input input-bordered"
                                        disabled={isLoading}
                                        {...register("stdUserName", {
                                            required: "Username is required",
                                            minLength: {
                                                value: 3,
                                                message:
                                                    "Username should be at least 3 characters",
                                            },
                                        })}
                                    />
                                </label>
                                <p className="mt-1 text-xs text-red-500">
                                    {errors?.stdUserName?.message}
                                </p>
                            </div>

                            <div>
                                <label className="w-full form-control">
                                    <div className="label">
                                        <span className="label-text">
                                            Password
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    </div>
                                    <input
                                        type={"password"}
                                        placeholder={"Enter password"}
                                        className="w-full input input-bordered"
                                        disabled={isLoading}
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 8,
                                                message:
                                                    "Password should be at least 8 characters",
                                            },
                                        })}
                                    />
                                </label>
                                <p className="mt-1 text-xs text-red-500">
                                    {errors?.password?.message}
                                </p>
                            </div>

                            <div>
                                <label className="w-full form-control">
                                    <div className="label">
                                        <span className="label-text">
                                            Password Confirmation
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    </div>
                                    <input
                                        type={"password"}
                                        placeholder={"Enter password"}
                                        className="w-full input input-bordered"
                                        disabled={isLoading}
                                        {...register("passwordConfirmation", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Password confiramtion is required",
                                            },
                                            validate: (val) => {
                                                if (watch("password") != val) {
                                                    return "Your passwords doesn't match";
                                                }
                                            },
                                        })}
                                    />
                                </label>
                                <p className="mt-1 text-xs text-red-500">
                                    {errors?.passwordConfirmation?.message}
                                </p>
                            </div>

                            <div>
                                <label className="w-full form-control">
                                    <div className="label">
                                        <span className="label-text">
                                            Education institution
                                        </span>
                                    </div>
                                    <input
                                        type={"text"}
                                        placeholder={
                                            "Enter education institution name"
                                        }
                                        className="w-full input input-bordered"
                                        disabled={isLoading}
                                        {...register("esuInst")}
                                    />
                                </label>
                                <p className="mt-1 text-xs text-red-500">
                                    {errors?.esuInst?.message}
                                </p>
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
                                Sign up
                            </button>
                            <p className="text-sm text-center text-gray-500">
                                Already have an account?
                                <NavLink to={"/login"} className="underline">
                                    Sign in
                                </NavLink>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
