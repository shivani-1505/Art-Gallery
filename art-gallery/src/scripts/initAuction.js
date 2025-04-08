const { database, ref, update } = require("./firebase");

const auctionData = {
  artworks: {
    "artwork1": {
      title: "Echoes of Antiquity",
      description: "...",
      image: "/img1.png",
      startTime: new Date("2025-04-10T11:30:00").getTime(),
    },
    "artwork2": {
      title: "Modern Abstract",
      description: "...",
      image: "/img2.png",
      startTime: new Date("2025-04-11T12:00:00").getTime(),
    },
    "artwork3": {
      title: "Violin Serenade",
      description: "...",
      image: "/img3.png",
      startTime: new Date("2025-04-12T15:00:00").getTime(),
    },
    "artwork4": {
      title: "Golden Horizon",
      description: "...",
      image: "/img4.png",
      startTime: new Date("2025-04-13T10:00:00").getTime(),
    },
    "artwork5": {
      title: "SilReflectionsent",
      description: "...",
      image: "/img5.png",
      startTime: new Date("2025-04-14T14:30:00").getTime(),
    },
    "artwork6": {
      title: "The Enchanted Forest",
      description: "...",
      image: "/img6.png",
      startTime: new Date("2025-04-15T09:45:00").getTime(),
    },
    "artwork7": {
      title: "Celestial Dreams",
      description: "...",
      image: "/img7.png",
      startTime: new Date("2025-04-16T13:15:00").getTime(),
    },
    "artwork8": {
      title: "Whispers of Time",
      description: "...",
      image: "/img8.png",
      startTime: new Date("2025-04-17T11:00:00").getTime(),
    },
    "artwork9": {
      title: "Melody of the Rain",
      description: "...",
      image: "/img9.png",
      startTime: new Date("2025-04-18T17:45:00").getTime(),
    },
  },
  auctions: {
    "artwork1": {
      highestBid: 100,
      highestBidder: "No bids yet",
      endTime: new Date("2025-04-10T16:45:00").getTime(),
      auctionEnded: false,
    },
    "artwork2": {
      highestBid: 200,
      highestBidder: "No bids yet",
      endTime: new Date("2025-04-11T20:00:00").getTime(),
      auctionEnded: false,
    },
    "artwork3": {
      highestBid: 150,
      highestBidder: "No bids yet",
      endTime: new Date("2025-04-12T22:00:00").getTime(),
      auctionEnded: false,
    },
    "artwork4": {
      highestBid: 180,
      highestBidder: "No bids yet",
      endTime: new Date("2025-04-13T18:00:00").getTime(),
      auctionEnded: false,
    },
    "artwork5": {
      highestBid: 250,
      highestBidder: "No bids yet",
      endTime: new Date("2025-04-14T22:30:00").getTime(),
      auctionEnded: false,
    },
    "artwork6": {
      highestBid: 300,
      highestBidder: "No bids yet",
      endTime: new Date("2025-04-15T14:00:00").getTime(),
      auctionEnded: false,
    },
    "artwork7": {
      highestBid: 220,
      highestBidder: "No bids yet",
      endTime: new Date("2025-04-16T18:30:00").getTime(),
      auctionEnded: false,
    },
    "artwork8": {
      highestBid: 275,
      highestBidder: "No bids yet",
      endTime: new Date("2025-04-17T15:00:00").getTime(),
      auctionEnded: false,
    },
    "artwork9": {
      highestBid: 190,
      highestBidder: "No bids yet",
      endTime: new Date("2025-04-18T20:00:00").getTime(),
      auctionEnded: false,
    },
  }
};

// Upload data to Firebase
update(ref(database), auctionData)
  .then(() => console.log("✅ Artworks & Auctions updated with future dates!"))
  .catch((error) => console.error("❌ Error:", error));
