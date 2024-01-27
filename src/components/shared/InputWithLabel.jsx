import React from "react";

const InputWithLabel = ({
    label,
    type = "text",
    placeholder = "",
    name = "",
    isRequired = true,
    value = "",
    isLoading = false,
    onChange = () => {},
}) => {
    return (
        <div>
            <label className="w-full form-control">
                <div className="label">
                    <span className="label-text">
                        {label}{" "}
                        {isRequired && <span className="text-red-500">*</span>}
                    </span>
                </div>
                <input
                    required={isRequired}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className="w-full input input-bordered"
                    value={value}
                    disabled={isLoading}
                    onChange={onChange}
                />
            </label>
        </div>
    );
};

export default InputWithLabel;
