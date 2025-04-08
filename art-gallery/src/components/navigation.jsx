import React from 'react';

const Navigation = ({ onPrevious, onNext }) => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 50px',
      background: '#fff',
      color: '#000',
      position: 'fixed',
      width: '100%',
      top: 0,
      left: 0,
      zIndex: 1000
    }}>
      {/* Left-aligned navigation buttons */}
      <div style={{
        display: 'flex',
        gap: '10px'
      }}>
        <button 
          onClick={onPrevious}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: '0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'}
        >
          &#10094;
        </button>
        <button 
          onClick={onNext}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: '0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'}
        >
          &#10095;
        </button>
      </div>
      
      {/* Centered Title */}
      <h1 style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        margin: 0,
        fontSize: '1.8rem'
      }}>ArtVista</h1>

      {/* Right-aligned login/signup */}
      <div style={{ display: 'flex', gap: '15px' }}>
        {['Login', 'Sign Up'].map((item) => (
          <a key={item} href="#" style={{
            textDecoration: 'none', color: '#000', fontWeight: 500, transition: '0.3s', cursor: 'pointer'
          }}
            onMouseOver={(e) => e.target.style.color = '#555'}
            onMouseOut={(e) => e.target.style.color = '#000'}>{item}</a>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;