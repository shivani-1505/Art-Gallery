import React from "react";
import { motion } from "framer-motion";
import { MdArrowBack } from "react-icons/md";

// Mock data for artists
const artists = [
  {
    id: 1,
    name: "Bonita Rizka",
    role: "Contemporary Artist",
    image: "/api/placeholder/300/300", // Using placeholder since we can't load external images
    specialty: "Digital Art & Sculpture",
    artworks: [
      "https://i.pinimg.com/474x/25/c9/3d/25c93dd41f16048a836d5837dae4e638.jpg", 
      "https://i.pinimg.com/736x/a9/12/73/a91273677b2faec433397d6c1cdf3475.jpg"
    ]
  },
  {
    id: 2,
    name: "Michel Angelo",
    role: "Renaissance Master",
    image: "/api/placeholder/300/300",
    specialty: "Classical Sculpture & Painting",
    artworks: [
      "https://i.pinimg.com/736x/4c/ca/32/4cca324472f172eb397189cc667d3cde.jpg", 
      "https://i.pinimg.com/736x/7f/29/9d/7f299d29c147e3aaf0362e9b9de2abff.jpg"
    ]
  },
  {
    id: 3,
    name: "Pablo Picasso",
    role: "Modern Art Pioneer",
    image: "/api/placeholder/300/300",
    specialty: "Cubism & Abstract Art",
    artworks: [
      "https://i.pinimg.com/736x/6a/30/ad/6a30ad236772c6481c42bea92b6b20be.jpg", 
      "https://ik.imagekit.io/theartling/prod/original_images/62.jpg?tr=w-950"
    ]
  },
  {
    id: 4,
    name: "Albrecht Dürer",
    role: "Renaissance Printmaker",
    image: "/api/placeholder/300/300",
    specialty: "Woodcuts & Engravings",
    artworks: [
      "https://drawpaintacademy.com/wp-content/uploads/2022/07/Albrecht-Du%E2%95%A0erer-Young-Hare-1502.jpg"
    ]
  },
  {
    id: 5,
    name: "Wassily Kandinsky",
    role: "Abstract Art Pioneer",
    image: "/api/placeholder/300/300",
    specialty: "Geometric Abstraction",
    artworks: [
      "https://i0.wp.com/blog.artsper.com/wp-content/uploads/2016/05/18040_1_l.jpg?resize=1024%2C687&ssl=1", 
      "https://i0.wp.com/blog.artsper.com/wp-content/uploads/2016/05/geo1.jpg?w=517&ssl=1"
    ]
  },
  {
    id: 6,
    name: "Frida Kahlo",
    role: "Surrealist Painter",
    image: "/api/placeholder/300/300",
    specialty: "Self-Portraits & Symbolism",
    artworks: [
      "https://images.unsplash.com/photo-1558865869-c93f6f8482af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZXJuJTIwYXJ0fGVufDB8fDB8fHww"
    ]
  }
];

export default function ArtistsDirectory({ onBackClick, onArtistSelect }) {
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
      
      {/* Artists Grid - Centered with max width */}
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
              onClick={() => onArtistSelect(artist.name, artist.artworks)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="h-64 overflow-hidden bg-gray-800">
                <img 
                  src={artist.image} 
                  alt={artist.name}
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-1">{artist.name}</h2>
                <p className="text-gray-300 mb-3">{artist.role}</p>
                <p className="text-sm text-gray-400">Specialty: {artist.specialty}</p>
                
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-400">{artist.artworks.length} artwork{artist.artworks.length !== 1 ? 's' : ''}</span>
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