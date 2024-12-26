import React from 'react';
import ModalImage from 'react-modal-image';

const Gallery = () => {
    const images = [
        "https://i.ibb.co/D9bnBMg/thank.webp",
        "https://i.ibb.co.com/HKrQ6rs/food.jpg",
        "https://i.ibb.co.com/6DdP0g6/img-5262-look-cinema.jpg",
        "https://i.ibb.co.com/PF52m0M/IMG-5891-900x900.jpg",
        "https://i.ibb.co.com/m6FT7s0/1663285202372.jpg",
        "https://i.ibb.co.com/RcQ5WXB/ff33e1f8a63500d3f97f028c1ee2aaf1.jpg",
        "https://i.ibb.co.com/xF5Z33p/close-up-smiley-girl-with-dessert.jpg",
        "https://i.ibb.co.com/KVQqVyD/TFPNAWUX4-RBKJNAO33-JH2-UDDO4.jpg",
        "https://i.ibb.co.com/Xzs7LQf/burger.jpg",
        "https://i.ibb.co.com/fXpLGQ1/511-file.jpg",
    ];

    return (
        <div>
            
            <div
                className="w-full bg-gray-900 text-white text-center my-4 rounded-lg"
                style={{
                    backgroundImage: "url('https://i.ibb.co.com/Vt53NMM/360-F-809205461-VZAQt-GSe-SLxq-FFYz-A0j-M6gk9-Xdr1u-KON.jpg')", 
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "300px", 
                }}
            >
                <h1 className="text-4xl font-bold bg-black bg-opacity-50 inline-block px-4 py-2 rounded mt-16">
                    Gallery
                </h1>
            </div>


            
            <div className="gallery-container grid grid-cols-3 gap-4 p-4">
                {images.map((image, index) => (
                    <div key={index} className="gallery-item">
                        <ModalImage
                            small={image}
                            large={image}
                            alt={`Gallery Image ${index + 1}`}
                            className="w-full h-auto cursor-pointer hover:opacity-75 transition"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
