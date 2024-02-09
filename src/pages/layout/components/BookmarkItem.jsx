import { Link, NavLink } from "react-router-dom";
import {
    useGetMaterialByIdQuery,
    useRemoveBookmarkMutation,
} from "../../../services/aspiAPI";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const BookmarkItem = ({ materialId ,onRefetch }) => {
    const { id: StdId } = useSelector((state) => state.auth);
    const { isError, isFetching, isLoading, error, isSuccess, data, refetch } =
        useGetMaterialByIdQuery(materialId);

    const [
        removeMaterial,
        {
            isLoading: isRemoving,
            isError: isRemoveError,
            isSuccess: isRemoveSuccess,
            error: removeError,
            reset,
        },
    ] = useRemoveBookmarkMutation();
    const handleRemove = (materialID) => {
        let data = {
            MatId: materialID,
            StdId,
        };
        removeMaterial(data);
    };
console.log(removeError)
    if (isRemoveError) {
        if (removeError.data == "Bookmark deleted successfully") {
            toast.success("Bookmark deleted successfully");
            refetch();
            reset();
            onRefetch();
        }else{
            toast.error(removeError.data);
        }
        
    }

    if (isError || isLoading || isFetching) {
        return (
            <div className="h-16 border skeleton">
                <div className="mt-1 skeleton-text"></div>
            </div>
        );
    }
    return (
        <div className="relative card-body">
            <NavLink
                to={`/material/${data.materialId}`}
                key={data.materialId}
                className="item-card "
            >
                <h2 className="justify-center py-3 card-title">
                    {data.description}
                </h2>
            </NavLink>
            <button
                onClick={() => handleRemove(data.materialId)}
                className="right-0 z-50 -top-28 btn-secondary btn btn-sm"
            >
                Remove
            </button>
        </div>
    );
};

export default BookmarkItem;
