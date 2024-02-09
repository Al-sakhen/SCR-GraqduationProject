import { toast } from "react-toastify";

import CreateSubjectDialog from "./create";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import {
    useDeleteSubjectMutation,
    useGetAllSubjectsQuery,
} from "../../../../services/aspiAPI";

const Subjects = () => {
    // ========Fetching data =========
    const { isError, isFetching, isLoading, isSuccess, data, refetch } =
        useGetAllSubjectsQuery();

    const [
        deleteSubject,
        {
            isLoading: isDeleting,
            isSuccess: isDeleteSuccess,
            error: deleteError,
            isError: isDeleteError,
            data: deleteData,
            reset,
        },
    ] = useDeleteSubjectMutation();

    useEffect(() => {
        refetch();
    }, []);

    if (isDeleteError) {
        toast.success(deleteError.data);
        refetch();
        reset();
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

    // ===========Delete category ===========

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this subject?")) {
            deleteSubject(id);
        }
    };
    console.log({ data });
    if (isSuccess) {
        return (
            <>
                <div className="flex items-center justify-between pb-4">
                    <h2 className="text-3xl">Subjects Table</h2>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                            document.getElementById("add_subject").showModal()
                        }
                    >
                        Add Subject
                    </button>
                    <CreateSubjectDialog refetch={refetch} />
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((subject, index) => (
                                <tr key={subject.subjectId}>
                                    <th>{subject.subjectId}</th>
                                    <td>{subject.subjectName}</td>
                                    <td className="space-x-2">
                                        <NavLink
                                            to={`/admin/subjects/edit/${subject.subjectId}`}
                                            className="btn btn-sm btn-warning"
                                        >
                                            Edit
                                        </NavLink>
                                        <button
                                            className="btn btn-sm btn-accent"
                                            onClick={() =>
                                                handleDelete(subject.subjectId)
                                            }
                                            disabled={isDeleting}
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

export default Subjects;
