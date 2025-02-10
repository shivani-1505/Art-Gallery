import { useState } from 'react';
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

const Header = styled.header`
  background: white;
  color: black;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 1220px;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 1.5rem;

  a {
    color: black;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = styled.footer`
  background: black;
  color: white;
  padding: 2rem;
  text-align: center;
  border-top: 1px solid white;
  width: 100%;
`;

const ReviewsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: url('./src/images/art-museum.jpg') no-repeat center center/cover;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: 100%;
  max-width: 1200px;
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: center;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BottomReviews = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;
  flex-wrap: wrap;
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

const FeedbackForm = styled.form`
  max-width: 600px;
  margin: 4rem auto;
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
  { id: 1, name: 'Sarah J.', comment: 'Absolutely breathtaking collection! Every piece tells a unique story, and I found myself lost in the artistry and emotions behind them. A must-visit for art lovers!', rating: 5 },
  { id: 2, name: 'Michael R.', comment: 'The curation is exceptional. Each section flows beautifully into the next, creating a seamless and immersive experience. The blend of contemporary and classic works is truly impressive.', rating: 4 },
  { id: 3, name: 'Emma W.', comment: 'A truly immersive experience. The lighting, layout, and ambiance make it feel like you are stepping into another world. I could spend hours here just admiring the craftsmanship.', rating: 5 },
  { id: 4, name: 'David K.', comment: 'Innovative and thought-provoking. The use of digital art alongside traditional paintings creates a fascinating contrast that challenges conventional perspectives.', rating: 4 },
  { id: 5, name: 'Lily S.', comment: 'Will definitely visit again! The gallery is a treasure trove of creativity, and each visit brings new insights. The staff is also very knowledgeable and helpful.', rating: 5 },
];

const ReviewsPage = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [formData, setFormData] = useState({ name: '', email: '', comment: '', rating: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      id: reviews.length + 1,
      name: formData.name,
      comment: formData.comment,
      rating: formData.rating
    };
    setReviews([...reviews, newReview]);
    setFormData({ name: '', email: '', comment: '', rating: 0 });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i}>{i < rating ? '★' : '☆'}</span>
    ));
  };

  return (
    <PageContainer>
      <Header>
        <div>Art Gallery</div>
        <NavLinks>
          <a href="#about">About</a>
          <a href="#exhibitions">Exhibitions</a>
          <a href="#contact">Contact</a>
        </NavLinks>
      </Header>
      
      <ReviewsContainer>
        <ReviewsGrid>
          {reviews.slice(0, 3).map((review, i) => (
            <ReviewBox key={review.id} delay={i % 3}>
              <p>{review.comment}</p>
              <StarRating>{renderStars(review.rating)}</StarRating>
              <h4>- {review.name}</h4>
            </ReviewBox>
          ))}
        </ReviewsGrid>
        <BottomReviews>
          {reviews.slice(3).map((review, i) => (
            <ReviewBox key={review.id} delay={i % 3}>
              <p>{review.comment}</p>
              <StarRating>{renderStars(review.rating)}</StarRating>
              <h4>- {review.name}</h4>
            </ReviewBox>
          ))}
        </BottomReviews>
      </ReviewsContainer>

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
          value={formData.comment}
          onChange={(e) => setFormData({...formData, comment: e.target.value})}
          required
        />
        <button type="submit">Submit Review</button>
      </FeedbackForm>

      <Footer>
        © 2025 Art Gallery. All rights reserved.
      </Footer>
    </PageContainer>
  );
};

export default ReviewsPage;
