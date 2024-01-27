import { useDispatch } from "react-redux";
import { logout } from "../../../../features/auth/authSlice";

const AdminNavbar = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <div className="bg-base-200 navbar">
            <div className="flex-1">
                <label
                    className="btn btn-circle swap swap-rotate drawer-button lg:hidden"
                    htmlFor="my-drawer-2"
                >
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" />

                    {/* hamburger icon */}
                    <svg
                        className="fill-current swap-off"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 512 512"
                    >
                        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                    </svg>

                    {/* close icon */}
                    <svg
                        className="fill-current swap-on"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 512 512"
                    >
                        <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                    </svg>
                </label>
            </div>
            <div className="flex-none gap-2">
                {/* <div className="form-control">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-24 input input-bordered md:w-auto"
                    />
                </div> */}
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
                            <a onClick={handleLogout}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;
