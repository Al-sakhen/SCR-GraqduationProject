import { toast } from "react-toastify";
import {
    useGetCategoryByIdQuery,
    useGetSubjectByIdQuery,
    useUpdateSubjectNameMutation,
} from "../../../../services/aspiAPI";
import { useNavigate, useParams } from "react-router-dom";
import InputWithLabel from "../../../../components/shared/InputWithLabel";
import { useEffect, useState } from "react";

const SubjectEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [subject, setSubject] = useState({
        subjectId: "",
        subjectName: "",
    });

    const { isError, isLoading, isSuccess, refetch, data } =
    useGetSubjectByIdQuery(id);

    useEffect(() => {
        if (isSuccess) {
            setSubject(data);
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
    ] = useUpdateSubjectNameMutation();

    if (updateIsError) {
        if (updateError.data == "Subject name updated successfully") {
            toast.success(updateError.data);
            navigate("/admin/subjects");
            reset();
            refetch();
        } else {
            toast.error("Something went wrong");
        }
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (subject.subjectName === "") {
            toast.error("Subject name is required");
        } else {
            handleSubmit(subject);
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
        navigate("/admin");
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
                                    label="Subject name"
                                    placeholder="Enter subject name"
                                    value={subject.subjectName}
                                    disabled={updateIsLoading}
                                    onChange={(e) => {
                                        setSubject({
                                            ...subject,
                                            subjectName: e.target.value,
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

export default SubjectEdit;
