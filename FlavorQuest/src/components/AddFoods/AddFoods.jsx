import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../Authprovider/Authprovider';

const AddFoods = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        foodName: '',
        foodImage: '',
        foodCategory: '',
        quantity: '',
        price: '',
        foodOrigin: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const foodData = {
            ...formData,
            addedBy: {
                name: user?.displayName || 'Anonymous',
                email: user?.email || 'No email',
            },
        };

        try {
            const response = await axios.post('http://localhost:5000/foods', foodData);
            if (response.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Food item added successfully!',
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
                setFormData({
                    foodName: '',
                    foodImage: '',
                    foodCategory: '',
                    quantity: '',
                    price: '',
                    foodOrigin: '',
                    description: '',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add the food item. Please try again.',
                icon: 'error',
                confirmButtonText: 'Retry',
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add a Food Item</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Food Name</label>
                    <input
                        type="text"
                        name="foodName"
                        value={formData.foodName}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter food name"
                    />
                </div>
                <div>
                    <label className="block font-medium">Food Image URL</label>
                    <input
                        type="url"
                        name="foodImage"
                        value={formData.foodImage}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter image URL"
                    />
                </div>
                <div>
                    <label className="block font-medium">Food Category</label>
                    <input
                        type="text"
                        name="foodCategory"
                        value={formData.foodCategory}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="e.g., Appetizer, Dessert"
                    />
                </div>
                <div>
                    <label className="block font-medium">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter quantity"
                    />
                </div>
                <div>
                    <label className="block font-medium">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter price"
                    />
                </div>
                <div>
                    <label className="block font-medium">Food Origin (Country)</label>
                    <input
                        type="text"
                        name="foodOrigin"
                        value={formData.foodOrigin}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter origin country"
                    />
                </div>
                <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                        rows="4"
                        placeholder="Enter a short description (ingredients, making procedure, etc.)"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
                >
                    Add Item
                </button>
            </form>
        </div>
    );
};

export default AddFoods;
