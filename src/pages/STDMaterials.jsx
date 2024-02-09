import { Link, NavLink, useParams } from "react-router-dom";
import {
    useAddMaterialMutation,
    useGetAllSubjectsQuery,
    useGetMaterialsByStdIdQuery,
} from "../services/aspiAPI";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";

const STDMaterials = () => {
    const { id: StdId } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            MaterialId: 55,
            FileFormat: "format",
            Description: "",
            StdId: StdId,
            File: "",
            SubjectId: "",
        },
    });

    // ---------------------------------------------------------
    // ======================== APIS ========================
    const [
        handleFormSubmit,
        {
            isLoading: isLoadingAdd,
            isSuccess: isSuccessAdd,
            isError: isErrorAdd,
            error: errorAdd,
            data: dataAdd,
            reset: resetAdd,
        },
    ] = useAddMaterialMutation();

    const { isError, isFetching, isLoading, error, isSuccess, data, refetch } =
        useGetMaterialsByStdIdQuery(StdId);

    const {
        data: subjects,
        isLoading: isLoadingSubjects,
        isSuccess: isSuccessSubjects,
        isError: isErrorSubjects,
        error: errorSubjects,
    } = useGetAllSubjectsQuery();
    // ======================== End APIS ========================
    // *********************************************************

    // ---------------------------------------------------------
    // ======================== Handlers ========================
    const handleOnSubmit = (data) => {
        const fd = new FormData();
        fd.append("File", data.File[0]);
        fd.append("Description", data.Description);
        fd.append("StdId", data.StdId);
        fd.append("SubjectId", data.SubjectId);
        fd.append("MaterialId", data.MaterialId);
        fd.append("FileFormat", data.FileFormat);
        handleFormSubmit(fd);
    };

    // ======================== End Handlers ========================
    // *********************************************************
    useEffect(() => {
        refetch();
    }, []);
    if (isSuccessAdd) {
        toast.success("Material added successfully");
        reset();
        resetAdd();
        refetch();
        document.getElementById("addMaterial").close();
    }

    if (isErrorAdd) {
        toast.error(errorAdd.data);
        reset();
        resetAdd();
        refetch();
        document.getElementById("addMaterial").close();
    }
    if (isLoading)
        return (
            <div className="flex items-center justify-center h-screen">
                Loading...
            </div>
        );

    if (isError) {
        return (
            <div className="flex items-center justify-center py-6">
                <p>No Materials found</p>
            </div>
        );
    }

    return (
        <>
            <div className="flex justify-between pt-4 pb-10">
                <p className="text-xl font-bold ">Materials</p>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button
                    className="btn btn-md btn-primary"
                    onClick={() =>
                        document.getElementById("addMaterial").showModal()
                    }
                >
                    Add new material
                </button>
                <dialog id="addMaterial" className="modal">
                    <div className="modal-box">
                        <h3 className="text-lg font-bold">Add new material</h3>
                        <form
                            onSubmit={handleSubmit(handleOnSubmit)}
                            className="mb-0 space-y-4 rounded-lg card bg-base-200"
                        >
                            <div className="card-body">
                                <div>
                                    <div>
                                        <label className="w-full form-control">
                                            <div className="label">
                                                <span className="label-text">
                                                    Description
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </span>
                                            </div>
                                            <input
                                                type={"text"}
                                                placeholder={
                                                    "Enter description"
                                                }
                                                className="w-full input input-bordered"
                                                {...register("Description", {
                                                    required:
                                                        "Description is required",
                                                    disabled: isLoading,
                                                    minLength: {
                                                        value: 5,
                                                        message:
                                                            "Description must be at least 5 characters",
                                                    },
                                                })}
                                            />
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors?.Description?.message}
                                            </p>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="w-full form-control">
                                        <div className="label">
                                            <span className="label-text">
                                                File
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </span>
                                        </div>
                                        <input
                                            required
                                            type="file"
                                            placeholder="Enter file"
                                            className="w-full input input-bordered"
                                            {...register("File", {
                                                required: true,
                                                disabled: isLoadingAdd,
                                            })}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label className="w-full form-control">
                                        <div className="label">
                                            <span className="label-text">
                                                Select subject
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </span>
                                        </div>
                                        <select
                                            className="w-full select select-bordered"
                                            {...register("SubjectId", {
                                                required: true,
                                                disabled:
                                                    isLoading ||
                                                    isLoadingSubjects,
                                            })}
                                        >
                                            <option disabled>
                                                please select subject..
                                            </option>
                                            {subjects &&
                                                subjects.map((subject) => (
                                                    <option
                                                        key={subject.subjectId}
                                                        value={
                                                            subject.subjectId
                                                        }
                                                    >
                                                        {subject.subjectName}
                                                    </option>
                                                ))}
                                        </select>
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className={
                                        isLoadingAdd
                                            ? "btn btn-primary btn-block mt-2"
                                            : "btn btn-primary btn-block mt-2"
                                    }
                                    disabled={isLoadingAdd}
                                >
                                    Upload
                                </button>
                            </div>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>

            {isFetching && <progress className="w-full progress"></progress>}
            <div className="grid gap-2 gap-y-5 lg:gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ">
                {isSuccess &&
                    data.map((material) => (
                        <NavLink
                            to={`/material/${material.materialId}`}
                            key={material.materialId}
                            className="item-card"
                        >
                            <div className="relative card-body">
                                <h2 className="justify-center card-title ">
                                    {material.description}
                                </h2>
                                <Link
                                    className="absolute top-0 right-0 btn-secondary btn btn-sm"
                                    to={`/material/${material.materialId}/edit`}
                                >
                                    Edit
                                </Link>
                                <span className="absolute bottom-0 right-0 p-1 text-white bg-red-500 rounded-br-md rounded-tl-md">
                                    {material.fileFormat}
                                </span>
                            </div>
                        </NavLink>
                    ))}
            </div>
            {isSuccess && data.length === 0 && (
                <div className="flex items-center justify-center ">
                    <p>No materials found</p>
                </div>
            )}
        </>
    );
};

export default STDMaterials;
