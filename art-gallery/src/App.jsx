import React, { useRef, useState } from 'react';
import ArtSale from './pages/page3';
import ArtGalleryPage from './pages/page2';
import ReviewsPage from './pages/page4';
import Page1 from './pages/page1';
import FAQWebpage from './pages/page5';
import VirtualTour from './pages/page6';
import FullArtCatalog from './pages/FullArtCatalog';
import ArtistProfile from './pages/ArtistProfile';
import ArtistsDirectory from './pages/ArtistDirectory';
import GalleryPage from './pages/GalleryPage';

function App() {
  const homeRef = useRef(null);
  const galleryRef = useRef(null);
  const artSaleRef = useRef(null);
  const virtualRef = useRef(null);
  const reviewsRef = useRef(null);
  const faqRef = useRef(null);

  const sections = [homeRef, galleryRef, artSaleRef, virtualRef, reviewsRef, faqRef];
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState('main');
  const [navigationHistory, setNavigationHistory] = useState(['main']);

  // State to store selected artist details
  const [artistInfo, setArtistInfo] = useState(null);

  // Function to navigate to a new page
  const navigateTo = (page) => {
    setNavigationHistory((prev) => [...prev, page]);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Function to go back to the previous page
  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop();
      setCurrentPage(newHistory[newHistory.length - 1]);
      setNavigationHistory(newHistory);
    }
  };

  // Function to navigate to artist profile with complete artist data
  const goToArtistProfile = (artist) => {
    setArtistInfo(artist); // Save all artist details, including biography and famous artworks
    navigateTo('artistProfile');
  };

  // Function to navigate to artists directory
  const goToArtistsDirectory = () => {
    navigateTo('artistsDirectory');
  };

  // Function to navigate to full catalog
  const goToFullCatalog = () => {
    navigateTo('catalog');
  };

  // Function to navigate to the gallery page
  const goToGallery = () => {
    navigateTo('gallery');
  };

  // Render specific pages based on currentPage state
  if (currentPage === 'catalog') {
    return <FullArtCatalog onBackClick={goBack} onArtistClick={goToArtistProfile} />;
  }

  if (currentPage === 'artistProfile') {
    return <ArtistProfile artist={artistInfo} onBackClick={goBack} />;
  }

  if (currentPage === 'artistsDirectory') {
    return <ArtistsDirectory onBackClick={goBack} onArtistSelect={goToArtistProfile} />;
  }

  if (currentPage === 'gallery') {
    return <GalleryPage onBackClick={goBack} onArtistClick={goToArtistProfile} />;
  }

  // Main page with all sections
  return (
    <div>
      <div ref={homeRef}>
        <Page1 onGalleryClick={goToGallery} />
      </div>
      <div ref={galleryRef}>
        <ArtGalleryPage onArtistsDirectoryClick={goToArtistsDirectory} />
      </div>
      <div ref={artSaleRef}>
        <ArtSale onSeeMoreClick={goToFullCatalog} />
      </div>
      <div ref={virtualRef}>
        <VirtualTour />
      </div>
      <div ref={reviewsRef}>
        <ReviewsPage />
      </div>
      <div ref={faqRef}>
        <FAQWebpage />
      </div>
    </div>
  );
}

export default App;
