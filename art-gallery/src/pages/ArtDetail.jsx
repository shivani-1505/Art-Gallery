import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const ArtDetail = ({ artwork, artworkId, onBackClick }) => {
  const [loadedArtwork, setLoadedArtwork] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // If artwork ID is provided but not the artwork object, fetch it from Firestore
  useEffect(() => {
    const fetchArtworkById = async () => {
      if (artworkId && !artwork) {
        setLoading(true);
        try {
          const artworkDocRef = doc(db, "artworks", artworkId);
          const artworkSnapshot = await getDoc(artworkDocRef);
          
          if (artworkSnapshot.exists()) {
            setLoadedArtwork({
              id: artworkSnapshot.id,
              ...artworkSnapshot.data(),
              price: artworkSnapshot.data().price ? `$${artworkSnapshot.data().price}` : "Not for sale"
            });
          } else {
            console.error("Artwork not found!");
            setLoadedArtwork(null);
          }
        } catch (error) {
          console.error("Error fetching artwork: ", error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchArtworkById();
  }, [artworkId, artwork]);

  // Use the loaded artwork if available, otherwise use the passed artwork prop
  const displayArtwork = loadedArtwork || artwork;

  // Handle add to cart
  const handleAddToCart = () => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if the item is already in the cart
    const itemIndex = existingCart.findIndex(item => item.id === displayArtwork.id);
    
    if (itemIndex === -1) {
      // If not in cart, add it
      const updatedCart = [...existingCart, displayArtwork];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setAddedToCart(true);
      
      // Trigger custom event to update cart count in header
      window.dispatchEvent(new Event('cartUpdated'));
      
      // Reset the "Added to Cart" message after a delay
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    } else {
      // Item is already in cart
      alert("This artwork is already in your cart.");
    }
  };
  
  // Handle purchase now
  const handlePurchaseNow = () => {
    // Here you would typically redirect to a checkout page
    // For now, we'll just log that purchase was initiated
    console.log("Purchase initiated for:", displayArtwork.title);
    alert(`Thank you for purchasing "${displayArtwork.title}"! This would normally take you to a checkout page.`);
  };

  // If no artwork is provided and not loaded yet, show a loading state
  if (!displayArtwork && loading) {
    return (
      <div className="min-h-screen w-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Loading artwork details...</p>
      </div>
    );
  }

  // If no artwork is available, show a placeholder
  if (!displayArtwork) {
    const placeholderArtwork = {
      id: 0,
      title: "Artwork Not Found",
      artist: "Unknown Artist",
      image: "/api/placeholder/600/600",
      price: "$0.00",
      year: new Date().getFullYear(),
      available: false,
      forsale: false,
      description: "This artwork could not be found.",
      category: "Unknown"
    };
    
    return renderArtworkDetail(placeholderArtwork, onBackClick, handleAddToCart, handlePurchaseNow, addedToCart);
  }

  return renderArtworkDetail(displayArtwork, onBackClick, handleAddToCart, handlePurchaseNow, addedToCart);
};

// Helper function to render the artwork detail content
const renderArtworkDetail = (artwork, onBackClick, handleAddToCart, handlePurchaseNow, addedToCart) => {
  // Convert price string to number for calculations if needed
  const priceValue = typeof artwork.price === 'string' && artwork.price.startsWith('$') 
    ? parseFloat(artwork.price.substring(1).replace(/,/g, '')) 
    : (typeof artwork.price === 'number' ? artwork.price : 0);
    
  const isPurchasable = artwork.available && (artwork.forsale || artwork.forSale) && priceValue > 0;

  return (
    <div className="min-h-screen w-screen bg-black text-white px-6 py-12 overflow-hidden">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto mb-6">
        <button 
          onClick={onBackClick} 
          className="text-white hover:text-gray-400 transition-colors"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </div>
      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Artwork Image - Left Side */}
          <motion.div 
            className="lg:w-3/5 bg-gray-900 p-4 rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full h-auto object-contain rounded-lg"
            />
          </motion.div>
          {/* Artwork Details - Right Side */}
          <motion.div 
            className="lg:w-2/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Creator Section */}
            <div className="mb-6">
              <p className="text-gray-400 mb-2">Creator</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden">
                  <img 
                    src="/api/placeholder/40/40" 
                    alt={artwork.artist} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-lg font-medium">{artwork.artist}</span>
              </div>
            </div>
            {/* Artwork Title */}
            <h1 className="text-3xl font-bold mb-2">
              {artwork.title} {artwork.id && `#${typeof artwork.id === 'string' ? artwork.id.substring(0, 6) : artwork.id}`}
            </h1>
            
            {/* Description */}
            <p className="text-gray-400 mb-6">
              {artwork.description || `A beautiful artwork by ${artwork.artist} created in ${artwork.year}. 
              This piece is part of the ${artwork.category} collection.`}
            </p>
            {/* Details Section */}
            <div className="mb-6">
              <p className="text-gray-400 mb-2">Details</p>
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-full bg-gray-800">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-300">Category: {artwork.category}</span>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <div className="p-1 rounded-full bg-gray-800">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-300">Year: {artwork.year}</span>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <div className="p-1 rounded-full bg-gray-800">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <span className="text-sm text-gray-300">
                  {artwork.available ? "Available for purchase" : "Not available for purchase"}
                </span>
              </div>
            </div>
            {/* Status and Price */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  artwork.available ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}>
                  {artwork.available ? "Available" : "Not Available"}
                </span>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-400">Price</p>
                <p className="text-2xl font-bold">{typeof artwork.price === 'number' ? `$${artwork.price}` : artwork.price}</p>
              </div>
            </div>
            
            {/* Added to Cart Message */}
            {addedToCart && (
              <div className="bg-green-500 text-white p-2 rounded-md mb-4 text-center">
                Added to cart successfully!
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              {/* Purchase Button */}
              {isPurchasable && (
                <button 
                  onClick={handlePurchaseNow}
                  className="w-full bg-white text-black py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                >
                  Purchase Now
                </button>
              )}
              
              {/* Add to Cart Button */}
              {artwork.available && (
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-gray-800 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors border border-gray-600"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ArtDetail;