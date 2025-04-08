import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArtworkDetailPage from "./ArtDetail";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const GalleryPage = ({ onArtistClick, onBackClick }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [artworksToShow, setArtworksToShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [categories, setCategories] = useState(["All"]);
  
  // Store complete artist data
  const [artistsData, setArtistsData] = useState({});

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

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        const artworksCollection = collection(db, "artworks");
        const artworksSnapshot = await getDocs(artworksCollection);
        const artworksData = [];
        const categorySet = new Set(["All"]);
        const artistNames = new Set();
        
        artworksSnapshot.forEach((doc) => {
          const artwork = {
            id: doc.id,
            ...doc.data(),
            price: doc.data().price ? `$${doc.data().price}` : "Not for sale",
          };
          if (artwork.category) {
            categorySet.add(artwork.category);
          }
          if (artwork.artist) {
            artistNames.add(artwork.artist);
          }
          artworksData.push(artwork);
        });
        
        setCategories(Array.from(categorySet));
        setArtworksToShow(
          selectedCategory === "All"
            ? artworksData
            : artworksData.filter((artwork) => artwork.category === selectedCategory)
        );
        
        // Fetch complete artist data for all artists
        await fetchArtistsData(Array.from(artistNames));
      } catch (error) {
        console.error("Error fetching artworks: ", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArtworks();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setLoading(true);
    setSelectedCategory(category);
  };

  const handleArtistClick = (artistName, e) => {
    if (e) {
      e.stopPropagation(); // Prevent triggering artwork click
    }
    
    if (onArtistClick) {
      try {
        // Use the complete artist data from the artists collection
        const artistData = artistsData[artistName];
        
        if (artistData) {
          console.log("Navigating to artist profile with data:", artistData);
          onArtistClick(artistData);
        } else {
          // Fallback if artist data not available
          console.warn(`Complete data for artist "${artistName}" not found`);
          
          // Fetch artist artworks as a fallback
          const fetchArtistArtworks = async () => {
            const artworksCollection = collection(db, "artworks");
            const artistQuery = query(artworksCollection, where("artist", "==", artistName));
            const artistArtworksSnapshot = await getDocs(artistQuery);
            
            const artistArtworks = [];
            artistArtworksSnapshot.forEach((doc) => {
              artistArtworks.push({
                id: doc.id,
                ...doc.data()
              });
            });
            
            // Create a fallback artist object
            const fallbackArtistData = {
              name: artistName,
              artworks: artistArtworks
            };
            
            onArtistClick(fallbackArtistData);
          };
          
          fetchArtistArtworks();
        }
      } catch (error) {
        console.error("Error handling artist click: ", error);
      }
    } else {
      console.warn("onArtistClick function is not provided.");
    }
  };
  
  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleBackFromDetail = () => {
    setSelectedArtwork(null);
  };

  if (selectedArtwork) {
    return <ArtworkDetailPage artwork={selectedArtwork} onBackClick={handleBackFromDetail} />;
  }

  return (
    <div className="min-h-screen w-screen bg-black text-white px-6 py-12 overflow-hidden">
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
        </p>
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === category ? "bg-white text-black" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex justify-center">
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xl text-gray-400">
                Loading...
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
            >
              {artworksToShow.map((artwork) => (
                <motion.div
                  key={artwork.id}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.4 }}
                  className="bg-gray-900 rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                  onClick={() => handleArtworkClick(artwork)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex justify-between items-end">
                          <div>
                            <h3 className="text-xl font-bold">{artwork.title}</h3>
                            <p
                              className="text-blue-300 hover:text-blue-200 cursor-pointer"
                              onClick={(e) => handleArtistClick(artwork.artist, e)}
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
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{artwork.title} ({artwork.year})</h3>
                    <p
                      className="text-gray-400 cursor-pointer hover:text-gray-300"
                      onClick={(e) => handleArtistClick(artwork.artist, e)}
                    >
                      {artwork.artist}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
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