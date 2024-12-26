import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Authprovider/Authprovider";

const AllFoods = () => {
    const { user } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        
        axios
            .get("https://flavor-server-side.vercel.app/foods")
            .then((response) => setFoods(response.data))
            .catch((error) => console.error("Error fetching foods:", error));
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredFoods = foods.filter((food) =>
        food.foodName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div>
                <div
                    className="bg-cover bg-center text-white text-center py-10 mt-2 rounded-lg max-w-[95%] mx-auto"
                    style={{ backgroundImage: "url('https://i.ibb.co.com/Vt53NMM/360-F-809205461-VZAQt-GSe-SLxq-FFYz-A0j-M6gk9-Xdr1u-KON.jpg')" }}
                >
                    <h1 className="text-4xl font-bold">All Foods</h1>
                </div>
            </div>

            <div className="px-5 py-5">
                <input
                    type="text"
                    placeholder="Search foods by name"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="p-4 text-lg border-2 border-gray-300 placeholder-gray-500 rounded-lg mb-5 w-full shadow-xl focus:outline-none focus:ring-4 focus:ring-green-500 max-w-[80%] mx-auto"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                    {filteredFoods.map((food) => (
                        <div
                            key={food._id}
                            className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700"
                        >
                            <img
                                src={food.foodImage}
                                alt={food.foodName}
                                className="w-full h-48 object-cover rounded-md mb-3"
                            />
                            <h2 className="text-xl font-semibold">{food.foodName}</h2>
                            <p className="text-gray-600">Category: {food.foodCategory}</p>
                            <p className="text-gray-600">Price: ${food.price}</p>
                            <p className="text-gray-600">Quantity: {food.quantity}</p>

                            {food.quantity === 0 ? (
                                <p className="text-red-500">Out of Stock</p>
                            ) : (
                                <p className="text-green-500">In Stock</p>
                            )}

                            
                            <Link
                                to={`/food/${food._id}`}
                                className="block text-center mt-3 text-blue-500 bg-blue-100 hover:bg-blue-300 py-2 px-4 rounded-lg transition-all duration-300"
                            >
                                Details
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllFoods;
