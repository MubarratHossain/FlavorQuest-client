import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Authprovider/Authprovider";

const Purchase = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const [food, setFood] = useState(null);
    const [quantityToBuy, setQuantityToBuy] = useState(1);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        
        axios
            .get(`http://localhost:5000/foods/${id}`)
            .then((response) => setFood(response.data))
            .catch((error) => console.error("Error fetching food details:", error));
    }, [id]);

    const handlePurchase = async (e) => {
        e.preventDefault();
        if (food && user) {
            const purchaseData = {
                foodName: food.foodName,
                price: food.price,
                quantity: quantityToBuy,
                buyerName: user.displayName,
                buyerEmail: user.email,
                buyingDate: Date.now(),
            };

            try {
                await axios.post("http://localhost:5000/purchases", purchaseData, {
                    withCredentials: true,
                });

                
                Swal.fire({
                    icon: 'success',
                    title: 'Purchase Successful',
                    text: 'Your order has been placed successfully!',
                }).then(() => {
                    navigate('/allFoods'); 
                });

            } catch (error) {
                console.error("Error making the purchase:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Purchase Failed',
                    text: 'There was an error while making the purchase.',
                });
            }
        }
    };

    const isPurchaseDisabled = food?.quantity === 0 || user?.uid === food?.addedBy?.uid || quantityToBuy > food?.quantity;

    if (!food || !user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="px-5 py-5 max-w-4xl mx-auto">
            <div className="bg-white p-5 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-4">Purchase Food</h2>

                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Food Name</label>
                        <input
                            type="text"
                            value={food.foodName}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Price</label>
                        <input
                            type="text"
                            value={`$${food.price}`}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Quantity Available</label>
                        <input
                            type="text"
                            value={food.quantity}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Quantity to Buy</label>
                        <select
                            value={quantityToBuy}
                            onChange={(e) => setQuantityToBuy(Number(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            disabled={food.quantity === 0 || user?.uid === food?.addedBy?.uid}
                        >
                            {[...Array(food.quantity)].map((_, index) => (
                                <option key={index} value={index + 1}>
                                    {index + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Buyer Name</label>
                        <input
                            type="text"
                            value={user.displayName}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Buyer Email</label>
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Buying Date</label>
                        <input
                            type="text"
                            value={new Date().toLocaleString()}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <button
                            className={`mt-3 py-2 px-4 rounded text-white ${food.quantity === 0 ||
                                (user && user.email === food.addedBy?.email) ||
                                quantityToBuy > food.quantity
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600 transition-all duration-300"
                                }`}
                            disabled={isPurchaseDisabled}
                            onClick={(e) => handlePurchase(e)}
                        >
                            Purchase
                        </button>
                    </div>

                    {isPurchaseDisabled && food?.quantity === 0 && (
                        <p className="text-red-500">Sorry, this item is out of stock.</p>
                    )}

                    {isPurchaseDisabled && user?.uid === food?.addedBy?.uid && (
                        <p className="text-red-500">You cannot purchase your own added food items.</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Purchase;
