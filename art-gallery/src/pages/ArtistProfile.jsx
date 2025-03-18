import React, { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { motion } from "framer-motion";
import ArtDetail from "./ArtDetail"; // Import ArtDetail component

const ArtistProfile = ({ artist, onBackClick }) => {
  // State to track selected artwork for detail view
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  
  // Handle back from artwork detail
  const handleBackFromDetail = () => {
    setSelectedArtwork(null);
  };
  
  // Handle artwork click
  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);
  };

  if (!artist)
    return (
      <p className="text-center text-gray-400 mt-10">
        Select an artist to see details.
      </p>
    );
    
  // If an artwork is selected, show its details
  if (selectedArtwork) {
    return <ArtDetail artwork={selectedArtwork} onBackClick={handleBackFromDetail} />;
  }

  return (
    <div className="bg-black min-h-screen w-screen text-white p-6">
      {/* Header with Back Button */}
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBackClick}
          className="flex items-center text-white hover:text-gray-300 mb-4"
          aria-label="Go back"
        >
          <MdArrowBack className="text-2xl mr-2" /> Back
        </button>
        {/* Artist Profile Card */}
        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row">
            {/* Left Side – Artist Photo */}
            <div className="md:w-1/3 p-8 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-800 border-4 border-gray-700">
                <img
                  src={artist.imageUrl}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Right Side – Artist Details */}
            <div className="md:w-2/3 p-8">
              <h2 className="text-4xl font-bold text-amber-400">{artist.name}</h2>
              <p className="text-gray-400 mt-1">
                <strong>Lifetime:</strong> {artist.lifetime}
              </p>
              <div className="mt-4">
                <h3 className="text-2xl font-semibold">Biography</h3>
                <p className="text-gray-300 mt-2 leading-relaxed">
                  {artist.biography}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Famous Artworks Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Famous Artworks</h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {artist.famousArtworks && artist.famousArtworks.map((artwork, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-xl relative group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => handleArtworkClick({
                  id: `${artist.name}-artwork-${index}`,
                  title: artwork.title,
                  artist: artist.name,
                  image: artwork.imageUrl,
                  year: artwork.year || "Unknown",
                  category: artwork.category || "Fine Art",
                  price: artwork.price || "Price on Request",
                  available: artwork.available !== false,
                  description: artwork.description || `A masterpiece by ${artist.name}. ${artwork.title} is one of the artist's most recognized works.`
                })}
              >
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-4">
                  <p className="text-center text-gray-300">{artwork.title}</p>
                </div>
                
                {/* Hover overlay - similar to the gallery view */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-lg font-semibold">{artwork.title}</h3>
                      <p className="text-gray-300 text-sm">
                        {artist.name}
                      </p>
                    </div>
                    {artwork.price && (
                      <div className="bg-white text-black px-3 py-1 rounded-full shadow-md font-bold text-sm">
                        {typeof artwork.price === 'number' ? `$${artwork.price}` : artwork.price}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Display a message if no artworks are available */}
        {(!artist.famousArtworks || artist.famousArtworks.length === 0) && (
          <div className="text-center py-8">
            <p className="text-gray-400">No artworks available for this artist.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistProfile;