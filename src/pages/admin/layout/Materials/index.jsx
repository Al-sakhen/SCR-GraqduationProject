import { toast } from "react-toastify";
import {
    useDeleteMaterialMutation,
    useGetAllMaterialsQuery,
} from "../../../../services/aspiAPI";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import TableRow from "./TableRow";

const AdMaterials = () => {
    // ========Fetching data =========
    const { isError, isFetching, isLoading, isSuccess, data, refetch } =
        useGetAllMaterialsQuery();

    useEffect(() => {
        refetch();
    }, []);

    const [
        deleteMaterial,
        {
            isLoading: isLoadingDelete,
            isSuccess: isSuccessDelete,
            isError: isErrorDelete,
            error: errorDelete,
            reset: resetDelete,
            data: dataDelete,
        },
    ] = useDeleteMaterialMutation();

    const handleDelete = (id) => {
        deleteMaterial(id);
    };
    if (isErrorDelete) {
        if (errorDelete.data == "Material deleted successfully") {
            toast.success(errorDelete.data);
            resetDelete();
            refetch();
        } else {
            toast.error("Error deleting material");
        }
    }

    if (isLoading)
        return (
            <div className="flex items-center justify-center h-screen">
                Loading...
            </div>
        );

    if (isError) {
        return <div>Error...</div>;
    }

    if (isSuccess) {
        return (
            <>
                <div className="flex items-center justify-between pb-4">
                    <h2 className="text-3xl">Materials Table</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Description</th>
                                <th>File format</th>
                                <th>Uploaded By</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((material, index) => (
                                <TableRow
                                    key={index + 1}
                                    material={material}
                                    handleDelete={handleDelete}
                                />
                            ))}

                            {data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="font-bold text-center"
                                    >
                                        No data
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
};

export default AdMaterials;
