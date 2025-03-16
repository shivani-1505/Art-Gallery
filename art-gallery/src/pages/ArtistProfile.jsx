import React from "react";
import { motion } from "framer-motion";
import { MdArrowBack } from "react-icons/md";

export default function ArtistProfile({ onBackClick, artistName, artworks = [] }) {
  // Default artworks if none provided
  const displayArtworks = artworks.length > 0 ? artworks : [
    "https://i.pinimg.com/474x/25/c9/3d/25c93dd41f16048a836d5837dae4e638.jpg",
    "https://i.pinimg.com/736x/a9/12/73/a91273677b2faec433397d6c1cdf3475.jpg",
    "https://i.pinimg.com/736x/79/c2/41/79c241ffee4456a2b8cc8515d4dc41df.jpg"
  ];

  return (
    <div className="bg-black min-h-screen w-screen overflow-x-hidden text-white m-0 p-0">
      {/* Top Section with Artist Info - Styled like the resume in the image */}
      <div className="w-full px-16 pt-10 pb-8">
        <div className="flex items-center mb-6 relative">
          {/* Back Button */}
          <button 
            onClick={onBackClick} 
            className="text-white hover:text-gray-300 transition-colors absolute left-0"
            aria-label="Go back to catalog"
          >
            <MdArrowBack className="text-2xl" />
          </button>
          
          {/* Page Title */}
          <h1 className="text-3xl font-semibold text-center w-full">Artist Profile</h1>
        </div>

        {/* Artist Profile Card - Inspired by the resume design */}
        <div className="mt-8 bg-gray-900 rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Photo */}
            <div className="md:w-1/3 p-8 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-800">
                <img 
                  src="/api/placeholder/300/300" 
                  alt={artistName || "Artist"} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Right side - Information */}
            <div className="md:w-2/3 p-8">
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-amber-400">{artistName || "BONITA"}</h2>
                <h3 className="text-xl text-gray-400 mt-1">RIZKA D</h3>
              </div>
              
              <p className="text-gray-300 mb-8">
                These years as a graphic designer/sculptor have been a wild ride. I've tackled tons
                of challenges and learned so much from the art design. From browsing trends to
                crafting dreams, I've designed with our visual aesthetic, and painting complex
                sculptures with light frames and guidelines - To bear incredibly valuable
                experiences.
              </p>
              
              <div className="mb-6">
                <h4 className="text-2xl font-semibold mb-2">EDUCATION</h4>
                <div className="flex justify-between items-center">
                  <p className="text-gray-300">Institut Teknologi Sepuluh Nopember<br />Industrial Design | GPA 3.27 of 4</p>
                  <span className="border border-gray-400 rounded-full px-4 py-1 text-sm">2015-2019</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-2xl font-semibold mb-2">SKILLS</h4>
                <div className="grid grid-cols-2 gap-4">
                  <ul className="text-gray-300">
                    <li>Adobe Illustrator</li>
                    <li>Adobe Photoshop</li>
                    <li>After Effect</li>
                  </ul>
                  <ul className="text-gray-300">
                    <li>Figma</li>
                    <li>Canva</li>
                    <li>Fusion</li>
                  </ul>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-semibold mb-2">CONTACT</h4>
                  <ul className="text-gray-300">
                    <li>Email: bonitarizka03@gmail.com</li>
                    <li>LinkedIn: www.linkedin.com/in/bonitarizka</li>
                    <li>Behance: www.behance.net/bonitarizka</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-2xl font-semibold mb-2">LANGUAGE</h4>
                  <ul className="text-gray-300">
                    <li>Indonesian - Mother language</li>
                    <li>English - Conversational</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Artist's Artworks Section */}
      <div className="px-16 py-8">
        <h2 className="text-2xl font-semibold mb-6">Artist's Works</h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {displayArtworks.map((image, index) => (
            <motion.div
              key={`artwork-${index}`}
              className="aspect-[3/4] rounded-xl overflow-hidden shadow-2xl relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Artwork Image */}
              <img
                src={image}
                alt={`Artwork ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay with Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-semibold">{artistName}'s Artwork {index + 1}</h3>
                    <p className="text-gray-300 text-sm">Created in 2023</p>
                  </div>
                  <div className="bg-white text-black px-4 py-2 rounded-full shadow-md font-bold">
                    $300
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}