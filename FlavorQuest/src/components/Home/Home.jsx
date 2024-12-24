import React from "react";
import Banner from "../Banner/Banner";
import { FaPlus, FaListAlt, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="flex flex-row mt-5 gap-4 px-5">

                <div className="w-1/5 bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 rounded-lg p-4 shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-center text-white">Options</h2>
                    <Link to='/addFoods'>
                    <button className="btn btn-outline bg-white hover:bg-yellow-300 text-gray-800 font-semibold w-full mb-3 flex items-center gap-2">
                        <FaPlus /> Add Foods
                    </button>
                    </Link>
                    <button className="btn btn-outline bg-white hover:bg-yellow-300 text-gray-800 font-semibold w-full mb-3 flex items-center gap-2">
                        <FaListAlt /> My Foods
                    </button>
                    <button className="btn btn-outline bg-white hover:bg-yellow-300 text-gray-800 font-semibold w-full flex items-center gap-2">
                        <FaShoppingCart /> My Orders
                    </button>
                </div>


                <div className="w-4/5 bg-green-50 rounded-lg p-4 shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">Trending Foods</h2>

                </div>
            </div>
        </div>
    );
};

export default Home;
