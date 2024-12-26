import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Authprovider/Authprovider";
import Swal from "sweetalert2";
import {
    FaHome,
    FaImages,
    FaUtensils,
    FaSignInAlt,
    FaUserPlus,
    FaSignOutAlt,
    FaUserCircle,
    FaMoon, 
    FaSun, 
} from "react-icons/fa";

const Navbar = () => {
    const { user, isRegistered, logout } = useContext(AuthContext);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false); 
   
    useEffect(() => {
        const savedMode = localStorage.getItem("darkMode");
        if (savedMode === "true") {
            document.documentElement.classList.add("dark");
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove("dark");
            setIsDarkMode(false);
        }
    }, []);

    
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        const theme = !isDarkMode ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    };

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
        <div className="navbar bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 text-black dark:text-white rounded-lg mt-1">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
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
                        className="menu menu-sm dropdown-content bg-green-100 rounded-box z-50 mt-3 w-64 p-3 shadow-xl"
                    >
                        <Link to='/'><li><a>Home</a></li></Link>
                        <Link to='/allFoods'><li><a>All Foods</a></li></Link>
                        <li><a>Gallery</a></li>
                    </ul>
                </div>
                <a className=" btn-ghost text-xl">FlavorQuest</a>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <Link to="/">
                        <li>
                            <a className="flex items-center gap-2 hover:text-lg text-sm lg:text-base">
                                <FaHome /> Home
                            </a>
                        </li>
                    </Link>
                    <Link to="/allFoods">
                        <li>
                            <a className="flex items-center gap-2 hover:text-lg text-sm lg:text-base">
                                <FaUtensils /> All Foods
                            </a>
                        </li>
                    </Link>
                    <li>
                        <a className="flex items-center gap-2 hover:text-lg text-sm lg:text-base">
                            <FaImages /> Gallery
                        </a>
                    </li>
                </ul>
            </div>

            <div className="navbar-end gap-2">
               
                <button
                    onClick={toggleDarkMode}
                    className="text-xl  rounded-full hover:bg-gray-200"
                >
                    {isDarkMode ? <FaSun /> : <FaMoon />}
                </button>

                {isRegistered ? (
                    <div className="flex items-center gap-2 relative">
                        <img
                            src={user.photoURL || "https://via.placeholder.com/40"}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full border cursor-pointer"
                            onClick={() => setIsProfileMenuOpen((prev) => !prev)} 
                        />
                        <div
                            className={`${
                                isProfileMenuOpen ? "block" : "hidden"
                            } absolute top-12 right-0 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-4 w-64 z-50`}
                        >
                            <ul>
                                <li>
                                    <Link to="/addFoods" className="block p-2 text-sm text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
                                        Add Food
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/myOrders" className="block p-2 text-sm text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
                                        My Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/myFoods" className="block p-2 text-sm text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
                                        My Foods
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="block p-2 text-sm text-red-500 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                                    >
                                        <FaSignOutAlt /> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-3 lg:gap-5">
                        <Link to="/login">
                            <a className="flex items-center gap-2 text-xs lg:text-sm lg:font-bold">
                                <FaSignInAlt /> Login
                            </a>
                        </Link>
                        <Link to="/register">
                            <a className="flex items-center gap-2 text-xs lg:text-sm lg:font-bold">
                                <FaUserPlus /> Sign up
                            </a>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
