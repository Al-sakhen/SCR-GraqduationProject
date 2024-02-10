import { useUpdateStudentInfoMutation } from "../services/aspiAPI";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { updateProfile } from "../features/auth/authSlice";

const Profile = () => {
    const { token, name, eduInst, id } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const {
        watch,
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            stdId: id,
            newname: name,
            eduInst: eduInst,
        },
    });
    const [
        handleSubmit,
        { isError, error, isSuccess, data, isLoading, reset },
    ] = useUpdateStudentInfoMutation();

    const handleOnSubmit = (data) => {
        handleSubmit(data);
    };

    if (isError) {
        if (error.data == "Student Info updated successfully") {
            toast.success(error.data);
            let data = {
                name: watch("newname"),
                eduInst: watch("eduInst"),
            };
            dispatch(updateProfile(data));
            reset();
        } else {
            toast.error(error.data);
        }
    }

    return (
        <div>
            <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                <div className="max-w-lg mx-auto">
                    <h1 className="text-2xl font-bold text-center sm:text-3xl">
                        Update Proflie
                    </h1>

                    <form
                        onSubmit={handleFormSubmit(handleOnSubmit)}
                        className="mt-6 mb-0 space-y-4 rounded-lg card bg-base-200"
                    >
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
                                        {...register("newname", {
                                            required: "Name is required",
                                            minLength: {
                                                value: 3,
                                                message:
                                                    "Name must be at least 3 characters",
                                            },
                                        })}
                                    />
                                </label>
                                <p className="mt-1 text-xs text-red-500">
                                    {errors?.newname?.message}
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
                                        {...register("eduInst")}
                                    />
                                </label>
                                <p className="mt-1 text-xs text-red-500">
                                    {errors?.eduInst?.message}
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
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
