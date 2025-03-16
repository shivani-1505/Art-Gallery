import React, { useRef, useState, useEffect } from 'react';
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
import Navigation from './components/Navigation';

function App() {
  const homeRef = useRef(null);
  const galleryRef = useRef(null);
  const artSaleRef = useRef(null);
  const virtualRef = useRef(null);
  const reviewsRef = useRef(null);
  const faqRef = useRef(null);
  
  // References to all sections for navigation
  const sections = [homeRef, galleryRef, artSaleRef, virtualRef, reviewsRef, faqRef];
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  
  // State to control which page is visible
  const [currentPage, setCurrentPage] = useState('main');
  
  // State to track navigation history
  const [navigationHistory, setNavigationHistory] = useState(['main']);
  
  // State to store artist profile information
  const [artistInfo, setArtistInfo] = useState({
    name: '',
    artworks: []
  });

  // Function to navigate to a new page
  const navigateTo = (page) => {
    setNavigationHistory(prev => [...prev, page]);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Function to go back to the previous page
  const goBack = () => {
    if (navigationHistory.length > 1) {
      // Create a copy of history without the current page
      const newHistory = [...navigationHistory];
      newHistory.pop(); // Remove current page
      
      // Set the current page to the previous page
      setCurrentPage(newHistory[newHistory.length - 1]);
      setNavigationHistory(newHistory);
      
      // If returning to main page, scroll to appropriate section
      if (newHistory[newHistory.length - 1] === 'main') {
        const sectionMap = {
          'catalog': artSaleRef,
          'artistsDirectory': galleryRef
        };
        
        // Find the section to scroll to based on where we came from
        const sectionRef = sectionMap[currentPage];
        if (sectionRef) {
          setTimeout(() => {
            sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    }
  };

  // Function to navigate to previous section
  const goToPreviousSection = () => {
    if (currentPage !== 'main') {
      // If not on main page, go back to previous page
      goBack();
      return;
    }
    
    // If on main page, navigate between sections
    if (currentSectionIndex > 0) {
      const newIndex = currentSectionIndex - 1;
      setCurrentSectionIndex(newIndex);
      sections[newIndex].current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to navigate to next section
  const goToNextSection = () => {
    if (currentPage !== 'main') {
      // If not on main page, stay on the current page
      // You could implement forward navigation if tracking full history
      return;
    }
    
    // If on main page, navigate between sections
    if (currentSectionIndex < sections.length - 1) {
      const newIndex = currentSectionIndex + 1;
      setCurrentSectionIndex(newIndex);
      sections[newIndex].current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (ref, index) => {
    if (currentPage === 'main') {
      setCurrentSectionIndex(index);
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on main page, navigate back to main and then to the section
      setNavigationHistory(['main']);
      setCurrentPage('main');
      setTimeout(() => {
        setCurrentSectionIndex(index);
        ref.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Function to navigate to full catalog page
  const goToFullCatalog = () => {
    navigateTo('catalog');
  };

  // Function to navigate to artist profile
  const goToArtistProfile = (artistName, artworks) => {
    setArtistInfo({
      name: artistName,
      artworks: artworks
    });
    navigateTo('artistProfile');
  };

  // Function to navigate to artists directory
  const goToArtistsDirectory = () => {
    navigateTo('artistsDirectory');
  };
  
  // Function to navigate to the gallery page
  const goToGallery = () => {
    navigateTo('gallery');
  };

  // Render specific pages
  if (currentPage === 'catalog') {
    return (
      <>
        <div>
          <FullArtCatalog onBackClick={goBack} onArtistClick={goToArtistProfile} />
        </div>
      </>
    );
  } else if (currentPage === 'artistProfile') {
    return (
      <>
        <div>
          <ArtistProfile 
            onBackClick={goBack}
            artistName={artistInfo.name} 
            artworks={artistInfo.artworks} 
          />
        </div>
      </>
    );
  } else if (currentPage === 'artistsDirectory') {
    return (
      <>
        <div>
          <ArtistsDirectory 
            onBackClick={goBack}
            onArtistSelect={goToArtistProfile}
          />
        </div>
      </>
    );
  } else if (currentPage === 'gallery') {
    return (
      <>
        <div>
          <GalleryPage
            onBackClick={goBack}
            onArtistClick={goToArtistProfile}
          />
        </div>
      </>
    );
  }

  // Main page with all sections
  return (
    <div>
      
      {/* Home Page */}
      <div ref={homeRef}>
        <Page1 onGalleryClick={goToGallery} />
      </div>
      
      {/* Removed floating navigation bar */}

      {/* Sections */}
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