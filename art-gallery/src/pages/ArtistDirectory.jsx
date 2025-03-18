import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase/firebaseConfig.js";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdArrowBack } from "react-icons/md";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function ArtistDirectory({ onBackClick, onArtistSelect }) {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    async function fetchArtists() {
      const artistCollection = collection(db, "artists");
      const snapshot = await getDocs(artistCollection);
      const artistList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setArtists(artistList);
    }

    fetchArtists();
  }, []);

  // Function to handle artist selection using custom navigation
  const handleArtistSelect = (artist) => {
    console.log("Selected artist:", artist); // Debug log
    onArtistSelect(artist);
  };

  return (
    <div className="min-h-screen w-screen bg-black text-white px-6 py-12 overflow-hidden">
      {/* Header with back button */}
      <div className="max-w-6xl mx-auto mb-12 px-4">
        <div className="flex items-center mb-8 relative">
          <button 
            onClick={onBackClick} 
            className="text-white hover:text-gray-300 transition-colors absolute left-0"
            aria-label="Go back to gallery"
          >
            <MdArrowBack className="text-2xl" />
          </button>
          <h1 className="text-4xl font-bold text-center w-full">Our Contributing Artists</h1>
        </div>
        <p className="text-gray-400 text-center max-w-2xl mx-auto">
          Meet the talented artists who have contributed their unique vision and creativity to our gallery. 
          Click on any artist to learn more about their background, skills, and view their artwork collection.
        </p>
      </div>
      
      {/* Artists Grid */}
      <div className="max-w-6xl mx-auto flex justify-center">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {artists.map((artist) => (
            <motion.div
              key={artist.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-xl cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl w-full max-w-sm border border-gray-800"
              onClick={() => handleArtistSelect(artist)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="h-64 overflow-hidden bg-gray-800">
                <img 
                  src={artist.imageUrl} 
                  alt={artist.name}
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-1">{artist.name}</h2>
                <p className="text-gray-300 mb-3">{artist.description}</p>
                <p className="text-sm text-gray-400">Lifetime: {artist.lifetime}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {artist.famousArtworks && artist.famousArtworks.length} artwork
                    {artist.famousArtworks && artist.famousArtworks.length !== 1 ? "s" : ""}
                  </span>
                  <span className="text-sm text-blue-400 hover:text-blue-300 group flex items-center">
                    View Profile
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default ArtistDirectory;
