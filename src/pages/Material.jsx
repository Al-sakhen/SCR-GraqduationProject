import { NavLink, useParams } from "react-router-dom";
import {
    useAddCommentMutation,
    useDeleteCommentMutation,
    useGetCommentsByMaterialIdQuery,
    useGetMaterialByIdQuery,
} from "../services/aspiAPI";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Material = () => {
    const { id: MaterialId } = useParams();
    const { id: StdId } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        reset: resetForm,
        formState: { errors },
    } = useForm({
        defaultValues: {
            content: "",
            materialId: MaterialId,
            stdId: StdId,
        },
    });

    // ---------------------------------------------------------
    // ======================== APIS ========================
    const { isError, isFetching, isLoading, isSuccess, data, refetch } =
        useGetMaterialByIdQuery(MaterialId);

    // const {
    //     isError: isErrorDownload,
    //     isFetching: isFetchingDownload,
    //     isLoading: isLoadingDownload,
    //     isSuccess: isSuccessDownload,
    //     data: dataDownload,
    //     refetch: refetchDownload,
    // } = useDownloadMaterialQuery(MaterialId);

    const {
        isError: isErrorComments,
        isFetching: isFetchingComments,
        isLoading: isLoadingComments,
        isSuccess: isSuccessComments,
        data: dataComments,
        refetch: refetchComments,
    } = useGetCommentsByMaterialIdQuery(MaterialId);

    const [
        handleFormSubmit,
        {
            isLoading: isLoadingCommentsAdd,
            isSuccess: isCommentAddesSuccessfully,
            isError: isErrorCommentsAdd,
            error: errorCommentsAdd,
            reset: resetCommentsAdd,
        },
    ] = useAddCommentMutation();

    const [
        handleDeleteComment,
        {
            isLoading: isLoadingDeleteComment,
            isSuccess: isSuccessDeleteComment,
            isError: isErrorDeleteComment,
            error: errorDeleteComment,
            reset: resetDeleteComment,
        },
    ] = useDeleteCommentMutation();
    // ======================== End APIS ========================
    // *********************************************************

    // ---------------------------------------------------------
    // ======================== Handlers ========================
    const handleOnSubmit = (data) => {
        handleFormSubmit(data);
    };

    const handleDelete = () => {
        const confirm = window.confirm("Are you sure you want to delete?");
        if (!confirm) return;
        handleDeleteComment({ StdId, MatId: MaterialId });
    };

    // ======================== End Handlers ========================
    // *********************************************************

    if (isCommentAddesSuccessfully) {
        toast.success("Comment added successfully");
        refetchComments();
        resetCommentsAdd();
        resetForm();
    }

    if (isErrorCommentsAdd) {
        toast.error("Comment not added");
        resetForm();
        resetCommentsAdd();
    }

    if (
        isErrorDeleteComment &&
        errorDeleteComment.data == "Comment deleted successfully"
    ) {
        toast.success("Comment deleted successfully");
        refetchComments();
        resetDeleteComment();
    }

    if (isSuccessDeleteComment) {
        toast.success("Comment deleted successfully");
        refetchComments();
        resetDeleteComment();
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
                <p>Material not found</p>
            </div>
        );
    }

    if (isSuccess && data.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Material not found</p>
            </div>
        );
    }

    return (
        <>
            <div className="relative pt-4 pb-10">
                <NavLink
                    // to previous page
                    className="absolute top-0 left-0 text-3xl font-bold text-center hover:text-cyan-900"
                >
                    🔙
                </NavLink>
                <span className="absolute top-0 right-0 p-2 text-white bg-red-500 rounded-lg">
                    {data.fileFormat}
                </span>

                <p className="text-xl font-bold text-center ">
                    {data.description}
                </p>
            </div>

            <div className="mt-4">
                <div>
                    <form onSubmit={handleSubmit(handleOnSubmit)}>
                        <div className="flex w-full mb-4 form-control">
                            <div className="">
                                <input
                                    type={"text"}
                                    placeholder={"Enter comment"}
                                    className="min-w-96 input input-bordered"
                                    {...register("content", {
                                        disabled: isLoadingCommentsAdd,
                                    })}
                                />
                                <p className="mt-1 text-xs text-red-500">
                                    {errors?.content?.message}
                                </p>
                            </div>
                            <button
                                type="submit"
                                className="p-1 max-w-24 btn btn-sm btn-primary"
                                disabled={isLoadingCommentsAdd}
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <h3 className="text-xl font-medium">Latest comments :</h3>
            {isErrorComments && <p>Comments not found</p>}

            {isSuccessComments && dataComments.length === 0 && (
                <p className="p-2 mt-3 text-center rounded-sm bg-base-100">
                    No comments yet
                </p>
            )}
            {isFetchingComments && (
                <p className="p-2 mt-3 rounded-sm bg-base-100">Loading...</p>
            )}

            {isSuccessComments && dataComments.length > 0 && (
                <div className="mt-3">
                    <div className="grid gap-4 md:grid-cols-2">
                        {dataComments.map((comment, idx) => (
                            <div
                                key={idx}
                                className="flex flex-row items-center justify-between p-3 bg-red-100 rounded-sm gap-7"
                            >
                                <p 
                                    className="text-wrap"
                                >{comment.content}</p>
                                {comment.stdId === StdId && (
                                    <button
                                        className="p-1 ml-3 btn btn-sm btn-error"
                                        onClick={() => handleDelete()}
                                        disabled={isLoadingDeleteComment}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isFetching && <progress className="w-full progress"></progress>}
            <div className="grid gap-2 gap-y-5 lg:gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] "></div>
        </>
    );
};

export default Material;
