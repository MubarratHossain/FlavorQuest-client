import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const UpdateFood = () => {
    const { id } = useParams(); 
    const [formData, setFormData] = useState({
        foodName: '',
        foodImage: '',
        foodCategory: '',
        quantity: '',
        price: '',
        foodOrigin: '',
        description: '',
    });

    // Fetch food details
    useEffect(() => {
        const fetchFood = async () => {
            try {
                const response = await axios.get(`https://flavor-server-side.vercel.app/foods/${id}`, {
                    withCredentials: true, // Include credentials (cookies or authentication tokens)
                });
                setFormData(response.data);
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to fetch food data. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Retry',
                });
            }
        };

        fetchFood();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://flavor-server-side.vercel.app/foods/${id}`, formData, {
                withCredentials: true, // Include credentials for PUT request
            });
            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Food item updated successfully!',
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update the food item. Please try again.',
                icon: 'error',
                confirmButtonText: 'Retry',
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Update Food Item</h1>
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
                    />
                </div>
                <div>
                    <label className="block font-medium">Food Origin</label>
                    <input
                        type="text"
                        name="foodOrigin"
                        value={formData.foodOrigin}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
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
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
                >
                    Update Item
                </button>
            </form>
        </div>
    );
};

export default UpdateFood;
