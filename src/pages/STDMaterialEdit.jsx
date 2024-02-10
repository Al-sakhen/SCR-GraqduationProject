import { NavLink, useParams } from "react-router-dom";
import {
    useGetMaterialByIdQuery,
    useUpdateMaterialDescriptionMutation,
} from "../services/aspiAPI";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";

const STDMaterialEdit = () => {
    const { id: MaterialId } = useParams();
    const {
        register,
        handleSubmit,
        reset: resetForm,
        formState: { errors },
    } = useForm({
        defaultValues: {
            matId: MaterialId,
            description: "",
        },
    });
    // ---------------------------------------------------------
    // ======================== APIS ========================
    const { isError, isFetching, isLoading, isSuccess, data, refetch } =
        useGetMaterialByIdQuery(MaterialId);

    useEffect(() => {
        refetch();
    }, [MaterialId]);
    
    const [
        handleUpdateDescription,
        {
            isLoading: isLoadingUpdateDescription,
            isSuccess: isSuccessUpdateDescription,
            isError: isErrorUpdateDescription,
            error: errorUpdateDescription,
            reset: resetUpdateDescription,
            data: dataUpdateDescription,
        },
    ] = useUpdateMaterialDescriptionMutation();

    // ======================== End APIS ========================
    // *********************************************************

    // ---------------------------------------------------------
    // ======================== Handlers ========================
    const handleUpdate = (data) => {
        handleUpdateDescription(data);
    };
    // ======================== End Handlers ========================
    // *********************************************************

    if (isSuccessUpdateDescription) {
        toast.success("Description updated successfully");
        refetch();
        resetUpdateDescription();
    }

    if (data) {
        return (
            <>
                <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                    <div className="max-w-lg mx-auto">
                        <h1 className="text-2xl font-bold text-center sm:text-3xl">
                            Update Material Description
                        </h1>

                        <form
                            onSubmit={handleSubmit(handleUpdate)}
                            className="mt-6 mb-0 space-y-4 rounded-lg card bg-base-200"
                        >
                            <div className="card-body">
                                <div className="flex flex-col w-full mb-4 form-control">
                                    <div className="">
                                        <input
                                            type={"text"}
                                            placeholder={"Enter description"}
                                            className="w-full input input-bordered"
                                            {...register("description", {
                                                value: data.description,
                                                disabled:
                                                    isLoadingUpdateDescription,
                                                required:
                                                    "Description is required",
                                                minLength: {
                                                    value: 5,
                                                    message:
                                                        "Description must be at least 5 characters",
                                                },
                                            })}
                                        />
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors?.description?.message}
                                        </p>
                                    </div>
                                    <button
                                        type="submit"
                                        className="p-1 max-w-24 btn btn-sm btn-primary"
                                        disabled={isLoadingUpdateDescription}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
};

export default STDMaterialEdit;
