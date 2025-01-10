import React from 'react';
import AllFoods from '../AllFoods/AllFoods';
 // Import the AllFoods component

const OrderPage = () => {
  return (
    <div className="min-h-screen mt-3 rounded-xl p-6 bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400">
      <h1 className="text-4xl font-semibold text-center text-black mb-8">Order Your Favorite Food</h1>
      <p className="text-xl text-black font-bold text-center mb-4">
        Explore our menu and place an order for home delivery.
      </p>
      
      {/* Displaying the foods from AllFoods component */}
      <AllFoods></AllFoods>
    </div>
  );
};

export default OrderPage;
