import React, { useRef } from 'react';
import ArtSale from './pages/page3';
import ArtGalleryPage from './pages/page2';
import ReviewsPage from './pages/page4';


function App() {
  const galleryRef = useRef(null);
  const artSaleRef = useRef(null);
  const reviewsRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Buttons to Scroll Between Sections */}
      <nav>
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
