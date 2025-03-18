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
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile'; // You'll need to create this

function App() {
  const homeRef = useRef(null);
  const galleryRef = useRef(null);
  const artSaleRef = useRef(null);
  const virtualRef = useRef(null);
  const reviewsRef = useRef(null);
  const faqRef = useRef(null);

  const sections = [homeRef, galleryRef, artSaleRef, virtualRef, reviewsRef, faqRef];
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState('login'); // Start with login page
  const [navigationHistory, setNavigationHistory] = useState(['login']);
  
  // User-related state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Check if user is already logged in from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
        setIsLoggedIn(true);
        setCurrentPage('main');
        setNavigationHistory(['main']);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem('user');
      }
    }
  }, []);

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

  // Function to handle successful login
  const handleLoginSuccess = (user) => {
    setUserData(user);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(user)); // Store user data
    navigateTo('main');
  };

  // Function to handle logout
  const handleLogout = () => {
    setUserData(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user'); // Clear stored user data
    navigateTo('login');
  };

  // Function to navigate to login page
  const goToLogin = () => {
    navigateTo('login');
  };

  // Function to navigate to signup page
  const goToSignUp = () => {
    navigateTo('signup');
  };

  // Function to navigate to user profile
  const goToUserProfile = () => {
    navigateTo('userProfile');
  };

  // Function to navigate to artist profile with complete artist data
  const goToArtistProfile = (artist) => {
    setArtistInfo(artist);
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

  // Render login page
  if (currentPage === 'login') {
    return <Login 
      onLoginSuccess={handleLoginSuccess}
      onSignupClick={goToSignUp}
    />;
  }

  // Render signup page
  if (currentPage === 'signup') {
    return <SignUp 
      onBackClick={goBack}
      onLoginClick={goToLogin}
    />;
  }

  // Render user profile page
  if (currentPage === 'userProfile') {
    return <UserProfile 
      user={userData}
      onBackClick={goBack}
      onLogout={handleLogout}
    />;
  }

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

  // Main page with all sections and user info in header
  return (
    <div>
      {/* User Profile Navigation in Header */}
      <div className="fixed top-0 right-0 m-4 z-50 flex items-center gap-3">
        {isLoggedIn && (
          <>
            <span className="text-white bg-gray-800 px-3 py-1 rounded-lg">
              Welcome, {userData?.name || 'User'}
            </span>
            <button 
              onClick={goToUserProfile}
              className="bg-gray-800 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              {/* User icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
          </>
        )}
      </div>
      
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