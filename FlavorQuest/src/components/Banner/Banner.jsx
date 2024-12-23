import React from 'react';
import { useLocation } from 'react-router-dom';  
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';  
import { Navigation, Pagination } from 'swiper/modules';
import { FaUtensils, FaList, FaCartPlus } from 'react-icons/fa';  

import BannerImage1 from './food.jpg'; 
import BannerImage2 from './thank.jpg';
import BannerImage3 from './food1.jpg'; 

const Banner = () => {
  const location = useLocation();  
  
  if (location.pathname !== '/') {
    return null;  
  }

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      className="w-[90%] mx-auto my-8"
    >
      
      <SwiperSlide>
        <div
          className="hero h-[60vh] md:h-[55vh] lg:h-[60vh] xl:h-[70vh] 2xl:h-[75vh] rounded-lg overflow-hidden p-4"
          style={{
            backgroundImage: `url(${BannerImage1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          <div className="hero-overlay bg-opacity-50"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md px-4">
              <h1 className="mb-5 text-4xl text-white font-bold">Delicious Food, Delivered Fast</h1>
              <p className="mb-5 text-lg text-white font-semibold">
                Explore our extensive menu with a variety of cuisines, from quick snacks to hearty meals.
              </p>
              <button className="btn bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 text-black shadow-lg transform hover:scale-105 transition">
                <FaUtensils className="inline mr-2" /> All Foods
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>

      
      <SwiperSlide>
        <div
          className="hero h-[60vh] md:h-[55vh] lg:h-[60vh] xl:h-[70vh] 2xl:h-[75vh] rounded-lg overflow-hidden p-4"
          style={{
            backgroundImage: `url(${BannerImage2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          <div className="hero-overlay bg-opacity-50"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md px-4">
              <h1 className="mb-5 text-4xl text-white font-bold">Savor Every Bite</h1>
              <p className="mb-5 text-lg text-white font-semibold">
                From appetizers to desserts, we've got every craving covered. Taste the flavors of the world!
              </p>
              <button className="btn bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 text-black shadow-lg transform hover:scale-105 transition">
                <FaList className="inline mr-2" /> Browse Menus
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>

      
      <SwiperSlide>
        <div
          className="hero h-[60vh] md:h-[55vh] lg:h-[60vh] xl:h-[70vh] 2xl:h-[75vh] rounded-lg overflow-hidden p-4"
          style={{
            backgroundImage: `url(${BannerImage3})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          <div className="hero-overlay bg-opacity-50"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md px-4">
              <h1 className="mb-5 text-4xl text-white font-bold">Gourmet Dining at Home</h1>
              <p className="mb-5 text-lg text-white font-semibold">
                Enjoy a restaurant-quality meal in the comfort of your own home. Order now and indulge!
              </p>
              <button className="btn bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 text-black shadow-lg transform hover:scale-105 transition">
                <FaCartPlus className="inline mr-2" /> Start Ordering
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
