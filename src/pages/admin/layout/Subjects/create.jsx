import React, { useState } from "react";
import { useAddSubjectMutation } from "../../../../services/aspiAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateSubjectDialog = ({ refetch }) => {
    const navigate = useNavigate();

    const [subject, setSubject] = useState({
        subjectName: "",
    });

    const [cities, setSelectedCities] = useState([
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
    ]);

    const [handleSubmit, { isLoading, isSuccess, reset }] =
        useAddSubjectMutation();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (subject.subjectName === "") {
            toast.error("Category name is required");
        } else {
            handleSubmit(subject);
        }
    };

    if (isSuccess) {
        toast.success("Category added successfully");
        subject.subjectName = "";
        document.getElementById("add_subject").close();
        navigate("/admin/subjects");
        reset();
        refetch();
    }

    return (
        <dialog id="add_subject" className="modal">
            <div className="modal-box">
                <h3 className="text-lg font-bold">Add new subject</h3>
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
                                            subject name
                                        </span>
                                    </div>
                    
                                    <input
                                        required
                                        type="text"
                                        name="subjectName"
                                        placeholder="Enter subject name"
                                        className="w-full input input-bordered"
                                        value={subject.subjectName}
                                        disabled={isLoading}
                                        onChange={(e) =>
                                            setSubject({
                                                ...subject,
                                                subjectName: e.target.value,
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

export default CreateSubjectDialog;
