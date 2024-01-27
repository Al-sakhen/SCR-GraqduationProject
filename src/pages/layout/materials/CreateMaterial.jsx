import { useSelector } from "react-redux";
import {
    useAddMaterialMutation,
    useGetAllSubjectsQuery,
} from "../../../services/aspiAPI";
import { useForm } from "react-hook-form";

const CreateMaterial = () => {
    const { id: StdId } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
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
    const [handleFormSubmit, { isLoading, isSuccess, data, isError, error }] =
        useAddMaterialMutation();

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

    const logFormData = (formData) => {
        for (let pair of formData.entries()) {
            console.log(pair[0] + ", " + pair[1]);
        }
    };

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
    if (isError) console.log(error);
    if (isSuccess) console.log(data);
    return (
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto">
                <h1 className="text-2xl font-bold text-center sm:text-3xl">
                    Upload new material
                </h1>

                <form
                    onSubmit={handleSubmit(handleOnSubmit)}
                    className="mt-6 mb-0 space-y-4 rounded-lg card bg-base-200"
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
                                        placeholder={"Enter description"}
                                        className="w-full input input-bordered"
                                        {...register("Description", {
                                            required: "Description is required",
                                            disabled: isLoading,
                                            minLength: 5,
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
                                        <span className="text-red-500">*</span>
                                    </span>
                                </div>
                                <input
                                    required
                                    type="file"
                                    placeholder="Enter file"
                                    className="w-full input input-bordered"
                                    {...register("File", {
                                        required: true,
                                        disabled: isLoading,
                                    })}
                                />
                            </label>
                        </div>
                        <div>
                            <label className="w-full form-control">
                                <div className="label">
                                    <span className="label-text">
                                        Select subject
                                        <span className="text-red-500">*</span>
                                    </span>
                                </div>
                                <select
                                    className="w-full select select-bordered"
                                    {...register("SubjectId", {
                                        required: true,
                                        disabled:
                                            isLoading || isLoadingSubjects,
                                    })}
                                >
                                    <option disabled>
                                        please select subject..
                                    </option>
                                    {subjects &&
                                        subjects.map((subject) => (
                                            <option
                                                key={subject.subjectId}
                                                value={subject.subjectId}
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
                                isLoading
                                    ? "btn btn-primary btn-block mt-2"
                                    : "btn btn-primary btn-block mt-2"
                            }
                            disabled={isLoading}
                        >
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateMaterial;
