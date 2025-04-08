import React from 'react';
import image2 from '../assets/image4.avif';

const Page1 = ({ onGalleryClick }) => {
  return (
    <div>
      {/* Hero Section */}
      <header
        className="relative flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${image2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100vh',
          margin: 0,
        }}
      >
        {/* Dark Overlay */}
        <div 
          className="absolute top-0 left-0 w-full h-full" 
          style={{ 
            backgroundColor: 'rgba(0, 0, 1, 0.5)', 
            zIndex: 0 
          }}
        ></div>
        
        {/* Hero Content */}
        <div className="relative z-10 px-4 mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold mt-64 md:mt-96 md:text-5xl">
            Dive into creativity with our gallery collection
          </h2>
          <p className="text-base md:text-xl mt-4 md:mt-6 leading-relaxed">
            Immerse yourself in the captivating stories behind each artwork, as our artists draw inspiration from cultures, nature, and everyday life.
          </p>
          <div className="mt-6 md:mt-8">
            <button
              className="px-6 py-3 text-base md:text-lg bg-white text-black font-bold rounded-full cursor-pointer transition-colors duration-300 hover:bg-gray-200"
              onClick={onGalleryClick}
            >
              Visit Gallery
            </button>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="absolute bottom-5 right-5 flex gap-2 z-10">
          <button className="w-10 h-10 rounded-full bg-white bg-opacity-50 border-none flex items-center justify-center cursor-pointer">
            &#10094;
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-500 border-none flex items-center justify-center cursor-pointer">
            &#10095;
          </button>
        </div>
      </header>
    </div>
  );
};

export default Page1;