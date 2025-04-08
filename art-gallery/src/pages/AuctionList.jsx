import React, { useState, useEffect } from "react";
import { database, ref, onValue } from "../firebase/firebase.js"; // Adjust path if needed
import "../styles/AuctionList.css"; // Adjust path if CSS is in a styles folder

const AuctionList = ({ onBackClick, onArtworkClick }) => {
  const [artworks, setArtworks] = useState([]);
  const [auctions, setAuctions] = useState({});
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const artworksRef = ref(database, "artworks");
    const auctionsRef = ref(database, "auctions");

    onValue(artworksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setArtworks(Object.entries(data).map(([id, details]) => ({ id, ...details })));
      }
    });

    onValue(auctionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAuctions(data);
      }
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeArtworks = artworks.filter(
    (artwork) =>
      auctions[artwork.id] &&
      !auctions[artwork.id].auctionEnded &&
      currentTime < auctions[artwork.id].endTime
  );

  return (
    <div className="auction-list-container">
      <button className="back-button" onClick={onBackClick}>
        ⬅️ Back
      </button>
      <h1>Available Artworks for Auction</h1>
      <div className="artworks-grid">
        {activeArtworks.length > 0 ? (
          activeArtworks.map((artwork) => (
            <div key={artwork.id} className="artwork-card">
              <img src={artwork.image} alt={artwork.title} className="artwork-image" />
              <h3>{artwork.title}</h3>
              <p>Start Time: {new Date(artwork.startTime).toLocaleString()}</p>
              <p className="status">
                {currentTime >= artwork.startTime ? "🔴 Auction has started" : "⏳ Auction not started"}
              </p>
              {currentTime >= artwork.startTime && (
                <button onClick={() => onArtworkClick(artwork.id)}>Join Auction</button>
              )}
            </div>
          ))
        ) : (
          <p>No active auctions at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default AuctionList;