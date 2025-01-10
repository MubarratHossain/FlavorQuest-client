import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TakeawayPage = () => {
  const [foods, setFoods] = useState([]);
  const [pickupTime, setPickupTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedFood, setSelectedFood] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Fetching food data
  useEffect(() => {
    axios
      .get("https://flavor-server-side.vercel.app/foods")
      .then((response) => setFoods(response.data))
      .catch((error) => console.error("Error fetching foods:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pickupTime || !paymentMethod || selectedFood.length === 0) {
      alert("Please fill in all fields!");
      return;
    }
    // Simulate form submission (In real application, you could send data to the backend)
    setIsFormSubmitted(true);
  };

  const selectedFoodDetails = foods.filter((food) =>
    selectedFood.includes(food._id)
  );

  return (
    <div className="min-h-screen mt-2 rounded-xl bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 p-6">
      <h1 className="text-4xl font-semibold text-center text-black mb-8">Pick Up Your Food</h1>
      <p className="text-lg text-black text-center mb-4">
        Choose your favorite dishes for takeaway and enjoy a quick, delicious meal on the go.
      </p>

      {/* Takeaway Form */}
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-[800px] mx-auto mt-8 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 ">
        <h2 className="text-2xl font-semibold text-center  text-black mb-6">Your Order</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg text-black mb-2">Pick Up Time</label>
            <input
              type="datetime-local"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg text-black mb-2">Select Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-3 border rounded-md"
              required
            >
              <option value="">Select Payment Method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">Cash</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-lg text-black mb-2">Select Your Dishes</label>
            <div className="flex flex-wrap gap-4">
              {foods.map((food) => (
                <div key={food._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={food._id}
                    value={food._id}
                    onChange={(e) => {
                      const newSelectedFood = e.target.checked
                        ? [...selectedFood, food._id]
                        : selectedFood.filter((id) => id !== food._id);
                      setSelectedFood(newSelectedFood);
                    }}
                  />
                  <label htmlFor={food._id} className="ml-2 text-lg text-black">{food.foodName}</label>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-all duration-300"
          >
            Submit Order
          </button>
        </form>

        {isFormSubmitted && (
          <div className="mt-4 text-center text-green-500">
            <p>Your order has been successfully submitted!</p>
          </div>
        )}
      </div>

      {/* Cart Section */}
      {selectedFood.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700  p-6 rounded-lg shadow-xl max-w-[800px] mx-auto mt-8 ">
          <h2 className="text-2xl  font-semibold text-center text-black mb-6">Your Cart</h2>
          <ul className="space-y-4 text-green-600">
            {selectedFoodDetails.map((food) => (
              <li key={food._id} className="flex justify-between items-center border-b pb-2">
                <span className="text-lg font-semibold">{food.foodName}</span>
                <span className="text-lg text-green-800">${food.price}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right">
            <button className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition-all duration-300">
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* Food Cards Section for Takeaway */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-6 mt-8">
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700  p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="w-full h-40 md:h-52 lg:h-48  rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-black mb-2">{food.foodName}</h3>
            <p className="text-gray-700">Category: {food.foodCategory}</p>
            <p className="text-gray-700">Price: ${food.price}</p>
            <p className="text-gray-700">Quantity: {food.quantity}</p>
            {food.quantity === 0 ? (
              <p className="text-red-500">Out of Stock</p>
            ) : (
              <p className="text-green-600 font-bold">In Stock</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TakeawayPage;
