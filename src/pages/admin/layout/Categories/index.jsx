import { toast } from "react-toastify";
import {
    useDeleteCategoryMutation,
    useGetAllCategoriesQuery,
} from "../../../../services/aspiAPI";
import CreateCategoryDialog from "./create";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const Categories = () => {
    // ========Fetching data =========
    const { isError, isFetching, isLoading, isSuccess, data, refetch } =
        useGetAllCategoriesQuery();

    const [
        deleteCategory,
        {
            isLoading: isDeleting,
            isSuccess: isDeleteSuccess,
            error: deleteError,
            isError: isDeleteError,
            data: deleteData,
            reset,
        },
    ] = useDeleteCategoryMutation();

    
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

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            deleteCategory(id);
        }
    };

    if (isSuccess) {
        return (
            <>
                <div className="flex items-center justify-between pb-4">
                    <h2 className="text-3xl">Categories Table</h2>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                            document.getElementById("add_category").showModal()
                        }
                    >
                        Add Category
                    </button>
                    <CreateCategoryDialog refetch={refetch} />
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
                            {data.map((category, index) => (
                                <tr key={category.catId}>
                                    <th>{category.catId}</th>
                                    <td>{category.catName}</td>
                                    <td className="space-x-2">
                                        <NavLink
                                            to={`/admin/categories/edit/${category.catId}`}
                                            className="btn btn-sm btn-warning"
                                        >
                                            Edit
                                        </NavLink>
                                        <button
                                            className="btn btn-sm btn-accent"
                                            onClick={() =>
                                                handleDelete(category.catId)
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

export default Categories;
