import { toast } from "react-toastify";
import {
    useDeleteReportMutation,
    useGetReportsByMaterialIdQuery,
} from "../../../../services/aspiAPI";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";

const MaterialReports = () => {
    const { id: materialId } = useParams();
    // ========Fetching data =========
    const { isError, isFetching, isLoading, isSuccess, data, refetch } =
        useGetReportsByMaterialIdQuery(materialId);

    const [
        deleteReport,
        {
            isLoading: isLoadingDelete,
            isSuccess: isSuccessDelete,
            isError: isErrorDelete,
            error: errorDelete,
            reset: resetDelete,
            data: dataDelete,
        },
    ] = useDeleteReportMutation();

    if (isLoading)
        return (
            <div className="flex items-center justify-center h-screen">
                Loading...
            </div>
        );

    if (isError) {
        return <div>Error...</div>;
    }

    const handleDelete = (body) => {
        if (window.confirm("Are you sure you want to delete this report?")) {
            deleteReport(body);
        }
    };

    if(isSuccessDelete){
        toast.success("Report deleted successfully");
        resetDelete();
        refetch();
    }

    if(isErrorDelete && errorDelete){
        toast.error(errorDelete.data);
        resetDelete();
        refetch();

    }
    if (isSuccess) {
        return (
            <>
                <div className="flex items-center justify-between pb-4">
                    <h2 className="text-3xl">Reports Table</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((material, index) => (
                                <tr key={index + 1}>
                                    <th>{index + 1}</th>
                                    <td>{material.description}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleDelete({
                                                    StdId: material.stdId,
                                                    MatId: material.materialId,
                                                })
                                            }
                                            className="btn btn-sm btn-error"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
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

export default MaterialReports;
