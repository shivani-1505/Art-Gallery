import React, { useRef } from 'react';
import ArtSale from './pages/page3';
import ArtGalleryPage from './pages/page2';
import ReviewsPage from './pages/page4';
import Page1 from './pages/page1';
import FAQWebpage from './pages/page5'; // Import your new page

function App() {
  const homeRef = useRef(null);
  const galleryRef = useRef(null);
  const artSaleRef = useRef(null);
  const reviewsRef = useRef(null);
  const faqRef = useRef(null); // Create ref for FAQ page

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
      <nav>
        <button onClick={() => scrollToSection(homeRef)}>Home</button>
        <button onClick={() => scrollToSection(galleryRef)}>Gallery</button>
        <button onClick={() => scrollToSection(artSaleRef)}>Art Sale</button>
        <button onClick={() => scrollToSection(reviewsRef)}>Reviews</button>
        <button onClick={() => scrollToSection(faqRef)}>FAQ</button> {/* Button to navigate to FAQ page */}
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

      <div ref={faqRef}> {/* Your new FAQ page section */}
        <FAQWebpage />
      </div>
    </div>
  );
}

export default App;
