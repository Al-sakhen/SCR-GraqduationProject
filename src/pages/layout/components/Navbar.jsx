import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import navlinks from "../../../assets/navbarLinks";

const Navbar = () => {
    const { user, token, role } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <div className="border-b-2 border-red-200 border-dashed navbar bg-base-200">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {navlinks.map((link, index) => (
                            <li>
                                <NavLink key={index} to={link.path}>
                                    {link.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <NavLink className="h-20 text-xl btn btn-ghost" to={"/"}>
                    <img src="/logoSCR.png" alt="" className="object-cover h-full w-36" />
                </NavLink>
            </div>
            <div className="hidden navbar-center lg:flex">
                <ul className="px-1 menu menu-horizontal">
                    {navlinks.map((link, index) => (
                        <li>
                            <NavLink
                                key={`${index}-${link.path}`}
                                to={link.path}
                            >
                                {link.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
                    >
                        <li>
                            <NavLink to={"materials/create"}>
                                Add material
                            </NavLink>
                        </li>
                        <li>
                            <a onClick={handleLogout}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
