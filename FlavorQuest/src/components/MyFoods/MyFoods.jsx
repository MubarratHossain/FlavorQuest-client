import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Authprovider/Authprovider';
import { useNavigate } from 'react-router-dom';


const MyFoods = () => {
    const { user } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchMyFoods = async () => {
            try {
                const response = await axios.get('http://localhost:5000/foods?email',{withCredentials:true});
                const userFoods = response.data.filter(food => food.addedBy.email === user?.email);
                setFoods(userFoods);
            } catch (error) {
                console.error('Error fetching food items:', error);
            }
        };
        if (user) {
            fetchMyFoods();
        }
    }, [user]);

    
    const handleUpdate = (foodId) => {
        navigate(`/updateFood/${foodId}`);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Food Items</h1>
            {foods.length === 0 ? (
                <p>No food items found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {foods.map((food) => (
                        <div key={food._id} className="bg-white p-4 rounded-lg shadow-md bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700">
                            <img
                                src={food.foodImage}
                                alt={food.foodName}
                                className="w-full h-48 object-cover rounded-md mb-3"
                            />
                            <h3 className="text-xl font-semibold mb-2">{food.foodName}</h3>
                            <p className="text-gray-600 mb-2">Category: {food.foodCategory}</p>
                            <p className="text-gray-600 mb-2">Price: ${food.price}</p>
                            <p className="text-gray-600 mb-2">Quantity: {food.quantity}</p>

                            <button
                                onClick={() => handleUpdate(food._id)}
                                className="bg-green-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300"
                            >
                                Update
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyFoods;
