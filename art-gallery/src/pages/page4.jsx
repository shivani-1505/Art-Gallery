import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

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
  width: 100vw;
  margin: 0;
  padding: 0;
`;

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: url('./src/images/art-museum.jpg') no-repeat center center/cover;
  position: relative;
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: center;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ReviewBox = styled.div`
  background: linear-gradient(135deg, white, grey);
  color: black;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
  width: 300px;
  text-align: center;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease forwards, ${hoverAnimation} 3s infinite ease-in-out;
  animation-delay: ${props => props.delay * 0.2}s;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 25px rgb(255, 255, 255);
  }
`;

const StarRating = styled.div`
  color: #ffd700;
  margin: 1rem 0;
`;

const LeaveReviewButton = styled.button`
  position: absolute;
  bottom: 20px;
  background: white;
  color: black;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #ffd700;
  }
`;

const Footer = styled.footer`
  background: #111;
  color: #ccc;
  text-align: center;
  width: 100%;
  border-top: 1px solid #444;
  font-size: 1rem;
  padding: 10px 0;
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
  }
`;

const FeedbackForm = styled.form`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #333;
  border-radius: 10px;
  color: white;

  input, textarea {
    width: calc(100% - 2rem);
    padding: 0.8rem;
    margin: 0.5rem 0;
    border: 1px solid #555;
    border-radius: 4px;
    background: #222;
    color: white;
  }

  button {
    background: white;
    color: black;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
  }
`;

const initialReviews = [
  { id: 1, name: 'Sarah J.', comment: 'Absolutely breathtaking collection!', rating: 5 },
  { id: 2, name: 'Michael R.', comment: 'The curation is exceptional.', rating: 4 },
  { id: 3, name: 'Emma W.', comment: 'A truly immersive experience.', rating: 5 },
];

const ReviewsPage = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [formData, setFormData] = useState({ name: '', comment: '', rating: 0 });
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const isLoggedIn = false; // Change this to true when the user is authenticated

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setReviews([...reviews, { id: reviews.length + 1, name: formData.name, comment: formData.comment, rating: formData.rating }]);
      setFormData({ name: '', comment: '', rating: 0 });
      setMessage('Your review has been recorded. Thank you!');
      setShowForm(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i}>{i < rating ? '★' : '☆'}</span>
    ));
  };

  return (
    <PageContainer>
      <ReviewsContainer>
        <ReviewsGrid>
          {reviews.map((review, i) => (
            <ReviewBox key={review.id} delay={i}>
              <p>{review.comment}</p>
              <StarRating>{renderStars(review.rating)}</StarRating>
              <h4>- {review.name}</h4>
            </ReviewBox>
          ))}
        </ReviewsGrid>

        <LeaveReviewButton onClick={() => setShowForm(true)}>
          Leave a Review
        </LeaveReviewButton>
      </ReviewsContainer>

      {message && <p>{message}</p>}

      {showForm && (
        <FeedbackForm onSubmit={handleSubmit}>
          <h2>Leave Your Feedback</h2>
          <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <textarea placeholder="Your Feedback" rows="4" value={formData.comment} onChange={(e) => setFormData({...formData, comment: e.target.value})} required />
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
