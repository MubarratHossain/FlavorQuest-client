import React, { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import { FaPlus, FaListAlt, FaShoppingCart, FaTag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import img from './Orange and Yellow Simple Street Food Logo.gif'

const Home = () => {
    const [foods, setFoods] = useState([]);
    const [trendingFoods, setTrendingFoods] = useState([]);
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const images = [
        'https://i.ibb.co.com/yPPfHB5/ratio3x2-1920.jpg',
        'https://i.ibb.co.com/PF52m0M/IMG-5891-900x900.jpg',
        'https://i.ibb.co.com/nDqqtDP/DSC5526-1-scaled.jpg',
        'https://i.ibb.co.com/m6FT7s0/1663285202372.jpg'
    ];

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await fetch("https://flavor-server-side.vercel.app/foods");
                const data = await response.json();
                setFoods(data);
            } catch (error) {
                console.error("Error fetching foods:", error);
            }
        };

        fetchFoods();
    }, []);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await fetch("https://flavor-server-side.vercel.app/purchases");
                const data = await response.json();

                const groupedFoods = data.reduce((acc, item) => {
                    if (acc[item.foodName]) {
                        acc[item.foodName].quantity += item.quantity;
                    } else {
                        acc[item.foodName] = {
                            quantity: item.quantity,
                            price: item.price,
                            foodId: item.foodId,
                        };
                    }
                    return acc;
                }, {});

                const trending = Object.entries(groupedFoods)
                    .map(([foodName, { quantity, price, foodId }]) => {
                        const foodDetails = foods.find((food) => food.foodName === foodName);
                        return foodDetails ? {
                            foodName,
                            quantity,
                            price,
                            id: foodId,
                            foodImage: foodDetails.foodImage,
                        } : null;
                    })
                    .filter((food) => food)
                    .sort((a, b) => b.quantity - a.quantity)
                    .slice(0, 6);

                setTrendingFoods(trending);
            } catch (error) {
                console.error("Error fetching purchases:", error);
            }
        };

        if (foods.length > 0) {
            fetchPurchases();
        }
    }, [foods]);

    return (
        <div>
            <Banner />
            <div className="flex flex-col lg:flex-row mt-5 gap-6 px-6">
                <div className="lg:w-1/4 lg:h-[400px] bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700  rounded-lg p-6 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6 text-center text-black">Options</h2>
                    <Link to='/addFoods'>
                        <button className="btn btn-outline bg-white hover:bg-yellow-300 hover:text-green-600  font-semibold w-full mb-4 flex items-center justify-center gap-2 py-3 rounded-lg">
                            <FaPlus /> Add Foods
                        </button>
                    </Link>
                    <Link to='/myFoods'>
                        <button className="btn btn-outline bg-white hover:bg-yellow-300 hover:text-green-600 font-semibold w-full mb-4 flex items-center justify-center gap-2 py-3 rounded-lg">
                            <FaListAlt /> My Foods
                        </button>
                    </Link>
                    <Link to='myOrders'>
                        <button className="btn btn-outline bg-white hover:bg-yellow-300 hover:text-green-600  font-semibold w-full flex items-center justify-center gap-2 py-3 rounded-lg">
                            <FaShoppingCart /> My Orders
                        </button>
                    </Link>
                    <div className="mt-4 flex justify-center">
                        <img
                            src={img}
                            alt="Food Logo"
                            className="h-auto w-full max-w-[200px] md:max-w-[300px] lg:max-w-[400px] object-contain"
                        />
                    </div>

                </div>


                <div className="lg:w-3/4 bg-slate-800 border border-gray-300 rounded-lg p-6 shadow-lg">
                    <h2 className="text-3xl font-semibold mb-6 text-center text-white">Trending Foods</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trendingFoods.length > 0 ? (
                            trendingFoods.map((food, index) => (
                                <li
                                    key={index}
                                    className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 border border-gray-200 shadow-md rounded-lg p-4 flex flex-col justify-between hover:scale-105 transform transition-all duration-300"
                                >
                                    <img
                                        src={food.foodImage}
                                        alt={food.foodName}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                    <span className="text-lg font-semibold text-black mb-2">{food.foodName}</span>
                                    <span className="text-gray-800 mb-2">Quantity Sold: {food.quantity}</span>
                                    <span className="text-gray-800 mb-4 flex items-center gap-1">
                                        <FaTag /> Price: ${food.price.toFixed(2)}
                                    </span>
                                    <button
                                        onClick={() => {
                                            const matchedFood = foods.find(f => f.foodName === food.foodName);
                                            if (matchedFood) {
                                                navigate(`/food/${matchedFood._id}`);
                                            } else {
                                                console.error("Food not found");
                                            }
                                        }}
                                        className="btn bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg w-full"
                                    >
                                        Details
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 col-span-full">
                                No trending foods available.
                            </p>
                        )}
                    </ul>
                    <div className="mt-6 flex justify-center">
                        <Link to="/allFoods">
                            <button className="btn bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 text-black py-2 px-6 rounded-lg shadow-md">
                                See All
                            </button>
                        </Link>
                    </div>
                </div>
            </div>


            <div className="bg-gradient-to-r from-green-300 via-green-500 to-green-700 p-8 mt-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-black text-center mb-6">Our Restaurant Services</h2>
                <div className="flex flex-col lg:flex-row justify-center gap-8">
                    <div className="bg-slate-800 p-6 rounded-lg shadow-lg text-center flex flex-col items-center">
                        <img
                            src="https://i.ibb.co.com/DfKczB9/360-F-604850839-Ajl-Jgv-Uy79-DVHik0-Bl-LNm-PYX6e-KLRi-WT.jpg?text=Order"
                            alt="Order"
                            className="w-32 h-32 object-cover mb-4 rounded-lg"
                        />
                        <h3 className="text-xl text-green-200 font-semibold mb-2">Order</h3>
                        <p className="mb-4 text-green-400">Order your favorite dishes for home delivery.</p>
                        <Link to="/order">
                            <button className="btn bg-yellow-500 text-black hover:bg-yellow-600 py-2 px-6 rounded-lg">
                                Order Now
                            </button>
                        </Link>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-lg shadow-lg text-center flex flex-col items-center">
                        <img
                            src="https://i.ibb.co.com/fXpLGQ1/511-file.jpg?text=Takeaway"
                            alt="Takeaway"
                            className="w-32 h-32 object-cover mb-4 rounded-lg"
                        />
                        <h3 className="text-xl font-semibold mb-2 text-green-200">Takeaway</h3>
                        <p className="mb-4 text-green-500">Pick up your favorite dishes from our restaurant.</p>
                        <Link to="/takeaway">
                            <button className="btn bg-yellow-500 text-black hover:bg-yellow-600 py-2 px-6 rounded-lg">
                                Takeaway
                            </button>
                        </Link>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-lg shadow-lg text-center flex flex-col items-center">
                        <img
                            src="https://i.ibb.co.com/6DdP0g6/img-5262-look-cinema.jpg?text=Dine+In"
                            alt="Dine In"
                            className="w-32 h-32 object-cover mb-4 rounded-lg"
                        />
                        <h3 className="text-xl font-semibold mb-2 text-green-200">Dine In</h3>
                        <p className="mb-4 text-green-500">Enjoy your meals at our restaurant with a cozy ambiance.</p>
                        <Link to="/dineIn">
                            <button className="btn bg-yellow-500 text-black hover:bg-yellow-600 py-2 px-6 rounded-lg">
                                Dine In
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <span className="loading loading-spinner text-error"></span>
                </div>
            ) : (
                <section className="py-6 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 shadow-lg rounded-lg max-w-[95%] mx-auto my-4">
                    <div className="container mx-auto flex items-center justify-between">
                        <div className="w-1/2 flex justify-center">
                            <div className="w-56 h-56 rounded-full overflow-hidden">
                                <img
                                    src={images[currentImageIndex]}
                                    alt="Chef"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="w-1/2 text-center sm:text-left">
                            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                                Meet our talented chefs and experience exquisite dining
                            </h2>
                            <p className="text-lg text-white mb-6">
                                Our expert chefs are dedicated to bringing you the finest culinary experience. From innovative dishes to traditional favorites, we're here to craft a meal you'll never forget.
                            </p>
                            <button className="bg-green-500 text-black font-bold py-2 px-6 rounded-md hover:bg-green-600 transition duration-300">
                                Book a Table
                            </button>
                        </div>
                    </div>
                </section>
            )}

            <section className="customer-reviews-section py-8 bg-white mb-4 rounded-lg max-w-[95%] mx-auto shadow-lg my-4">
                <div className="container mx-auto text-center bg-white rounded-lg">
                    <h2 className="text-3xl font-semibold mb-6 animate-rgbCycle text-gray-800">Customer Reviews</h2>
                    <div className="review-marquee">
                        <marquee behavior="scroll" direction="left" scrollamount="10">
                            <div className="mx-6 inline-block">
                                <a href="#" target="_blank">
                                    <img src="https://i.ibb.co/WHj4Xqp/15.webp" alt="Customer" className="rounded-full h-12 w-12 inline-block mr-4 border-2 border-gray-300" />
                                </a>
                                <p className="text-lg italic text-gray-700">"Amazing food, excellent service! Will definitely visit again!"</p>
                                <p className="text-sm text-gray-500 mt-2">- Mohammad Adil</p>
                            </div>
                            <div className="mx-6 inline-block">
                                <a href="#" target="_blank">
                                    <img src="https://i.ibb.co/TYMc8gd/w-Fu-Zo8h-O-BROZ-1024.webp" alt="Customer" className="rounded-full h-12 w-12 inline-block mr-4 border-2 border-gray-300" />
                                </a>
                                <p className="text-lg italic text-gray-700">"A wonderful dining experience, every dish was delicious!"</p>
                                <p className="text-sm text-gray-500 mt-2">- Ahmed Hasan</p>
                            </div>
                            <div className="mx-6 inline-block">
                                <a href="#" target="_blank">
                                    <img src="https://i.ibb.co/tJYLKwq/lead-1-rafsan-with-food-fb.jpg" alt="Customer" className="rounded-full h-12 w-12 inline-block mr-4 border-2 border-gray-300" />
                                </a>
                                <p className="text-lg italic text-gray-700">"The atmosphere and food quality were beyond my expectations!"</p>
                                <p className="text-sm text-gray-500 mt-2">- Rafsan Islam</p>
                            </div>
                            <div className="mx-6 inline-block">
                                <a href="#" target="_blank">
                                    <img src="https://i.ibb.co/R7cdG3y/1.webp" alt="Customer" className="rounded-full h-12 w-12 inline-block mr-4 border-2 border-gray-300" />
                                </a>
                                <p className="text-lg italic text-gray-700">"Great place for family dinners, highly recommended!"</p>
                                <p className="text-sm text-gray-500 mt-2">- Samiul Karim</p>
                            </div>
                            <div className="mx-6 inline-block">
                                <a href="#" target="_blank">
                                    <img src="https://i.ibb.co/WxL1mLf/14.webp" alt="Customer" className="rounded-full h-12 w-12 inline-block mr-4 border-2 border-gray-300" />
                                </a>
                                <p className="text-lg italic text-gray-700">"The best restaurant in town! Loved every bite!"</p>
                                <p className="text-sm text-gray-500 mt-2">- Shahinur Rahman</p>
                            </div>
                        </marquee>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Home;
