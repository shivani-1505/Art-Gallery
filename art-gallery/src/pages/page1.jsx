import React, { useState, useEffect } from 'react';
import image2 from '../assets/image4.avif';

const Page1 = ({ onGalleryClick, onCartClick }) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  
  // Update cart count on mount and when localStorage changes
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItemCount(cart.length);
    };
    
    // Initial count
    updateCartCount();
    
    // Listen for storage events (when cart is updated in other tabs)
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);
  
  return (
    <div>
      {/* Header with Cart Icon */}
      {onCartClick && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={onCartClick}
            className="relative bg-black bg-opacity-50 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-colors"
            aria-label="Shopping Cart"
          >
            {/* Shopping Cart Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            
            {/* Item Count Badge */}
            {cartItemCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartItemCount > 9 ? '9+' : cartItemCount}
              </div>
            )}
          </button>
        </div>
      )}
      
      {/* Hero Section */}
      <header 
        style={{
          backgroundImage: `url(${image2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textAlign: 'center',
          marginTop: 0 // Ensure no extra space at top
        }}
      >
        {/* Dark Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 1, 0.5)',
          zIndex: -1
        }}></div>
        {/* Hero Content */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '700px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginTop: '450px' }}>
            Dive into creativity with our gallery collection
          </h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.5', marginTop: '20px'}}>
            Immerse yourself in the captivating stories behind each artwork, as our artists draw inspiration from cultures, nature, and everyday life.
          </p>
          <div style={{ marginTop: '15px' }}> {/* Moved button down */}
            <button 
              style={{
                padding: '10px 25px',
                fontSize: '1.0rem',
                backgroundColor: 'white',
                color: 'black',
                border: 'black',
                borderRadius: '21px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: '0.3s'
              }}
              onClick={onGalleryClick}
              onMouseOver={(e) => e.target.style.backgroundColor = '#ddd'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}>
              Visit Gallery
            </button>
          </div>
        </div>
        {/* Navigation Buttons */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          display: 'flex',
          gap: '10px'
        }}>
          <button style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            &#10094;
          </button>
          <button style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'gray',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            &#10095;
          </button>
        </div>
      </header>
    </div>
  );
};

export default Page1;