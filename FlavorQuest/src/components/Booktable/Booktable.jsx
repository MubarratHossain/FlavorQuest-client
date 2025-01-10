import React, { useState } from 'react';
import Swal from 'sweetalert2'; 

const chefsData = [
    {
        name: "The Sushi Master",
        title: "Sushi Specialist",
        image: "https://i.ibb.co.com/m6FT7s0/1663285202372.jpg"
    },
    {
        name: "The Meat King",
        title: "Grill Master",
        image: "https://i.ibb.co.com/D9bnBMg/thank.webp"
    },
    {
        name: "The Pastry Master",
        title: "Dessert Expert",
        image: "https://i.ibb.co.com/nDqqtDP/DSC5526-1-scaled.jpg"
    },
    {
        name: "The Pasta Maestro",
        title: "Pasta Perfectionist",
        image: "https://i.ibb.co.com/PF52m0M/IMG-5891-900x900.jpg"
    },
    {
        name: "The Spice Wizard",
        title: "Spice Master",
        image: "https://i.ibb.co.com/yPPfHB5/ratio3x2-1920.jpg"
    },
    {
        name: "The Vegetarian Virtuoso",
        title: "Vegetarian Chef",
        image: "https://i.ibb.co.com/1Qr2YKW/Famous-Asian-Chefs.webp"
    }
];

const BookTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedChef, setSelectedChef] = useState(null);

    const openModal = (chef) => {
        setSelectedChef(chef);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedChef(null);
    };

    const handleBooking = () => {
        // SweetAlert for booking confirmation
        Swal.fire({
            title: 'Booking Confirmed!',
            text: `Your booking with ${selectedChef.name}, ${selectedChef.title}, has been confirmed.`,
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            closeModal(); // Close modal after confirmation
        });
    };

    const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in the format YYYY-MM-DD

    return (
        <div className=" mt-4  rounded-xl p-6">
            <h1 className="text-4xl  font-semibold text-center text-green-600 mb-8">Book a Table with Our Expert Chefs</h1>
            <p className="text-lg text-green-500 text-center mb-4">
                Enjoy a unique dining experience with our world-class chefs. Each chef offers personalized cooking sessions for food lovers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {chefsData.map((chef, index) => (
                    <div key={index} className="bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400  p-6 rounded-lg shadow-xl">
                        <img src={chef.image} alt={chef.name} className="w-full h-64 lg:h-96 xl:h-96 2xl-h-[400px] object-cover rounded-md mb-4" />
                        <h2 className="text-xl font-semibold text-black mb-2">{chef.name}</h2>
                        <p className="text-lg text-black italic mb-4">{chef.title}</p>
                        <button
                            onClick={() => openModal(chef)}
                            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                        >
                            Book a Table
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal for Booking Confirmation */}
            {isModalOpen && selectedChef && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-2xl font-semibold text-center mb-4">Booking Confirmation</h2>
                        <p className="mb-4">You're about to book a table with {selectedChef.name}, {selectedChef.title}.</p>
                        
                        <form>
                            <div className="mb-4">
                                <label className="block text-lg mb-2" htmlFor="bookingDate">Booking Date</label>
                                <input
                                    type="date"
                                    id="bookingDate"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                    min={currentDate}  // Prevent selecting previous dates
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg mb-2" htmlFor="time">Time</label>
                                <input
                                    type="time"
                                    id="time"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg mb-2" htmlFor="membersCount">Number of Members</label>
                                <input
                                    type="number"
                                    id="membersCount"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                    min="1"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg mb-2" htmlFor="paymentMethod">Payment Method</label>
                                <select
                                    id="paymentMethod"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="creditCard">Credit Card</option>
                                    <option value="debitCard">Debit Card</option>
                                    <option value="paypal">PayPal</option>
                                </select>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleBooking}
                                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookTable;
