import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowBack } from "react-icons/md";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import ArtDetail from "./ArtDetail"; // Import ArtDetail component

export default function FullArtCatalog({ onBackClick, onArtistClick }) {
  const [selected, setSelected] = useState("All");
  const [imagesToShow, setImagesToShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(["All"]);
  const [artists, setArtists] = useState({});
  
  // Map of image URLs to their artwork details
  const [imageDetails, setImageDetails] = useState({});

  // Store the complete artist data
  const [artistsData, setArtistsData] = useState({});
  
  // Selected artwork for detail view
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  // Function to fetch all artworks from Firestore
  const fetchArtworks = async () => {
    setLoading(true);
    try {
      const artworksCollection = collection(db, "artworks");
      const snapshot = await getDocs(artworksCollection);
      
      // Build category set, artist map, and image details map
      const categorySet = new Set(["All"]);
      const artistsMap = {};
      const imageDetailsMap = {};
      const allImages = [];
      const artistNames = new Set();

      snapshot.forEach((doc) => {
        const artwork = { id: doc.id, ...doc.data() };
        
        // Add to category set
        if (artwork.category) {
          categorySet.add(artwork.category);
        }
        
        // Add to artists map
        if (artwork.artist) {
          if (!artistsMap[artwork.artist]) {
            artistsMap[artwork.artist] = { images: [] };
          }
          
          if (artwork.image) {
            artistsMap[artwork.artist].images.push(artwork.image);
            
            // Add to image details map
            imageDetailsMap[artwork.image] = artwork;
            
            // Add to all images array
            allImages.push(artwork.image);
          }

          // Add artist name to the set for later fetching
          artistNames.add(artwork.artist);
        }
      });
      
      // Update state
      setCategories(Array.from(categorySet));
      setArtists(artistsMap);
      setImageDetails(imageDetailsMap);
      
      // Filter images based on selected category
      if (selected === "All") {
        setImagesToShow(allImages);
      } else {
        // Filter by category
        const filteredImages = Object.values(imageDetailsMap)
          .filter(artwork => artwork.category === selected)
          .map(artwork => artwork.image);
        
        setImagesToShow(filteredImages);
      }

      // Fetch complete artist data for all artists found in artworks
      fetchArtistsData(Array.from(artistNames));
    } catch (error) {
      console.error("Error fetching artworks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch complete artist data from Firestore
  const fetchArtistsData = async (artistNames) => {
    try {
      const artistsCollection = collection(db, "artists");
      const snapshot = await getDocs(artistsCollection);
      
      const artistsDataMap = {};
      snapshot.forEach((doc) => {
        const artist = { id: doc.id, ...doc.data() };
        if (artistNames.includes(artist.name)) {
          artistsDataMap[artist.name] = artist;
        }
      });
      
      setArtistsData(artistsDataMap);
    } catch (error) {
      console.error("Error fetching artists data:", error);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchArtworks();
  }, []);

  // Filter images when category changes
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (selected === "All") {
        // Show all images
        setImagesToShow(Object.keys(imageDetails));
      } else {
        // Filter by category
        const filteredImages = Object.values(imageDetails)
          .filter(artwork => artwork.category === selected)
          .map(artwork => artwork.image);
        
        setImagesToShow(filteredImages);
      }
      setLoading(false);
    }, 300);
  }, [selected, imageDetails]);

  // Get artist name for a specific image
  const getArtistName = (image) => {
    return imageDetails[image]?.artist || "Unknown Artist";
  };

  // Get artwork price for a specific image
  const getArtworkPrice = (image) => {
    const artwork = imageDetails[image];
    if (!artwork || !artwork.price) return "Price on Request";
    return `$${artwork.price}`;
  };

  // Get artwork title for a specific image
  const getArtworkTitle = (image, index) => {
    return imageDetails[image]?.title || `Artwork ${index + 1}`;
  };

  // Handle artist click - pass the complete artist object
  const handleArtistClick = (artistName, e) => {
    e.stopPropagation(); // Prevent the click from bubbling up
    if (onArtistClick) {
      // Use the complete artist data object
      const artistData = artistsData[artistName];
      if (artistData) {
        onArtistClick(artistData);
      } else {
        console.error(`Complete data for artist "${artistName}" not found`);
      }
    }
  };
  
  // Handle artwork click to view details
  const handleArtworkClick = (image) => {
    setSelectedArtwork(imageDetails[image]);
  };
  
  // Handle back from artwork detail
  const handleBackFromDetail = () => {
    setSelectedArtwork(null);
  };
  
  // If an artwork is selected, show its details
  if (selectedArtwork) {
    return <ArtDetail artwork={selectedArtwork} onBackClick={handleBackFromDetail} />;
  }

  return (
    <div className="bg-black min-h-screen w-screen overflow-x-hidden text-white m-0 p-0">
      {/* Fixed Header with Back Button and Categories */}
      <div className="sticky top-10 z-10 bg-black bg-opacity-95 pt-10 pb-4 px-16">
        <div className="flex items-center mb-6 relative">
          {/* Back Button (positioned left) */}
          <button 
            onClick={onBackClick} 
            className="text-white hover:text-gray-300 transition-colors absolute left-0"
            aria-label="Go back to main page"
          >
            <MdArrowBack className="text-2xl" />
          </button>
          
          {/* Page Title (centered) */}
          <h1 className="text-3xl font-semibold text-center w-full">Artwork for Sale</h1>
        </div>

        {/* Category Buttons */}
        <div className="flex space-x-6 text-sm overflow-x-auto pb-2 justify-center w-full">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelected(category)}
              className={`relative pb-1 transition-all border-none outline-none focus:outline-none bg-transparent whitespace-nowrap ${
                selected === category ? "text-white font-semibold" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {category}
              {selected === category && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Full Screen Grid */}
      <div className="px-16 py-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <AnimatePresence mode="popLayout">
            {!loading &&
              imagesToShow.map((image, index) => (
                <motion.div
                  key={`${selected}-${image}-${index}`}
                  className="aspect-[3/4] rounded-xl overflow-hidden shadow-2xl relative group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  onClick={() => handleArtworkClick(image)}
                >
                  {/* Artwork Image - Full Height */}
                  <img
                    src={image}
                    alt={getArtworkTitle(image, index)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay with Price */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-xl font-semibold">{getArtworkTitle(image, index)}</h3>
                        {/* Make artist name clickable */}
                        <p 
                          className="text-gray-300 text-sm cursor-pointer hover:text-white hover:underline"
                          onClick={(e) => handleArtistClick(getArtistName(image), e)}
                        >
                          {getArtistName(image)}
                        </p>
                      </div>
                      <div className="bg-white text-black px-4 py-2 rounded-full shadow-md font-bold">
                        {getArtworkPrice(image)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-400">Loading artworks...</p>
        </div>
      )}
      
      {/* Empty State */}
      {!loading && imagesToShow.length === 0 && (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-400">No artworks found in this category.</p>
        </div>
      )}
    </div>
  );
}