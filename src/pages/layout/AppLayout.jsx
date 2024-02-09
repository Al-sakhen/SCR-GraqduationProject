import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// ========== Layout For Student ==========
const AppLayout = ({ children }) => {
    const { role, token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!children) {
            if (!token) {
                toast.error("You must login first!");
                navigate("/login");
                return;
            }
            if (role !== "Reader") {
                navigate("/admin");
                return;
            }
        }
    }, [token]);

    return (
        <>
            <Navbar />
            {!children && (
                <div className="container py-5 mt-8 bg-base-300">
                    <Outlet />
                </div>
            )}
            {children}
        </>
    );
};

export default AppLayout;
