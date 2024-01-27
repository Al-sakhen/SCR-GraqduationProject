import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../layout/components/Navbar";
import { logout } from "../../../features/auth/authSlice";
import AdminNavbar from "./components/AdminNavbar";

const AdminLayout = () => {
    const { token, role } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        if (role !== "Writer") {
            navigate("/");
            return;
        }
    }, [token]);

    return (
        <>
            <div className="drawer lg:drawer-open">
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content">
                    {/* Page content here */}

                    {/* =========== Navbar ===========*/}
                    <AdminNavbar />

                    {/* ------------------------------ */}
                    {/* ------ start content  ------*/}
                    <div className="container py-4 rounded-2xl bg-base-200 mt-7">
                        <Outlet />
                    </div>
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-2"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="min-h-full p-4 text-lg menu w-80 bg-base-200 text-base-content">
                        <li>
                            <Link to={"/admin"} className="mb-10 text-center bg-base-100">
                                Dashboard
                            </Link>
                        </li>
                        {/* Sidebar content here */}
                        <li>
                            <NavLink to={"/admin/categories"}>Categories</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/admin/subjects"}>Subjects</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default AdminLayout;
