import React, { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import { FaPlus, FaListAlt, FaShoppingCart, FaTag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const [foods, setFoods] = useState([]);
    const [trendingFoods, setTrendingFoods] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await fetch("http://localhost:5000/foods");
                const data = await response.json();
                setFoods(data);
            } catch (error) {
                console.error("Error fetching foods:", error);
            }
        };

        fetchFoods();
    }, []);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await fetch("http://localhost:5000/purchases");
                const data = await response.json();

                const groupedFoods = data.reduce((acc, item) => {
                    if (acc[item.foodName]) {
                        acc[item.foodName].quantity += item.quantity;
                    } else {
                        acc[item.foodName] = {
                            quantity: item.quantity,
                            price: item.price,
                            foodId: item.foodId,
                        };
                    }
                    return acc;
                }, {});

                const trending = Object.entries(groupedFoods)
                    .map(([foodName, { quantity, price, foodId }]) => {
                        const foodDetails = foods.find((food) => food.foodName === foodName);
                        return foodDetails ? {
                            foodName,
                            quantity,
                            price,
                            id: foodId,
                            foodImage: foodDetails.foodImage,
                        } : null;
                    })
                    .filter((food) => food)
                    .sort((a, b) => b.quantity - a.quantity)
                    .slice(0, 6);

                setTrendingFoods(trending);
            } catch (error) {
                console.error("Error fetching purchases:", error);
            }
        };

        if (foods.length > 0) {
            fetchPurchases();
        }
    }, [foods]);

    return (
        <div>
            <Banner />
            <div className="flex flex-col lg:flex-row mt-5 gap-6 px-6">
                <div className="lg:w-1/4 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700  rounded-lg p-6 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6 text-center text-black">Options</h2>
                    <Link to='/addFoods'>
                        <button className="btn btn-outline bg-white hover:bg-yellow-300 text-gray-800 font-semibold w-full mb-4 flex items-center justify-center gap-2 py-3 rounded-lg">
                            <FaPlus /> Add Foods
                        </button>
                    </Link>
                    <button className="btn btn-outline bg-white hover:bg-yellow-300 text-gray-800 font-semibold w-full mb-4 flex items-center justify-center gap-2 py-3 rounded-lg">
                        <FaListAlt /> My Foods
                    </button>
                    <button className="btn btn-outline bg-white hover:bg-yellow-300 text-gray-800 font-semibold w-full flex items-center justify-center gap-2 py-3 rounded-lg">
                        <FaShoppingCart /> My Orders
                    </button>
                </div>

                <div className="lg:w-3/4 bg-slate-800 border border-gray-300 rounded-lg p-6 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6 text-center text-white">Trending Foods</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trendingFoods.length > 0 ? (
                            trendingFoods.map((food, index) => (
                                <li
                                    key={index}
                                    className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 border border-gray-200 shadow-md rounded-lg p-4 flex flex-col justify-between hover:scale-105 transform transition-all duration-300"
                                >
                                    <img
                                        src={food.foodImage}
                                        alt={food.foodName}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                    <span className="text-lg font-semibold text-black mb-2">{food.foodName}</span>
                                    <span className="text-gray-800 mb-2">Quantity Sold: {food.quantity}</span>
                                    <span className="text-gray-800 mb-4 flex items-center gap-1">
                                        <FaTag /> Price: ${food.price.toFixed(2)}
                                    </span>
                                    <button
                                        onClick={() => {
                                            const matchedFood = foods.find(f => f.foodName === food.foodName); 
                                            if (matchedFood) {
                                                navigate(`/food/${matchedFood._id}`); 
                                            } else {
                                                console.error("Food not found");
                                            }
                                        }}
                                        className="btn bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg w-full"
                                    >
                                        Details
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 col-span-full">
                                No trending foods available.
                            </p>
                        )}
                    </ul>
                    <div className="mt-6 flex justify-center">
                        <Link to="/allFoods">
                            <button className="btn bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 text-black py-2 px-6 rounded-lg shadow-md">
                                See All
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
