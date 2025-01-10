import React, { useState } from 'react';
import Swal from 'sweetalert2';

const DineInPage = () => {
    const today = new Date();
    const dayOfWeek = today.toLocaleString('default', { weekday: 'long' });
    const date = today.toISOString().split('T')[0]; // Format YYYY-MM-DD
    const [selectedDate, setSelectedDate] = useState(date);
    const [selectedTime, setSelectedTime] = useState('');
    const [familyCount, setFamilyCount] = useState('');
    const [eventType, setEventType] = useState('');
    const [budget, setBudget] = useState('');
    const [packageType, setPackageType] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    // Event types
    const eventOptions = ['Birthday', 'Office Party', 'Anniversary', 'Get Together'];

    // Available Packages
    const packages = ['Standard', 'Premium', 'Luxury'];

    // Disable Sunday and previous dates
    const disableDates = (date) => {
        const dateObj = new Date(date);
        const day = dateObj.getDay(); // Sunday is 0
        return day === 0 || dateObj < new Date();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedDate || !selectedTime || !familyCount || !eventType || !budget || !packageType || !customerName || !paymentMethod) {
            alert('Please fill in all fields!');
            return;
        }

        // Show success alert using SweetAlert2
        Swal.fire({
            title: 'Booking Successful!',
            text: 'Your reservation has been submitted.',
            icon: 'success',
            confirmButtonText: 'Okay',
            background: '#f0f8ff', // Optional: You can customize the background
            iconColor: '#4caf50', // Optional: Customize the icon color
            confirmButtonColor: '#4caf50', // Optional: Customize the button color
        });
    };

    return (
        <div className="min-h-screen mt-4 rounded-xl bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 p-6">
            <h1 className="text-4xl font-semibold text-center text-black mb-8">Dine In with Us</h1>
            <p className="text-lg text-black text-center mb-4">
                Enjoy your meal in a cozy atmosphere at our restaurant.
            </p>

            {/* Show today's date, day, and time */}
            <div className="text-center mb-6">
                <h3 className="text-2xl text-black mb-2">Today's Date and Time</h3>
                <p className="text-lg text-black">{`${dayOfWeek}, ${date} ${new Date().toLocaleTimeString()}`}</p>
            </div>

            {/* Dine-in Form */}
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-[800px] mx-auto mt-8 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 ">
                <h2 className="text-2xl font-semibold text-center text-black mb-6">Reserve Your Table</h2>

                <form onSubmit={handleSubmit}>
                    {/* Customer Name */}
                    <div className="mb-4">
                        <label className="block text-lg text-black mb-2">Your Name</label>
                        <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full p-3 border rounded-md"
                            required
                        />
                    </div>

                    {/* Pick Up Date */}
                    <div className="mb-4">
                        <label className="block text-lg text-black mb-2">Select Date</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={date} // This ensures the user cannot pick a past date
                            max="2025-12-31"
                            className="w-full p-3 border rounded-md"
                            required
                        />
                    </div>

                    {/* Pick Up Time */}
                    <div className="mb-4">
                        <label className="block text-lg text-black mb-2">Select Time</label>
                        <input
                            type="time"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="w-full p-3 border rounded-md"
                            required
                        />
                    </div>

                    {/* Family Members Count */}
                    <div className="mb-4">
                        <label className="block text-lg text-black mb-2">Family Members Count</label>
                        <input
                            type="number"
                            value={familyCount}
                            onChange={(e) => setFamilyCount(e.target.value)}
                            min="1"
                            className="w-full p-3 border rounded-md"
                            required
                        />
                    </div>

                    {/* Event Type */}
                    <div className="mb-4">
                        <label className="block text-lg text-black mb-2">For Which Event</label>
                        <select
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value)}
                            className="w-full p-3 border rounded-md"
                            required
                        >
                            <option value="">Select Event</option>
                            {eventOptions.map((event) => (
                                <option key={event} value={event}>
                                    {event}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Budget */}
                    <div className="mb-4">
                        <label className="block text-lg text-black mb-2">Your Budget for Dine-In</label>
                        <input
                            type="number"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            min="0"
                            className="w-full p-3 border rounded-md"
                            required
                        />
                    </div>

                    {/* Package Selection */}
                    <div className="mb-4">
                        <label className="block text-lg text-black mb-2">Choose Your Package</label>
                        <select
                            value={packageType}
                            onChange={(e) => setPackageType(e.target.value)}
                            className="w-full p-3 border rounded-md"
                            required
                        >
                            <option value="">Select Package</option>
                            {packages.map((pkg) => (
                                <option key={pkg} value={pkg}>
                                    {pkg}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Payment Method */}
                    <div className="mb-4">
                        <label className="block text-lg text-black mb-2">Payment Method</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full p-3 border rounded-md"
                            required
                        >
                            <option value="">Select Payment Method</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Cash">Cash</option>
                            <option value="Online Payment">Online Payment</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-all duration-300"
                    >
                        Submit Reservation
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DineInPage;
