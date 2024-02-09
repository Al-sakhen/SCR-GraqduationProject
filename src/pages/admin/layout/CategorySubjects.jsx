import { toast } from "react-toastify";

import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import {
    useAddSubjectCategoryMutation,
    useDeleteSubjectMutation,
    useGetAllCategoriesQuery,
    useGetAllSubjectsQuery,
} from "../../../services/aspiAPI";
import { useForm } from "react-hook-form";

const CategorySubjects = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            subjectId: "",
            catId: "",
        },
    });

    // ========Fetching data =========
    const {
        isError,
        isFetching,
        isLoading,
        isSuccess,
        data: categoriesData,
        refetch,
    } = useGetAllCategoriesQuery();

    const {
        isError: isErrorSubject,
        isFetching: isFetchingSubject,
        isLoading: isLoadingSubject,
        isSuccess: isSuccessSubject,
        data: dataSubject,
        refetch: refetchSubject,
    } = useGetAllSubjectsQuery();

    const [
        addSubjectCategory,
        {
            isSuccess: isSuccessAdd,
            isError: isErrorAdd,
            isLoading: isLoadingAdd,
            error: errorAdd,
            data: dataAdd,
            reset: resetAdd,
        },
    ] = useAddSubjectCategoryMutation();

    console.log({ isSuccessAdd, isErrorAdd, isLoadingAdd, errorAdd, dataAdd });

    if (isLoading)
        return (
            <div className="flex items-center justify-center h-screen">
                Loading...
            </div>
        );

    if (isError) {
        return <div>Error...</div>;
    }

    const handleFormSubmit = (data) => {
        addSubjectCategory(data);
    };
    if (isSuccessAdd) {
        toast.success("Added Successfully");
        refetch();
        refetchSubject();
        resetAdd();
    }
    if (isErrorAdd) {
        toast.error("Failed to add");
    }

    if (isSuccess) {
        return (
            <>
                <h2 className="py-5 text-2xl text-center">
                    Connect Subjects with Categories
                </h2>
                <div className="overflow-x-auto">
                    <div className="card">
                        <div className="card-body">
                            <form
                                onSubmit={handleSubmit(handleFormSubmit)}
                                className="flex flex-col justify-center"
                            >
                                <div className="flex flex-col justify-around md:flex-row">
                                    <label className="label form-control">
                                        <span className="label-text">
                                            Category
                                        </span>
                                        <select
                                            className="min-w-60 select select-bordered"
                                            {...register("catId", {
                                                required: true,
                                            })}
                                        >
                                            <option disabled>
                                                Select category
                                            </option>
                                            {isSuccess &&
                                                categoriesData.map(
                                                    (category) => (
                                                        <option
                                                            key={category.catId}
                                                            value={
                                                                category.catId
                                                            }
                                                        >
                                                            {category.catName}
                                                        </option>
                                                    )
                                                )}
                                        </select>
                                    </label>

                                    <label className="label form-control">
                                        <span className="label-text">
                                            Subject
                                        </span>
                                        <select
                                            className="min-w-60 select select-bordered"
                                            {...register("subjectId", {
                                                required: true,
                                            })}
                                        >
                                            <option disabled>
                                                Select subject
                                            </option>
                                            {isSuccessSubject &&
                                                dataSubject.map((subject) => (
                                                    <option
                                                        key={subject.subjectId}
                                                        value={
                                                            subject.subjectId
                                                        }
                                                    >
                                                        {subject.subjectName}
                                                    </option>
                                                ))}
                                        </select>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="mx-auto mt-5 btn btn-primary max-w-20"
                                    disabled={isLoadingAdd}
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default CategorySubjects;
