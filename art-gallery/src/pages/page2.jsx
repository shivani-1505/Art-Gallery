import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
    "https://i.pinimg.com/736x/de/67/e7/de67e76f9daa97097eea8be559d7dff7.jpg",
    "https://i.pinimg.com/736x/88/6c/2d/886c2dd9632df00ec675fdcf6d2fac92.jpg",
    "https://i.pinimg.com/736x/45/3e/23/453e23dc47f1d7e8d63eaa433256538d.jpg",
  ];

const ArtGalleryPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg w-full fixed top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-gray-800">Art Gallery</div>
            <div className="space-x-4">
              <a href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </a>
              <a href="/gallery" className="text-gray-600 hover:text-gray-900">
                Gallery
              </a>
              <a href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-grow w-full h-screen pt-0">
        {/* Left Text Section */}
        <div className="w-1/2 flex flex-col justify-center px-16 mt-[-20px]">
          {/* Fixed Button */}
          <span className="inline-block px-3 py-1 rounded-full bg-gray-300 text-center text-gray-700 text-sm mb-4 w-32">
            New Art Work
          </span>
          <h1 className="text-5xl font-bold mb-4 text-black">
            New Artworks
            <br />
            From Our Artist
          </h1>
          <p className="text-gray-500 max-w-md">
            Explore our diverse exhibitions, from stunning paintings to
            captivating illustrations, thought-provoking installations to
            beautiful sculptures.
          </p>
        </div>

        {/* Right Carousel Section */}
        <div className="w-1/2 flex justify-center items-center mt-20">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            className="w-3/4 h-[65vh] items-center"
          >
            {images.map((image, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center"
              >
                <div className="w-80 h-[90%] bg-gray-800 rounded-xl overflow-hidden shadow-s flex justify-center items-center mx-auto">
                  <img
                    src={image}
                    alt={`Artwork ${index + 1}`} // Fixed template literal syntax
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ArtGalleryPage;
