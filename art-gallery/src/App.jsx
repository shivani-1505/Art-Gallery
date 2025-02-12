import React, { useRef } from 'react';
import ArtSale from './pages/page3';
import ArtGalleryPage from './pages/page2';
import ReviewsPage from './pages/page4';
import Page1 from './pages/page1';


function App() {
  const homeRef = useRef(null);
  const galleryRef = useRef(null);
  const artSaleRef = useRef(null);
  const reviewsRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Home Page */}
      <div ref={homeRef}>
        <Page1 />
      </div>
      {/* Buttons to Scroll Between Sections */}
      <nav style={{ 
        position: 'fixed', 
        top: '10px', 
        right: '20px', 
        zIndex: 1000, 
        background: 'rgba(255, 255, 255, 0.8)', 
        padding: '10px', 
        borderRadius: '10px' 
      }}>
      <button onClick={() => scrollToSection(homeRef)}>Home</button>
      <button onClick={() => scrollToSection(galleryRef)}>Gallery</button>
        <button onClick={() => scrollToSection(artSaleRef)}>Home</button>
        <button onClick={() => scrollToSection(reviewsRef)}>Reviews</button>
      </nav>

      {/* Sections */}
      <div ref={galleryRef}>
        <ArtGalleryPage />
      </div>

      <div ref={artSaleRef}>
        <ArtSale />
      </div>

      <div ref={reviewsRef}>
        <ReviewsPage />
      </div>
    </div>
  );
}

export default App;
