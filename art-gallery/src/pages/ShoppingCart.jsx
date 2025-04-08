import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowBack, MdDeleteOutline, MdShoppingCartCheckout } from "react-icons/md";

const ShoppingCart = ({ onBackClick }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Load cart items from localStorage
  useEffect(() => {
    setLoading(true);
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    setLoading(false);
  }, []);
  
  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      // Extract numeric price value
      const price = typeof item.price === 'string' && item.price.startsWith('$')
        ? parseFloat(item.price.substring(1).replace(/,/g, ''))
        : (typeof item.price === 'number' ? item.price : 0);
      
      return total + price;
    }, 0);
  };
  
  // Remove item from cart
  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Dispatch custom event so the header can update the cart count
    window.dispatchEvent(new Event('cartUpdated'));
  };
  
  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    
    // Show animation and "Order Placed" message
    setOrderPlaced(true);
    
    // Clear cart after a delay
    setTimeout(() => {
      setCartItems([]);
      localStorage.removeItem('cart');
      // Dispatch custom event so the header can update the cart count
      window.dispatchEvent(new Event('cartUpdated'));
    }, 2000);
  };

  return (
    <div className="min-h-screen w-screen bg-black text-white px-6 py-12 overflow-hidden">
      {/* Back Button and Title */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center mb-6 relative">
          <button 
            onClick={onBackClick} 
            className="text-white hover:text-gray-300 transition-colors absolute left-0"
            aria-label="Go back"
          >
            <MdArrowBack className="text-2xl" />
          </button>
          <h1 className="text-3xl font-bold text-center w-full">Your Shopping Cart</h1>
        </div>
      </div>
      
      {/* Order Placed Success Animation */}
      <AnimatePresence>
        {orderPlaced && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-xl p-12 flex flex-col items-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.div
                className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="48" 
                  height="48" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-white"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </motion.svg>
              </motion.div>
              <h2 className="text-black text-2xl font-bold mb-2">Order Placed!</h2>
              <p className="text-gray-600 text-center">
                Thank you for your purchase. Your order has been placed successfully.
              </p>
              <motion.button
                className="mt-6 px-6 py-2 bg-black text-white rounded-lg"
                onClick={() => {
                  setOrderPlaced(false);
                  onBackClick();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue Shopping
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-400">Loading your cart...</p>
          </div>
        ) : cartItems.length === 0 && !orderPlaced ? (
          <div className="bg-gray-900 rounded-xl p-8 text-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <MdShoppingCartCheckout className="text-6xl text-gray-600" />
              <h2 className="text-2xl font-semibold">Your cart is empty</h2>
              <p className="text-gray-400 max-w-md mx-auto">
                Browse our collection and add some beautiful artworks to your cart.
              </p>
              <button 
                onClick={onBackClick}
                className="mt-4 px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : !orderPlaced ? (
          <div>
            {/* Cart Items */}
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg mb-6">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Cart Items ({cartItems.length})</h2>
                
                <div className="divide-y divide-gray-800">
                  {cartItems.map((item) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-4 flex items-center"
                    >
                      {/* Artwork Image */}
                      <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-800 mr-4">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Artwork Details */}
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-gray-400 text-sm">by {item.artist}</p>
                      </div>
                      
                      {/* Price */}
                      <div className="px-4">
                        <p className="font-bold">
                          {typeof item.price === 'number' ? `$${item.price}` : item.price}
                        </p>
                      </div>
                      
                      {/* Remove Button */}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove from cart"
                      >
                        <MdDeleteOutline className="text-xl" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg mb-6">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tax</span>
                    <span>${(calculateTotal() * 0.07).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-800 pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${(calculateTotal() * 1.07).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Checkout Button */}
            <div className="flex justify-end">
              <motion.button 
                onClick={handleCheckout}
                className="px-8 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MdShoppingCartCheckout /> Proceed to Checkout
              </motion.button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ShoppingCart;