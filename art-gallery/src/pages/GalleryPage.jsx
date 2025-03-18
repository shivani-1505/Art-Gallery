import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArtworkDetailPage from "./ArtDetail";
import { db } from "../firebase/firebaseConfig"; // Import the Firestore db
import { collection, getDocs, query, where } from "firebase/firestore"; // Import Firestore query functions

const GalleryPage = ({ onArtistClick, onBackClick }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [artworksToShow, setArtworksToShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [categories, setCategories] = useState(["All"]);

  // Fetch artworks from Firestore
  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        const artworksCollection = collection(db, "artworks");
        const artworksSnapshot = await getDocs(artworksCollection);
        
        const artworksData = [];
        const categorySet = new Set(["All"]);
        
        artworksSnapshot.forEach((doc) => {
          const artwork = {
            id: doc.id,
            ...doc.data(),
            // Format price to display as currency if it exists
            price: doc.data().price ? `$${doc.data().price}` : "Not for sale"
          };
          
          // Add category to our set of categories
          if (artwork.category) {
            categorySet.add(artwork.category);
          }
          
          artworksData.push(artwork);
        });
        
        // Convert Set to Array for categories
        setCategories(Array.from(categorySet));
        
        // Filter artworks based on selected category
        if (selectedCategory === "All") {
          setArtworksToShow(artworksData);
        } else {
          setArtworksToShow(artworksData.filter(artwork => artwork.category === selectedCategory));
        }
      } catch (error) {
        console.error("Error fetching artworks: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [selectedCategory]);

  // Handle category change with smooth transitions
  const handleCategoryChange = (category) => {
    setLoading(true);
    setSelectedCategory(category);
  };

  // Handle artist click
  const handleArtistClick = async (artistName) => {
    if (onArtistClick) {
      try {
        // Query Firestore for all artworks by this artist
        const artworksCollection = collection(db, "artworks");
        const artistQuery = query(artworksCollection, where("artist", "==", artistName));
        const artistArtworksSnapshot = await getDocs(artistQuery);
        
        const artistArtworks = [];
        artistArtworksSnapshot.forEach((doc) => {
          artistArtworks.push(doc.data().image);
        });
        
        onArtistClick(artistName, artistArtworks);
      } catch (error) {
        console.error("Error fetching artist artworks: ", error);
      }
    }
  };

  // Handle artwork click
  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);
  };

  // Handle back from artwork detail view
  const handleBackFromDetail = () => {
    setSelectedArtwork(null);
  };

  // If an artwork is selected, show the detail page
  if (selectedArtwork) {
    return <ArtworkDetailPage artwork={selectedArtwork} onBackClick={handleBackFromDetail} />;
  }

  return (
    <div className="min-h-screen w-screen bg-black text-white px-6 py-12 overflow-hidden">
      {/* Header with back button */}
      <div className="max-w-6xl mx-auto mb-12 px-4">
        <div className="flex items-center mb-8 relative">
          <button 
            onClick={onBackClick || (() => window.history.back())} 
            className="text-white hover:text-gray-300 transition-colors absolute left-0"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          
          <h1 className="text-4xl font-bold text-center w-full">Art Gallery Collection</h1>
        </div>
        
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8">
          Explore our diverse collection of artworks from talented artists around the world.
          Browse by category and discover pieces available for purchase.
        </p>
        
        {/* Category Tabs */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === category 
                  ? "bg-white text-black" 
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Artists Grid - Centered with max width */}
      <div className="max-w-6xl mx-auto flex justify-center">
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xl text-gray-400"
              >
                Loading...
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
            >
              {artworksToShow.map((artwork) => (
                <motion.div
                  key={artwork.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                  className="bg-gray-900 rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                  onClick={() => handleArtworkClick(artwork)}
                >
                  {/* Artwork Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    {/* Status Badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                        artwork.available 
                          ? "bg-green-500 text-white" 
                          : "bg-red-500 text-white"
                      }`}>
                        {artwork.available ? "Available" : "Not Available"}
                      </span>
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                        artwork.forsale 
                          ? "bg-blue-500 text-white" 
                          : "bg-gray-500 text-white"
                      }`}>
                        {artwork.forsale ? "For Sale" : "Not For Sale"}
                      </span>
                    </div>
                    
                    {/* Image */}
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex justify-between items-end">
                          <div>
                            <h3 className="text-xl font-bold">{artwork.title}</h3>
                            <p 
                              className="text-blue-300 hover:text-blue-200 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleArtistClick(artwork.artist);
                              }}
                            >
                              {artwork.artist}
                            </p>
                          </div>
                          <div className="bg-white text-black px-3 py-1 rounded-full font-bold">
                            {artwork.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Artwork Info (Always Visible) */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{artwork.title} ({artwork.year})</h3>
                    <p 
                      className="text-gray-400 cursor-pointer hover:text-gray-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleArtistClick(artwork.artist);
                      }}
                    >
                      {artwork.artist}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Empty State */}
        {!loading && artworksToShow.length === 0 && (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-400">No artworks found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;