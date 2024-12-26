import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import Swal from "sweetalert2"; 
import { AuthContext } from "../Authprovider/Authprovider";

const MyOrders = () => {
  const { user } = useContext(AuthContext); 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        
        const purchasesResponse = await fetch("https://flavor-server-side.vercel.app/purchases", {
            
            credentials: "include", 
        });
        
        const purchasesData = await purchasesResponse.json();

        
        const foodsResponse = await fetch("https://flavor-server-side.vercel.app/foods");
        const foodsData = await foodsResponse.json();

        
        const userOrders = purchasesData
          .filter((order) => order.buyerEmail === user.email)
          .map((order) => {
            const matchingFood = foodsData.find(
              (food) => food.foodName === order.foodName
            );
            return {
              ...order,
              foodImage: matchingFood ? matchingFood.foodImage : null, 
            };
          });

        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.email]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await fetch(`https://flavor-server-side.vercel.app/purchases/${id}`, { method: "DELETE" });
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
      Swal.fire("Deleted!", "Your order has been deleted.", "success");
    } catch (error) {
      console.error("Error deleting order:", error);
      Swal.fire("Error!", "Failed to delete the order.", "error");
    }
  };

  if (loading) {
    return <p className="text-black">Loading orders...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-green-500">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-green-500">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  rounded-lg">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded shadow-md flex flex-col items-center"
            >
              <img
                src={order.foodImage || "https://via.placeholder.com/150?text=No+Image"}
                alt={order.foodName}
                className="w-32 h-32 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-lg font-semibold text-green-800">{order.foodName}</h3>
              <p className="text-green-600">Price: ${order.price}</p>
              <p className="text-green-600">Quantity: {order.quantity}</p>
              <p className="text-green-600">Owner: {order.buyerName}</p>
              <p className="text-green-600">
                Date: {moment(order.buyingDate).format("MMMM Do YYYY, h:mm:ss a")}
              </p>
              <button
                onClick={() => handleDelete(order._id)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
