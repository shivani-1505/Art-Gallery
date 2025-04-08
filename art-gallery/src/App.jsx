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
import UserProfile from './pages/UserProfile';
import ShoppingCart from './pages/ShoppingCart';
import AuctionList from './pages/AuctionList';
import AuctionPage from './pages/AuctionPage';

function App() {
  const homeRef = useRef(null);
  const galleryRef = useRef(null);
  const artSaleRef = useRef(null);
  const virtualRef = useRef(null);
  const reviewsRef = useRef(null);
  const faqRef = useRef(null);
  const sections = [homeRef, galleryRef, artSaleRef, virtualRef, reviewsRef, faqRef];
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState('login');
  const [navigationHistory, setNavigationHistory] = useState(['login']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [artistInfo, setArtistInfo] = useState(null);
  const [selectedArtworkId, setSelectedArtworkId] = useState(null);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItemCount(cart.length);
    };
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItemCount(cart.length);
    };
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const handleAddToCart = (artwork) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemIndex = existingCart.findIndex(item => item.id === artwork.id);
    if (itemIndex === -1) {
      const updatedCart = [...existingCart, artwork];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItemCount(updatedCart.length);
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log("Stored User:", storedUser);
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

  const navigateTo = (page) => {
    setNavigationHistory((prev) => [...prev, page]);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop();
      setCurrentPage(newHistory[newHistory.length - 1]);
      setNavigationHistory(newHistory);
    }
  };

  const handleLoginSuccess = (user) => {
    setUserData(user);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(user));
    navigateTo('main');
  };

  const handleLogout = () => {
    setUserData(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    navigateTo('login');
  };

  const goToLogin = () => navigateTo('login');
  const goToSignUp = () => navigateTo('signup');
  const goToUserProfile = () => navigateTo('userProfile');
  const goToArtistProfile = (artist) => {
    setArtistInfo(artist);
    navigateTo('artistProfile');
  };
  const goToArtistsDirectory = () => navigateTo('artistsDirectory');
  const goToFullCatalog = () => navigateTo('catalog');
  const goToGallery = () => navigateTo('gallery');
  const goToCart = () => navigateTo('cart');
  const goToAuctionList = () => navigateTo('auctionList');
  const goToAuctionPage = (artworkId) => {
    setSelectedArtworkId(artworkId);
    navigateTo('auctionPage');
  };

  const showCartButton = currentPage !== 'cart' && currentPage !== 'login' && currentPage !== 'signup' && currentPage !== 'auctionList' && currentPage !== 'auctionPage'; // Updated to hide cart on auctionPage

  console.log("Current Page:", currentPage); // Debug line

  if (currentPage === 'login') {
    console.log("Rendering Login");
    return <Login onLoginSuccess={handleLoginSuccess} onSignupClick={goToSignUp} />;
  }
  if (currentPage === 'signup') {
    console.log("Rendering Signup");
    return <SignUp onBackClick={goBack} onLoginClick={goToLogin} />;
  }
  if (currentPage === 'userProfile') {
    console.log("Rendering UserProfile");
    return (
      <>
        {showCartButton && <CartButton cartItemCount={cartItemCount} onClick={goToCart} />}
        <UserProfile user={userData} onBackClick={goBack} onLogout={handleLogout} />
      </>
    );
  }
  if (currentPage === 'cart') {
    console.log("Rendering ShoppingCart");
    return <ShoppingCart onBackClick={goBack} />;
  }
  if (currentPage === 'catalog') {
    console.log("Rendering FullArtCatalog");
    return (
      <>
        {showCartButton && <CartButton cartItemCount={cartItemCount} onClick={goToCart} />}
        <FullArtCatalog onBackClick={goBack} onArtistClick={goToArtistProfile} onAddToCart={handleAddToCart} />
      </>
    );
  }
  if (currentPage === 'artistProfile') {
    console.log("Rendering ArtistProfile");
    return (
      <>
        {showCartButton && <CartButton cartItemCount={cartItemCount} onClick={goToCart} />}
        <ArtistProfile artist={artistInfo} onBackClick={goBack} onAddToCart={handleAddToCart} />
      </>
    );
  }
  if (currentPage === 'artistsDirectory') {
    console.log("Rendering ArtistsDirectory");
    return (
      <>
        {showCartButton && <CartButton cartItemCount={cartItemCount} onClick={goToCart} />}
        <ArtistsDirectory onBackClick={goBack} onArtistSelect={goToArtistProfile} />
      </>
    );
  }
  if (currentPage === 'gallery') {
    console.log("Rendering GalleryPage");
    return (
      <>
        {showCartButton && <CartButton cartItemCount={cartItemCount} onClick={goToCart} />}
        <GalleryPage onBackClick={goBack} onArtistClick={goToArtistProfile} onAddToCart={handleAddToCart} />
      </>
    );
  }
  if (currentPage === 'auctionList') {
    console.log("Rendering AuctionList");
    return (
      <>
        {showCartButton && <CartButton cartItemCount={cartItemCount} onClick={goToCart} />}
        <AuctionList onBackClick={goBack} onArtworkClick={goToAuctionPage} />
      </>
    );
  }
  if (currentPage === 'auctionPage') {
    console.log("Rendering AuctionPage");
    return (
      <>
        {showCartButton && <CartButton cartItemCount={cartItemCount} onClick={goToCart} />}
        <AuctionPage artworkId={selectedArtworkId} onBackClick={goBack} />
      </>
    );
  }

  console.log("Rendering Main Page");
  return (
    <div>
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        {showCartButton && <CartButton cartItemCount={cartItemCount} onClick={goToCart} />}
        {isLoggedIn && (
          <button
            onClick={goToAuctionList}
            className="bg-gray-800 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition-colors"
            aria-label="Auction list"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 18h14v-2a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2z" /> {/* Hammer head */}
              <path d="M10 6l6 6-6 6V6z" /> {/* Handle */}
            </svg>
          </button>
        )}
        {isLoggedIn && (
          <button
            onClick={goToUserProfile}
            className="bg-gray-800 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition-colors"
            aria-label="User profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        )}
      </div>
      <div ref={homeRef}><Page1 onGalleryClick={goToGallery} /></div>
      <div ref={galleryRef}><ArtGalleryPage onArtistsDirectoryClick={goToArtistsDirectory} /></div>
      <div ref={artSaleRef}><ArtSale onSeeMoreClick={goToFullCatalog} /></div>
      <div ref={virtualRef}><VirtualTour /></div>
      <div ref={reviewsRef}><ReviewsPage /></div>
      <div ref={faqRef}><FAQWebpage /></div>
    </div>
  );
}

const CartButton = ({ cartItemCount, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative bg-gray-800 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition-colors"
      aria-label="Shopping Cart"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      {cartItemCount > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          {cartItemCount > 9 ? '9+' : cartItemCount}
        </div>
      )}
    </button>
  );
};

export default App;