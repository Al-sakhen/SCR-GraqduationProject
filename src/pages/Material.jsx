import { NavLink, useParams } from "react-router-dom";
import {
    useAddBookmarkMutation,
    useAddCommentMutation,
    useAddRateMutation,
    useAddReportMutation,
    useDeleteCommentMutation,
    useGetAverageRatesByMaterialIdQuery,
    useGetCommentsByMaterialIdQuery,
    useGetMaterialByIdQuery,
} from "../services/aspiAPI";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DownloadBTN from "./layout/components/DownloadBTN";
import CommentComponent from "./layout/components/CommentComponent";
import { useEffect } from "react";

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

    const {
        register: registerReport,
        handleSubmit: handleSubmitReport,
        reset: resetReportForm,
        formState: { errors: reportErrors },
    } = useForm({
        defaultValues: {
            description: "",
            materialId: MaterialId,
            stdId: StdId,
        },
    });

    const {
        register: registerRate,
        handleSubmit: handleSubmitRate,
        reset: resetRateForm,
        formState: { errors: rateErrors },
        watch: watchRate,
    } = useForm({
        defaultValues: {
            degree: 1,
            materialId: MaterialId,
            stdId: StdId,
        },
    });

    // ---------------------------------------------------------
    // ======================== APIS ========================
    const { isError, isFetching, isLoading, isSuccess, data, refetch } =
        useGetMaterialByIdQuery(MaterialId);

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

    const [
        handleReportSubmit,
        {
            isLoading: isLoadingReport,
            isSuccess: isReportSuccessfully,
            isError: isErrorReport,
            error: errorReport,
            reset: resetReport,
            data: dataReport,
        },
    ] = useAddReportMutation();

    const [
        handleBookmarkSubmit,
        {
            isLoading: isLoadingBookmark,
            isSuccess: isBookmarkSuccessfully,
            isError: isErrorBookmark,
            error: errorBookmark,
            reset: resetBookmark,
        },
    ] = useAddBookmarkMutation();

    const [
        handleRateSubmit,
        {
            isLoading: isLoadingRate,
            isSuccess: isRateSuccessfully,
            isError: isErrorRate,
            error: errorRate,
            data: dataRate,
            reset: resetRate,
            status: statusRate,
        },
    ] = useAddRateMutation();

    const {
        data: dataRateAvg,
        isLoading: isLoadingRateAvg,
        isError: isErrorRateAvg,
        error: errorRateAvg,
        refetch: refetchRateAvg,
        isSuccess: isSuccessRateAvg,
    } = useGetAverageRatesByMaterialIdQuery(MaterialId);

    // ======================== End APIS ========================
    // *********************************************************
    useEffect(() => {
        refetch();
        refetchRateAvg();
        refetchComments();
    }, [MaterialId]);
    // ---------------------------------------------------------
    // ======================== Handlers ========================
    const handleOnSubmit = (data) => {
        handleFormSubmit(data);
    };

    const handleReportOnSubmit = (data) => {
        handleReportSubmit(data);
    };

    const handleDelete = () => {
        const confirm = window.confirm("Are you sure you want to delete?");
        if (!confirm) return;
        handleDeleteComment({ StdId, MatId: MaterialId });
    };

    const handleBookmark = () => {
        handleBookmarkSubmit({ stdId: StdId, materialId: MaterialId });
    };

    const handleRate = (data) => {
        handleRateSubmit(data);
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

    if (isReportSuccessfully) {
        toast.success("Report added successfully");
        resetReport();
        resetReportForm();
        document.getElementById("reportModal").close();
    }

    if (isErrorReport) {
        if (errorReport.data == "Repor has been send") {
            toast.success("Report added successfully");
            resetReport();
            resetReportForm();
            document.getElementById("reportModal").close();
        } else {
            toast.error("Report not added");
        }
    }

    if (isBookmarkSuccessfully) {
        toast.success("Material added to bookmark successfully");
        resetBookmark();
    }
    if (isErrorBookmark) {
        toast.error(errorBookmark.data);
        resetBookmark();
    }

    if (isRateSuccessfully) {
        toast.success("Rate added successfully");
        resetRate();
        resetRateForm();
        refetchRateAvg();
    }
    if (isErrorRate) {
        toast.error("Material already rated");
        resetRate();
    }
    return (
        <>
            <div className="relative pt-4 pb-10">
                <div className="absolute top-0 right-0">
                    <DownloadBTN
                        MaterialId={MaterialId}
                        fileFormat={data.fileFormat}
                    />
                </div>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button
                    className="mt-3 btn btn-sm btn-info "
                    onClick={() =>
                        document.getElementById("reportModal").showModal()
                    }
                >
                    Report
                </button>
                <button
                    className="mx-4 mt-3 btn btn-sm btn-secondary"
                    onClick={() => handleBookmark()}
                    disabled={isLoadingBookmark}
                >
                    Bookmark
                </button>
                <dialog id="reportModal" className="modal">
                    <div className="modal-box">
                        <h3 className="pb-4 text-lg font-bold">
                            Report this material!
                        </h3>

                        <form
                            onSubmit={handleSubmitReport(handleReportOnSubmit)}
                        >
                            <div className="flex flex-col w-full mb-4 form-control">
                                <div className="">
                                    <textarea
                                        type={"text"}
                                        placeholder={"Enter description"}
                                        className="w-full input input-bordered"
                                        {...registerReport("description", {
                                            disabled: isLoadingReport,
                                        })}
                                    />
                                    <p className="mt-1 text-xs text-red-500">
                                        {reportErrors?.description?.message}
                                    </p>
                                </div>
                                <button
                                    type="submit"
                                    className="p-1 max-w-24 btn btn-sm btn-primary"
                                    disabled={isLoadingReport}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
                <p className="text-3xl font-bold mt-11 ">{data.description}</p>
                {isSuccessRateAvg && dataRateAvg?.averageRate > 0 && (
                    <p className="mt-3 bg-yellow-400 badge dark:text-black">
                        <span className="px-2 font-bold">Rating : </span>
                        {Math.round(dataRateAvg.averageRate)} / 5
                    </p>
                )}
            </div>

            <div className="flex flex-col items-center justify-between mt-4 md:flex-row">
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
                                add
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    <form onSubmit={handleSubmitRate(handleRate)}>
                        <div className="flex items-center justify-center w-full gap-2 mb-4 form-control">
                            <div className="rating">
                                <input
                                    type="radio"
                                    name="rating-2"
                                    className="bg-orange-400 mask mask-star-2"
                                    value="1"
                                    {...registerRate("degree")}
                                    checked={
                                        watchRate("degree") === "1" ||
                                        !watchRate("degree")
                                    }
                                />
                                <input
                                    type="radio"
                                    name="rating-2"
                                    className="bg-orange-400 mask mask-star-2"
                                    value="2"
                                    {...registerRate("degree")}
                                    checked={watchRate("degree") === "2"}
                                />
                                <input
                                    type="radio"
                                    name="rating-2"
                                    className="bg-orange-400 mask mask-star-2"
                                    value="3"
                                    {...registerRate("degree")}
                                    checked={watchRate("degree") === "3"}
                                />
                                <input
                                    type="radio"
                                    name="rating-2"
                                    className="bg-orange-400 mask mask-star-2"
                                    value="4"
                                    {...registerRate("degree")}
                                    checked={watchRate("degree") === "4"}
                                />
                                <input
                                    type="radio"
                                    name="rating-2"
                                    className="bg-orange-400 mask mask-star-2"
                                    value="5"
                                    {...registerRate("degree")}
                                    checked={watchRate("degree") === "5"}
                                />
                            </div>
                            <button
                                type="submit"
                                className="p-1 px-2 max-w-24 btn btn-sm btn-primary"
                                disabled={isLoadingRate}
                            >
                                Add Rate
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <hr className="py-2 border-red-400 border-dotted" />
            <h3 className="text-xl font-medium">Latest comments :</h3>
            {isErrorComments && <p>Comments not found</p>}

            {isSuccessComments && dataComments.length === 0 && (
                <p className="p-2 mt-3 text-center rounded-sm bg-base-100">
                    No comments yet
                </p>
            )}
            {isFetchingComments ||
                (isLoadingComments && (
                    <p className="p-2 mt-3 rounded-sm bg-base-100">
                        Loading...
                    </p>
                ))}

            {isSuccessComments && dataComments.length > 0 && (
                <div className="mt-3">
                    <div className="grid gap-4 md:grid-cols-2">
                        {dataComments.map((comment, idx) => (
                            <>
                                <CommentComponent
                                    key={idx}
                                    comment={comment}
                                    onDelete={handleDelete}
                                    isDisabled={isLoadingDeleteComment}
                                />
                            </>
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
