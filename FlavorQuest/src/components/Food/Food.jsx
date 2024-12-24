import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Food = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [food, setFood] = useState(null);

    useEffect(() => {
        
        axios
            .get(`http://localhost:5000/foods/${id}`)
            .then((response) => setFood(response.data))
            .catch((error) => console.error("Error fetching food details:", error));
    }, [id]);

    const handlePurchase = () => {
        
        navigate(`/purchase/${id}`);
    };

    if (!food) {
        return <p>Loading...</p>;
    }

    return (
        <div className="px-5 py-5 max-w-4xl mx-auto">
            <div className="bg-white p-5 rounded-lg shadow-md">
                <img
                    src={food.foodImage}
                    alt={food.foodName}
                    className="w-full h-72 object-cover rounded-md mb-3"
                />
                <h2 className="text-3xl font-bold mb-2">{food.foodName}</h2>
                <p className="text-gray-600 mb-2">Category: {food.foodCategory}</p>
                <p className="text-gray-600 mb-2">Price: ${food.price}</p>
                <p className="text-gray-600 mb-2">Quantity: {food.quantity}</p>
                <p className="text-gray-600 mb-4">Purchase Count: {food.purchaseCount || 0}</p>

                {food.quantity === 0 ? (
                    <p className="text-red-500 mb-4">Out of Stock</p>
                ) : (
                    <p className="text-green-500 mb-4">In Stock</p>
                )}

                
                <button
                    onClick={handlePurchase}
                    className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-all duration-300"
                >
                    Purchase
                </button>
            </div>
        </div>
    );
};

export default Food;