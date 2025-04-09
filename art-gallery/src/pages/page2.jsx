import React, { useState, useEffect } from "react";
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

const ArtGalleryPage = ({ onArtistsDirectoryClick }) => {
  // State to track screen width for responsive behavior
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const isMobile = windowWidth <= 768;

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg w-full fixed top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-gray-800">Art Gallery</div>
            {isMobile && (
              <button className="block md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content - Flex column on mobile, row on desktop */}
      <div className={`flex ${isMobile ? 'flex-col pt-16' : 'flex-row pt-0'} flex-grow w-full h-screen`}>
        {/* Text Section - Full width on mobile, half on desktop */}
        <div className={`${isMobile ? 'w-full px-6 py-6' : 'w-1/2 px-16'} flex flex-col justify-center ${isMobile ? '' : 'mt-[-20px]'}`}>
          {/* Fixed Button */}
          <span className="inline-block px-3 py-1 rounded-full bg-gray-300 text-center text-gray-700 text-sm mb-4 w-32">
            New Art Work
          </span>
          <h1
            className={`${isMobile ? 'text-3xl' : 'text-5xl'} font-bold mb-4 text-black cursor-pointer hover:text-gray-700 transition-colors`}
            onClick={onArtistsDirectoryClick}
          >
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

        {/* Carousel Section - Full width on mobile, half on desktop */}
        <div className={`${isMobile ? 'w-full px-4 pb-8' : 'w-1/2'} flex justify-center items-center ${isMobile ? 'mt-2' : 'mt-20'}`}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={!isMobile} // Disable navigation arrows on mobile for more space
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            className={`${isMobile ? 'w-full' : 'w-3/4'} ${isMobile ? 'h-[50vh]' : 'h-[65vh]'} items-center`}
          >
            {images.map((image, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center"
              >
                <div className={`${isMobile ? 'w-full' : 'w-80'} h-[90%] bg-gray-800 rounded-xl overflow-hidden shadow-md flex justify-center items-center mx-auto`}>
                  <img
                    src={image}
                    alt={`Artwork ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Only visible on mobile */}
      {isMobile && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg py-3 flex justify-around items-center z-10">
          <button className="flex flex-col items-center text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-500" onClick={onArtistsDirectoryClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span className="text-xs mt-1">Artists</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span className="text-xs mt-1">Search</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ArtGalleryPage;