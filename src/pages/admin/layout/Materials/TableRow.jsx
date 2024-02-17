import React from "react";
import { NavLink } from "react-router-dom";
import { useGetStudentInfoQuery } from "../../../../services/aspiAPI";

const TableRow = ({ material, handleDelete }) => {
    const {
        isError: isErrorStudentInfo,
        isFetching: isFetchingStudentInfo,
        isLoading: isLoadingStudentInfo,
        isSuccess: isSuccessStudentInfo,
        data: dataStudentInfo,
        refetch: refetchStudentInfo,
    } = useGetStudentInfoQuery(material?.stdId);

    return (
        <tr>
            <th>{material.materialId}</th>
            <td>{material.description}</td>
            <td>{material.fileFormat}</td>
            <td>
                {isFetchingStudentInfo ? (
                    "Loading..."
                ) : (
                    <span>
                        {dataStudentInfo?.stdName} 
                    </span>
                )}
            </td>
            <td className="space-x-2">
                <NavLink
                    to={`/admin/materials/${material.materialId}/reports`}
                    className="btn btn-sm btn-info"
                >
                    Reports
                </NavLink>
                <NavLink
                    to={`/admin/materials/${material.materialId}/comments`}
                    className="btn btn-sm btn-success"
                >
                    Comments
                </NavLink>
                <button
                    onClick={() => handleDelete(material.materialId)}
                    className="btn btn-sm btn-error"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default TableRow;
