import { toast } from "react-toastify";
import {
    useGetCategoryByIdQuery,
    useUpdateCategoryNameMutation,
} from "../../../../services/aspiAPI";
import { useNavigate, useParams } from "react-router-dom";
import InputWithLabel from "../../../../components/shared/InputWithLabel";
import { useEffect, useState } from "react";

const CategoriesEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [category, setCategory] = useState({
        catId: "",
        catName: "",
    });

    const { isError, isLoading, isSuccess, refetch, data } =
        useGetCategoryByIdQuery(id);

    useEffect(() => {
        if (isSuccess) {
            setCategory(data);
        }
    }, [isSuccess, data]);
    const [
        handleSubmit,
        {
            isSuccess: isUpdateSuccess,
            reset,
            isError: updateIsError,
            error: updateError,
            isLoading: updateIsLoading,
            data: updateData,
        },
    ] = useUpdateCategoryNameMutation();

    if (updateIsError) {
        if (updateError.data == "Category name updated successfully") {
            toast.success(updateError.data);
            navigate("/admin/categories");
            reset();
            refetch();
        } else {
            toast.error("Something went wrong");
        }
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (category.catName === "") {
            toast.error("Category name is required");
        } else {
            handleSubmit(category);
        }
    };

    if (isLoading)
        return (
            <div className="flex items-center justify-center h-screen">
                Loading...
            </div>
        );

    if (isError) {
        toast.error("Category not found");
        navigate("/admin/categories");
        return;
    }

    if (isSuccess) {
        return (
            <>
                <div className="max-w-lg py-4 mx-auto card">
                    <form
                        onSubmit={handleOnSubmit}
                        className="mt-6 mb-0 space-y-4 rounded-lg card bg-base-200"
                    >
                        <div className="card-body">
                            <div>
                                <InputWithLabel
                                    label="Category name"
                                    placeholder="Enter category name"
                                    value={category.catName}
                                    disabled={updateIsLoading}
                                    onChange={(e) => {
                                        setCategory({
                                            ...category,
                                            catName: e.target.value,
                                        });
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                className={
                                    isLoading
                                        ? "btn btn-primary btn-block"
                                        : "btn btn-primary btn-block"
                                }
                                disabled={updateIsLoading}
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
};

export default CategoriesEdit;
