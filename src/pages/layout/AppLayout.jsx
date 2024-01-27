import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// ========== Layout For Student ==========
const AppLayout = () => {
    const { role, token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        if (role !== "Reader") {
            navigate("/admin");
            return;
        }
    }, [token]);

    return (
        <>
            <Navbar />
            <div className="container py-5 mt-8 bg-base-300">
                <Outlet />
            </div>
        </>
    );
};

export default AppLayout;
