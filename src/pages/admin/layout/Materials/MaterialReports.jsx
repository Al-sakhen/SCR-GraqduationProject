import { useGetReportsByMaterialIdQuery } from "../../../../services/aspiAPI";
import { useParams } from "react-router-dom";

const MaterialReports = () => {
    const { id: materialId } = useParams();
    // ========Fetching data =========
    const { isError, isFetching, isLoading, isSuccess, data, refetch } =
        useGetReportsByMaterialIdQuery(materialId);

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
                    <h2 className="text-3xl">Reports Table</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((material, index) => (
                                <tr key={index + 1}>
                                    <th>{index + 1}</th>
                                    <td>{material.description}</td>
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
