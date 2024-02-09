import React, { useState } from "react";
import { useAddCategoryMutation } from "../../../../services/aspiAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateCategoryDialog = ({ refetch }) => {
    const navigate = useNavigate();

    const [category, setCategory] = useState({
        catName: "",
    });

    const [handleSubmit, { isLoading, isSuccess, reset }] =
        useAddCategoryMutation();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (category.catName === "") {
            toast.error("Category name is required");
        } else {
            handleSubmit(category);
        }
    };

    if (isSuccess) {
        toast.success("Category added successfully");
        category.catName = "";
        document.getElementById("add_category").close();
        navigate("/admin/categories");
        reset();
        refetch();
    }

    return (
        <dialog id="add_category" className="modal">
            <div className="modal-box">
                <h3 className="text-lg font-bold">Add new category</h3>
                <div className="py-4">
                    <form
                        onSubmit={handleOnSubmit}
                        className="mt-6 mb-0 space-y-4 rounded-lg card bg-base-200"
                    >
                        <div className="card-body">
                            <div>
                                <label className="w-full form-control">
                                    <div className="label">
                                        <span className="label-text">
                                            Category name
                                        </span>
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        name="catName"
                                        placeholder="Enter category name"
                                        className="w-full input input-bordered"
                                        value={category.catName}
                                        disabled={isLoading}
                                        onChange={(e) =>
                                            setCategory({
                                                ...category,
                                                catName: e.target.value,
                                            })
                                        }
                                    />
                                </label>
                            </div>

                            <button
                                type="submit"
                                className={
                                    isLoading
                                        ? "btn btn-primary btn-block"
                                        : "btn btn-primary btn-block"
                                }
                                disabled={isLoading}
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default CreateCategoryDialog;
