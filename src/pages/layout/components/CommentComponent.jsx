import { useGetStudentInfoQuery } from "../../../services/aspiAPI";
import { useSelector } from "react-redux";

const CommentComponent = ({ comment, onDelete, isDisabled }) => {
    const { id: StdId } = useSelector((state) => state.auth);

    const { isError, isFetching, isLoading, error, isSuccess, data, refetch } =
        useGetStudentInfoQuery(comment.stdId);

    if (isError || isLoading || isFetching) {
        return (
            <div className="h-16 border skeleton">
                <div className="mt-1 skeleton-text"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-row items-center justify-between px-5 py-3 border rounded-xl bg-base-100 ">
            <p className="flex flex-col gap-3 text-wrap">
                <span
                    className="px-2 py-1 text-sm font-semibold text-center uppercase border skeleton"
                >
                    {data.stdName}
                </span>
                <span className="text-lg">{comment.content}</span>
            </p>
            {comment.stdId === StdId && (
                <button
                    className="p-1 ml-3 btn btn-sm btn-error"
                    onClick={() => onDelete()}
                    disabled={isDisabled}
                >
                    Delete
                </button>
            )}
        </div>
    );
};

export default CommentComponent;
