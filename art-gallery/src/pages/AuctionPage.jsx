import React, { useState, useEffect } from "react";
import { database, ref, set, onValue, update } from "../firebase/firebase.js"; // Adjust path if needed
import "../styles/AuctionPage.css"; // Adjust path if CSS is in a styles folder

const AuctionPage = ({ artworkId, onBackClick }) => {
  const [artwork, setArtwork] = useState(null);
  const [auctionEndTime, setAuctionEndTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [highestBid, setHighestBid] = useState(100);
  const [highestBidder, setHighestBidder] = useState("No bids yet");
  const [newBid, setNewBid] = useState("");
  const [auctionEnded, setAuctionEnded] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", email: "", phone: "" });
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const artworkRef = ref(database, `artworks/${artworkId}`);
    const auctionRef = ref(database, `auctions/${artworkId}`);

    onValue(artworkRef, (snapshot) => {
      setArtwork(snapshot.val());
    });

    onValue(auctionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setHighestBid(data.highestBid);
        setHighestBidder(data.highestBidder);
        setAuctionEndTime(data.endTime);
        setAuctionEnded(data.auctionEnded || false);
      }
    });
  }, [artworkId]);

  useEffect(() => {
    if (!auctionEndTime) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const remainingTime = auctionEndTime - now;

      if (remainingTime <= 0) {
        setTimeLeft("Auction Ended");
        setAuctionEnded(true);
        clearInterval(interval);
        endAuction();
      } else {
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [auctionEndTime]);

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (userDetails.name && userDetails.email && userDetails.phone) {
      setIsRegistered(true);
    } else {
      alert("Please enter all details before proceeding.");
    }
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const bidAmount = parseFloat(newBid);

    if (!isRegistered) {
      alert("Please enter your details before placing a bid.");
      return;
    }

    if (userDetails.name === highestBidder) {
      alert("You are already the highest bidder. You cannot bid against yourself.");
      return;
    }

    if (isNaN(bidAmount) || bidAmount <= highestBid) {
      alert("Your bid must be higher than the current highest bid!");
      return;
    }

    update(ref(database, `auctions/${artworkId}`), {
      highestBid: bidAmount,
      highestBidder: userDetails.name,
    });

    setNewBid("");
  };

  const endAuction = () => {
    update(ref(database, `auctions/${artworkId}`), {
      auctionEnded: true,
      winnerMessage:
        highestBidder === "No bids yet"
          ? "❌ No one has won the auction."
          : `🎉 ${highestBidder} has won the auction with a bid of $${highestBid}! 🎉`,
    });
  };

  if (!artwork) return <p>Loading...</p>;

  return (
    <div className="auction-container">
      <button className="return-button" onClick={onBackClick}>
        ⬅️ Back
      </button>

      {!isRegistered ? (
        <div className="user-registration">
          <h2>Enter Your Details</h2>
          <form onSubmit={handleUserSubmit}>
            <input
              type="text"
              placeholder="Enter your name"
              value={userDetails.name}
              onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={userDetails.phone}
              onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
              required
            />
            <button type="submit">Join Auction</button>
          </form>
        </div>
      ) : (
        <div className="auction-item">
          <img className="auction-image" src={artwork.image} alt={artwork.title} />
          <div className="auction-details">
            <h2 className="auction-title">{artwork.title}</h2>
            <p className="auction-description">{artwork.description}</p>
            <div className="timer">{auctionEnded ? "Auction Ended" : `Time Left: ${timeLeft}`}</div>
            <div className="bid-section">
              <p className="highest-bid">Highest Bid: ${highestBid}</p>
              <p>Highest Bidder: {highestBidder}</p>

              {!auctionEnded ? (
                <form className="bid-form" onSubmit={handleBidSubmit}>
                  <input
                    type="number"
                    className="bid-input"
                    placeholder="Enter your bid"
                    value={newBid}
                    onChange={(e) => setNewBid(e.target.value)}
                    required
                    disabled={auctionEnded}
                  />
                  <button type="submit" className="bid-button" disabled={auctionEnded}>
                    Place Bid
                  </button>
                </form>
              ) : (
                <p className="congrats-message">
                  {highestBidder === "No bids yet"
                    ? "❌ No one has won the auction."
                    : `🎉 ${highestBidder} has won the auction with a bid of $${highestBid}! 🎉`}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionPage;