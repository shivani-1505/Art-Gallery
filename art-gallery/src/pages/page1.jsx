import React from 'react';
import image2 from '../assets/image4.avif';

const Page1 = ({ onGalleryClick }) => {

  return (
    <div>

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