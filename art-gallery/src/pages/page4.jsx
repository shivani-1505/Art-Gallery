import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from "../firebase/firebaseConfig"; // Import the Firestore db

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const hoverAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const PageContainer = styled.div`
  background: black;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 2rem 1rem;
  background: url('./src/images/art-museum.jpg') no-repeat center center/cover;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: center;
  width: 100%;
  max-width: 1200px;
  padding: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    width: 90%;
  }
`;

const ReviewBox = styled.div`
  background: linear-gradient(135deg, white, grey);
  color: black;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  text-align: center;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease forwards, ${hoverAnimation} 3s infinite ease-in-out;
  animation-delay: ${props => props.delay * 0.2}s;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 25px rgb(255, 255, 255);
  }

  p {
    font-size: 1rem;
    
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }

  h4 {
    margin-top: 0.5rem;
    font-size: 1.1rem;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const StarRating = styled.div`
  color: #ffd700;
  margin: 1rem 0;
  font-size: 1.2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const LeaveReviewButton = styled.button`
  position: relative;
  margin-top: 2rem;
  background: white;
  color: black;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background: #ffd700;
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const Footer = styled.footer`
  background: #111;
  color: #ccc;
  text-align: center;
  width: 100%;
  border-top: 1px solid #444;
  font-size: 1rem;
  padding: 15px 10px;
  position: relative;

  a {
    color: #ffd700;
    text-decoration: none;
    font-weight: bold;
    margin-left: 10px;
    
    &:hover {
      text-decoration: underline;
      color: white;
    }
  }

  p {
    margin: 0.5rem 0;
    
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

const FeedbackForm = styled.form`
  width: 90%;
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #333;
  border-radius: 10px;
  color: white;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1rem auto;
  }

  h2 {
    text-align: center;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  input, textarea, select {
    width: 100%;
    padding: 0.8rem;
    margin: 0.5rem 0;
    border: 1px solid #555;
    border-radius: 4px;
    background: #222;
    color: white;
    font-size: 1rem;
    
    @media (max-width: 768px) {
      padding: 0.7rem;
      font-size: 0.9rem;
    }
  }

  button {
    background: white;
    color: black;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
    font-weight: bold;
    transition: background 0.3s ease;
    display: block;
    margin-left: auto;
    margin-right: auto;
    
    &:hover {
      background: #ffd700;
    }
    
    @media (max-width: 768px) {
      padding: 0.7rem 1.2rem;
      font-size: 0.9rem;
    }
  }
`;

const MessageBox = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
  text-align: center;
  background: ${props => props.error ? '#ff6b6b' : '#4caf50'};
  color: white;
  width: 90%;
  max-width: 600px;
  
  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
`;

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ name: '', feedback: '', stars: 5 });
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Fetch reviews from Firebase
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const reviewsQuery = query(
          collection(db, "reviews"), 
          orderBy("stars", "desc"),
          limit(3)
        );
        
        const querySnapshot = await getDocs(reviewsQuery);
        const reviewsList = [];
        
        querySnapshot.forEach((doc) => {
          reviewsList.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        setReviews(reviewsList);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Could not load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setMessage('');
      
      // Form validation
      if (!formData.name.trim() || !formData.feedback.trim()) {
        setError('Please fill in all fields');
        return;
      }
      
      // Add document to Firestore
      const docRef = await addDoc(collection(db, "reviews"), {
        name: formData.name,
        feedback: formData.feedback,
        stars: Number(formData.stars),
        timestamp: new Date()
      });
      
      console.log("Review added with ID: ", docRef.id);
      
      // Update local state with new review
      const newReview = {
        id: docRef.id,
        name: formData.name,
        feedback: formData.feedback,
        stars: Number(formData.stars)
      };
      
      // Update reviews array with new review and sort by stars
      const updatedReviews = [...reviews, newReview]
        .sort((a, b) => b.stars - a.stars)
        .slice(0, 3);
      
      setReviews(updatedReviews);
      setFormData({ name: '', feedback: '', stars: 5 });
      setMessage('Your review has been submitted. Thank you!');
      setShowForm(false);
    } catch (err) {
      console.error("Error adding review: ", err);
      setError('Failed to submit your review. Please try again.');
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i}>{i < rating ? '★' : '☆'}</span>
    ));
  };

  const handleStarsChange = (e) => {
    setFormData({...formData, stars: parseInt(e.target.value)});
  };

  return (
    <PageContainer>
      <ReviewsContainer>
        {loading ? (
          <p>Loading reviews...</p>
        ) : (
          <ReviewsGrid>
            {reviews.length > 0 ? (
              reviews.map((review, i) => (
                <ReviewBox key={review.id} delay={i}>
                  <p>{review.feedback}</p>
                  <StarRating>{renderStars(review.stars)}</StarRating>
                  <h4>- {review.name}</h4>
                </ReviewBox>
              ))
            ) : (
              <p>No reviews yet. Be the first to leave a review!</p>
            )}
          </ReviewsGrid>
        )}

        <LeaveReviewButton onClick={() => setShowForm(true)}>
          Leave a Review
        </LeaveReviewButton>
      </ReviewsContainer>

      {message && <MessageBox>{message}</MessageBox>}
      {error && <MessageBox error>{error}</MessageBox>}

      {showForm && (
        <FeedbackForm onSubmit={handleSubmit}>
          <h2>Leave Your Feedback</h2>
          <input 
            type="text" 
            placeholder="Your Name" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />
          <textarea 
            placeholder="Your Feedback" 
            rows="4" 
            value={formData.feedback} 
            onChange={(e) => setFormData({...formData, feedback: e.target.value})} 
            required 
          />
          <select 
            value={formData.stars} 
            onChange={handleStarsChange}
          >
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          <button type="submit">Submit Review</button>
        </FeedbackForm>
      )}

      <Footer>
        <p>© 2025 Art Gallery. All rights reserved.</p>
        <p>
          <a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Use</a>
        </p>
      </Footer>
    </PageContainer>
  );
};

export default ReviewsPage;