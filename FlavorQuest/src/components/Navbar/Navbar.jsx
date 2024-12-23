import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Authprovider/Authprovider";
import Swal from "sweetalert2";

const Navbar = () => {
    const { user,isRegistered, logout } = useContext(AuthContext);

    const handleLogout = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await logout();
                    Swal.fire(
                        "Logged Out!",
                        "You have been successfully logged out.",
                        "success"
                    );
                } catch (err) {
                    Swal.fire(
                        "Error!",
                        err.message || "Something went wrong while logging out.",
                        "error"
                    );
                }
            }
        });
    };

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <Link to="/"><li><a>Home</a></li></Link>
                        <li><a>All Food</a></li>
                        <li><a>Gallery</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">FlavorQuest</a>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <Link to="/"><li><a>Home</a></li></Link>
                    <li><a>All Food</a></li>
                    <li><a>Gallery</a></li>
                </ul>
            </div>

            <div className="navbar-end gap-2">
                {isRegistered ? (
                    <>
                        <div className="flex items-center gap-2">
                            <img
                                src={user.photoURL || "https://via.placeholder.com/40"}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full border"
                            />
                            <button className="btn btn-outline" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <a className="btn">Login</a>
                        </Link>
                        <Link to="/register">
                            <a className="btn">Sign up</a>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
