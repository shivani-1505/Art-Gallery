import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArtworkDetailPage from "./ArtDetail"; // Import the new detail page component

// Artwork data with categories and status information
const artworkData = {
  "Paintings": [
    {
      id: 1,
      title: "Abstract Harmony",
      artist: "Bonita Rizka",
      image: "https://i.pinimg.com/474x/25/c9/3d/25c93dd41f16048a836d5837dae4e638.jpg",
      available: true,
      forSale: true,
      price: "$850",
      year: 2023,
      description: "A collection of vibrant abstract pieces limited on the Ethereum blockchain. Each unique artwork is randomly generated from a combination of over 400 individually hand-drawn elements.",
      category: "Paintings"
    },
    {
      id: 2,
      title: "Mountain Dreams",
      artist: "Michel Angelo",
      image: "https://i.pinimg.com/736x/4c/ca/32/4cca324472f172eb397189cc667d3cde.jpg",
      available: false,
      forSale: false,
      price: "$1,200",
      year: 2022,
      description: "A serene mountain landscape capturing the essence of nature's majesty, painted with intricate detail and passionate brushwork.",
      category: "Paintings"
    },
    {
      id: 3,
      title: "Blue Serenity",
      artist: "Pablo Picasso",
      image: "https://i.pinimg.com/736x/6a/30/ad/6a30ad236772c6481c42bea92b6b20be.jpg",
      available: true,
      forSale: true,
      price: "$1,500",
      year: 2023,
      description: "A mesmerizing blue composition that evokes feelings of calm and introspection through geometric forms and subtle color variations.",
      category: "Paintings"
    }
  ],
  "Sculptures": [
    {
      id: 4,
      title: "Bronze Elegance",
      artist: "Michel Angelo",
      image: "https://i.pinimg.com/736x/7f/29/9d/7f299d29c147e3aaf0362e9b9de2abff.jpg",
      available: true,
      forSale: true,
      price: "$3,200",
      year: 2021,
      description: "A stunning bronze sculpture that captures the fluidity and grace of human movement in a timeless art form.",
      category: "Sculptures"
    },
    {
      id: 5,
      title: "Marble Flow",
      artist: "Bonita Rizka",
      image: "https://i.pinimg.com/736x/a9/12/73/a91273677b2faec433397d6c1cdf3475.jpg",
      available: true,
      forSale: false,
      price: "Not for sale",
      year: 2023,
      description: "A contemporary marble masterpiece that challenges traditional sculpture forms with organic flowing shapes and expert craftsmanship.",
      category: "Sculptures"
    }
  ],
  "Illustrations": [
    {
      id: 6,
      title: "Forest Wildlife",
      artist: "Albrecht Dürer",
      image: "https://drawpaintacademy.com/wp-content/uploads/2022/07/Albrecht-Du%E2%95%A0erer-Young-Hare-1502.jpg",
      available: true,
      forSale: true,
      price: "$650",
      year: 2022,
      description: "A meticulously detailed illustration of forest wildlife, showcasing exceptional technical skill and observation of nature.",
      category: "Illustrations"
    },
    {
      id: 7,
      title: "Birds of Paradise",
      artist: "Frans Snyders",
      image: "https://drawpaintacademy.com/wp-content/uploads/2022/07/Frans-Snyders-Concert-of-Birds-1629-1630.jpg",
      available: false,
      forSale: false,
      price: "$800",
      year: 2021,
      description: "A vibrant illustration celebrating the diversity and beauty of exotic birds, rendered with remarkable attention to color and form.",
      category: "Illustrations"
    }
  ],
  "Abstract Art": [
    {
      id: 8,
      title: "Geometric Symphony",
      artist: "Wassily Kandinsky",
      image: "https://i0.wp.com/blog.artsper.com/wp-content/uploads/2016/05/18040_1_l.jpg?resize=1024%2C687&ssl=1",
      available: true,
      forSale: true,
      price: "$1,800",
      year: 2022,
      description: "A dynamic composition of geometric forms and bold colors that creates visual rhythm and emotional resonance in the viewer.",
      category: "Abstract Art"
    },
    {
      id: 9,
      title: "Colored Squares",
      artist: "Wassily Kandinsky",
      image: "https://i0.wp.com/blog.artsper.com/wp-content/uploads/2016/05/geo1.jpg?w=517&ssl=1",
      available: true,
      forSale: true,
      price: "$2,200",
      year: 2023,
      description: "A striking arrangement of colored squares that explores the relationship between form, color, and spatial perception.",
      category: "Abstract Art"
    },
    {
      id: 10,
      title: "Circular Patterns",
      artist: "Modern Artist",
      image: "https://i0.wp.com/blog.artsper.com/wp-content/uploads/2016/05/geo4.jpg?resize=1024%2C1024&ssl=1",
      available: false,
      forSale: false,
      price: "Not for sale",
      year: 2022,
      description: "A mesmerizing exploration of circular patterns that creates optical illusions and invites the viewer to find meaning in abstraction.",
      category: "Abstract Art"
    }
  ],
  "Photography": [
    {
      id: 11,
      title: "Urban Reflections",
      artist: "Modern Artist",
      image: "https://images.unsplash.com/photo-1558865869-c93f6f8482af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZXJuJTIwYXJ0fGVufDB8fDB8fHww",
      available: true,
      forSale: true,
      price: "$450",
      year: 2023,
      description: "A contemplative photograph capturing the interplay of light and architecture in the modern urban landscape.",
      category: "Photography"
    },
    {
      id: 12,
      title: "Nature Composition",
      artist: "Modern Artist",
      image: "https://images.unsplash.com/photo-1583407723467-9b2d22504831?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9kZXJuJTIwYXJ0fGVufDB8fDB8fHww",
      available: true,
      forSale: true,
      price: "$550",
      year: 2022,
      description: "A stunning photographic composition that reveals the hidden patterns and textures found in natural environments.",
      category: "Photography"
    }
  ]
};

const GalleryPage = ({ onArtistClick, onBackClick }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [artworksToShow, setArtworksToShow] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  // Get all categories
  const categories = ["All", ...Object.keys(artworkData)];

  // Filter artwork based on selected category
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (selectedCategory === "All") {
        // Flatten all artworks from all categories
        const allArtworks = Object.values(artworkData).flat();
        setArtworksToShow(allArtworks);
      } else {
        setArtworksToShow(artworkData[selectedCategory] || []);
      }
      setLoading(false);
    }, 300);
  }, [selectedCategory]);

  // Handle category change with smooth transitions
  const handleCategoryChange = (category) => {
    setLoading(true);
    setSelectedCategory(category);
  };

  // Handle artist click
  const handleArtistClick = (artistName) => {
    if (onArtistClick) {
      // Find all artworks by this artist
      const artistArtworks = Object.values(artworkData)
        .flat()
        .filter(artwork => artwork.artist === artistName)
        .map(artwork => artwork.image);
      
      onArtistClick(artistName, artistArtworks);
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
                        artwork.forSale 
                          ? "bg-blue-500 text-white" 
                          : "bg-gray-500 text-white"
                      }`}>
                        {artwork.forSale ? "For Sale" : "Not For Sale"}
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