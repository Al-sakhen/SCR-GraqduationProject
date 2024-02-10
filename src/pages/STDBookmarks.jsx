import { Link, NavLink, useParams } from "react-router-dom";
import {
    useAddMaterialMutation,
    useGetAllSubjectsQuery,
    useGetBookmarksByStdIdQuery,
    useGetMaterialsByStdIdQuery,
} from "../services/aspiAPI";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import BookmarkItem from "./layout/components/BookmarkItem";

const STDBookmarks = () => {
    const { id: StdId } = useSelector((state) => state.auth);

    // ---------------------------------------------------------
    // ======================== APIS ========================

    const { isError, isFetching, isLoading, error, isSuccess, data, refetch } =
        useGetBookmarksByStdIdQuery(StdId);

    useEffect(() => {
        refetch();
    }, []);

    // ======================== End APIS ========================
    // *********************************************************

    // ---------------------------------------------------------

    if (isLoading)
        return (
            <div className="flex items-center justify-center h-screen">
                Loading...
            </div>
        );

    if (isError) {
        return (
            <div className="flex items-center justify-center py-6">
                <p>No Bookmarks found</p>
            </div>
        );
    }

    return (
        <>
            <div className="flex justify-between pt-4 pb-10">
                <p className="text-xl font-bold ">My Bookmarks</p>
            </div>

            {isFetching && <progress className="w-full progress"></progress>}
            <div className="grid gap-2 gap-y-5 lg:gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ">
                {isSuccess &&
                    data.map((material) => (
                        <BookmarkItem
                            onRefetch={refetch}
                            key={material.materialId}
                            materialId={material.materialId}
                        />
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

export default STDBookmarks;
