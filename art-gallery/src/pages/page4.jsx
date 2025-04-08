import React, { useState } from 'react';

const ReviewsPage = () => {
  // Initial mock data with more structure to support form functionality
  const [reviews, setReviews] = useState([
    { id: 1, name: "Sarah Johnson", feedback: "The gallery exhibits were breathtaking. I especially loved the modern art section!", stars: 5 },
    { id: 2, name: "Michael Chen", feedback: "Great collection and very informative guides. Will definitely visit again.", stars: 4 },
    { id: 3, name: "Emma Rodriguez", feedback: "The special exhibition was well worth the visit. Beautifully curated.", stars: 5 }
  ]);

  // State for the review form
  const [formData, setFormData] = useState({
    name: '',
    feedback: '',
    stars: 5
  });

  // State to control form visibility
  const [showForm, setShowForm] = useState(false);

  // State for submission message
  const [message, setMessage] = useState('');

  // Simple render stars function
  const renderStars = (rating) => {
    return Array(5).fill('').map((_, i) => (
      <span key={i} style={{color: '#ffd700'}}>
        {i < rating ? '★' : '☆'}
      </span>
    ));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.feedback.trim()) {
      setMessage('Please fill in all fields');
      return;
    }

    // Create new review
    const newReview = {
      id: reviews.length + 1,
      ...formData,
      stars: Number(formData.stars)
    };

    // Add new review and sort by stars
    const updatedReviews = [...reviews, newReview]
      .sort((a, b) => b.stars - a.stars)
      .slice(0, 3); // Keep only top 3 reviews

    // Update reviews and reset form
    setReviews(updatedReviews);
    setFormData({ name: '', feedback: '', stars: 5 });
    setShowForm(false);
    setMessage('Your review has been submitted. Thank you!');

    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div style={{
      background: 'black',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      padding: '20px 0'
    }}>
      <h1 style={{marginBottom: '40px'}}>Customer Reviews</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        width: '90%'
      }}>
        {reviews.map((review) => (
          <div key={review.id} style={{
            background: 'linear-gradient(135deg, white, grey)',
            color: 'black',
            padding: '1.5rem',
            borderRadius: '10px',
            boxShadow: '0 10px 20px rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}>
            <p>{review.feedback}</p>
            <div style={{margin: '1rem 0'}}>
              {renderStars(review.stars)}
            </div>
            <h4>- {review.name}</h4>
          </div>
        ))}
      </div>
      
      {/* Leave a Review Button */}
      <button 
        onClick={() => setShowForm(!showForm)}
        style={{
          margin: '40px 0',
          background: 'white',
          color: 'black',
          border: 'none',
          padding: '0.8rem 1.5rem',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        {showForm ? 'Cancel' : 'Leave a Review'}
      </button>

      {/* Submission Message */}
      {message && (
        <div style={{
          background: message.includes('Thank you') ? '#4caf50' : '#ff6b6b',
          color: 'white',
          padding: '1rem',
          borderRadius: '4px',
          margin: '20px 0',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}
      
      {/* Review Form */}
      {showForm && (
        <form 
          onSubmit={handleSubmit}
          style={{
            background: '#333',
            padding: '2rem',
            borderRadius: '10px',
            width: '90%',
            maxWidth: '500px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <input 
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.8rem',
              margin: '0.5rem 0',
              borderRadius: '4px',
              border: '1px solid #555',
              background: '#222',
              color: 'white'
            }}
          />
          <textarea 
            name="feedback"
            placeholder="Your Feedback"
            value={formData.feedback}
            onChange={handleInputChange}
            required
            rows="4"
            style={{
              width: '100%',
              padding: '0.8rem',
              margin: '0.5rem 0',
              borderRadius: '4px',
              border: '1px solid #555',
              background: '#222',
              color: 'white'
            }}
          />
          <select 
            name="stars"
            value={formData.stars}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '0.8rem',
              margin: '0.5rem 0',
              borderRadius: '4px',
              border: '1px solid #555',
              background: '#222',
              color: 'white'
            }}
          >
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          <button 
            type="submit"
            style={{
              background: 'white',
              color: 'black',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
              margin: '1rem 0',
              fontSize: '1rem'
            }}
          >
            Submit Review
          </button>
        </form>
      )}
      
      <footer style={{
        background: '#111',
        color: '#ccc',
        textAlign: 'center',
        width: '100%',
        borderTop: '1px solid #444',
        fontSize: '1rem',
        padding: '10px 0',
        marginTop: 'auto'
      }}>
        <p style={{margin: '0.5rem 0'}}>© 2025 Art Gallery. All rights reserved.</p>
        <p style={{margin: '0.5rem 0'}}>
          <a href="#privacy" style={{color: '#ffd700', textDecoration: 'none', fontWeight: 'bold', marginLeft: '10px'}}>Privacy Policy</a> | 
          <a href="#terms" style={{color: '#ffd700', textDecoration: 'none', fontWeight: 'bold', marginLeft: '10px'}}>Terms of Use</a>
        </p>
      </footer>
    </div>
  );
};

export default ReviewsPage;