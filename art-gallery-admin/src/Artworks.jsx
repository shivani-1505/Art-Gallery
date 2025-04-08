import React, { useEffect, useState } from "react";
import { db } from "./firebase"; // Ensure Firebase is properly configured
import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
import adminIntroImage from "./images/admin-bg.jpg";
import profileImage from "./images/user (2).png";

function ManageArtworks() {
  const [artworks, setArtworks] = useState([]);
  const [newArtwork, setNewArtwork] = useState({
    title: "",
    artist: "",
    year: "",
    description: "",
    category: "",
    forsale: false,
    available: true,
    imageUrls: ""
  });

  // Fetch artworks from Firestore on mount
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "artworks"));
        const artworksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setArtworks(artworksData);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };
    fetchArtworks();
  }, []);

  // Handle deletion of an artwork
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "artworks", id));
      setArtworks((prev) => prev.filter((artwork) => artwork.id !== id));
    } catch (error) {
      console.error("Error deleting artwork:", error);
    }
  };

  // Handle adding a new artwork
  const handleAdd = async () => {
    if (!newArtwork.title || !newArtwork.artist) return; // basic validation
    // Convert imageUrls string to an array (if comma separated) or leave as a single URL
    const imageUrlsArray = newArtwork.imageUrls.includes(",")
      ? newArtwork.imageUrls.split(",").map(url => url.trim())
      : [newArtwork.imageUrls.trim()];
      
    const artworkToAdd = { ...newArtwork, imageUrls: imageUrlsArray };
    
    try {
      const docRef = await addDoc(collection(db, "artworks"), artworkToAdd);
      setArtworks((prev) => [...prev, { id: docRef.id, ...artworkToAdd }]);
      // Clear the form
      setNewArtwork({
        title: "",
        artist: "",
        year: "",
        description: "",
        category: "",
        forsale: false,
        available: true,
        imageUrls: ""
      });
    } catch (error) {
      console.error("Error adding artwork:", error);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#333",
        lineHeight: "1.6",
        width: "100vw",
        minHeight: "100vh"
      }}
    >
      {/* Mobile-specific CSS */}
      <style>{`
        @media only screen and (max-width: 767px) {
          header {
            padding: 10px 15px !important;
            position: fixed !important;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
          }
          header div {
            font-size: 18px !important;
          }
          nav ul {
            display: flex;
            justify-content: flex-end;
          }
          /* Add top padding to the rest of the content to avoid overlap with fixed header */
          .page-content {
            padding-top: 50px;
          }
        }
      `}</style>

      {/* Header */}
      <header
        style={{
          backgroundColor: "#2c3e50",
          color: "white",
          padding: "15px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>Admin Portal</div>
        <nav>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              gap: "20px",
              margin: 0,
              padding: 0
            }}
          >
            <li>
              <a href="/admin" style={{ color: "white", textDecoration: "none" }}>
                Dashboard
              </a>
            </li>
            <li>
              <a href="/admin-profile">
                <img
                  src={profileImage}
                  alt="Profile"
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                />
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Wrap the rest of the content in a container */}
      <div className="page-content">
        {/* Intro Section */}
        <section
          style={{
            width: "100%",
            height: "30vh",
            background: `url(${adminIntroImage}) center/cover no-repeat`,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <h1 style={{ color: "#2c3e50", marginBottom: "20px", marginTop: "20px" }}>
            <b>Manage Your Artworks</b>
          </h1>
          <p style={{ color: "#2c3e50" }}>
            Add or remove paintings from stock easily!
          </p>
        </section>

        {/* Dashboard Section */}
        <section
          id="dashboard"
          style={{ padding: "40px 20px", backgroundColor: "#ecf0f1", textAlign: "center" }}
        >
          <h2>Artworks</h2>

          {/* Artworks List */}
          {artworks.length === 0 ? (
            <p>Loading artworks...</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
              {artworks.map((artwork) => {
                // Ensure that if imageUrls is a string, convert it to an array
                const images = Array.isArray(artwork.imageUrls)
                  ? artwork.imageUrls
                  : artwork.imageUrls
                  ? [artwork.imageUrls]
                  : [];
                return (
                  <div
                    key={artwork.id}
                    style={{
                      width: "250px",
                      margin: "20px",
                      padding: "20px",
                      backgroundColor: "white",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      textAlign: "center",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    {/* Render all images as thumbnails */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: "5px",
                        marginBottom: "10px"
                      }}
                    >
                      {/* You can map and display thumbnails if needed */}
                      {images.map((url, idx) => (
                        <img key={idx} src={url} alt={`Artwork ${idx}`} style={{ width: "50px", height: "50px" }} />
                      ))}
                    </div>
                    <h3 style={{ fontSize: "18px", marginTop: "10px", color: "#34495e" }}>
                      {artwork.title}
                    </h3>
                    <p>
                      <b>Artist:</b> {artwork.artist}
                    </p>
                    <p>
                      <b>Year:</b> {artwork.year}
                    </p>
                    <p>
                      <b>Category:</b> {artwork.category}
                    </p>
                    <button
                      onClick={() => handleDelete(artwork.id)}
                      style={{
                        backgroundColor: "#e74c3c",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginTop: "10px"
                      }}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Add Artwork Form */}
          <div
            style={{
              marginTop: "40px",
              textAlign: "left",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            <h2>Add New Artwork</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input
                type="text"
                placeholder="Title"
                value={newArtwork.title}
                onChange={(e) =>
                  setNewArtwork({ ...newArtwork, title: e.target.value })
                }
                style={{ padding: "8px" }}
              />
              <input
                type="text"
                placeholder="Artist"
                value={newArtwork.artist}
                onChange={(e) =>
                  setNewArtwork({ ...newArtwork, artist: e.target.value })
                }
                style={{ padding: "8px" }}
              />
              <input
                type="text"
                placeholder="Year"
                value={newArtwork.year}
                onChange={(e) =>
                  setNewArtwork({ ...newArtwork, year: e.target.value })
                }
                style={{ padding: "8px" }}
              />
              <input
                type="text"
                placeholder="Category"
                value={newArtwork.category}
                onChange={(e) =>
                  setNewArtwork({ ...newArtwork, category: e.target.value })
                }
                style={{ padding: "8px" }}
              />
              <textarea
                placeholder="Description"
                value={newArtwork.description}
                onChange={(e) =>
                  setNewArtwork({ ...newArtwork, description: e.target.value })
                }
                style={{ padding: "8px", resize: "vertical" }}
                rows={3}
              />
              <input
                type="text"
                placeholder="Image URL (or comma separated for multiple)"
                value={newArtwork.imageUrls}
                onChange={(e) =>
                  setNewArtwork({ ...newArtwork, imageUrls: e.target.value })
                }
                style={{ padding: "8px" }}
              />
              <div>
                <label style={{ marginRight: "10px" }}>
                  For Sale:
                  <input
                    type="checkbox"
                    checked={newArtwork.forsale}
                    onChange={(e) =>
                      setNewArtwork({ ...newArtwork, forsale: e.target.checked })
                    }
                    style={{ marginLeft: "5px" }}
                  />
                </label>
                <label>
                  Available:
                  <input
                    type="checkbox"
                    checked={newArtwork.available}
                    onChange={(e) =>
                      setNewArtwork({ ...newArtwork, available: e.target.checked })
                    }
                    style={{ marginLeft: "5px" }}
                  />
                </label>
              </div>
              <button
                onClick={handleAdd}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px"
                }}
              >
                Add Artwork
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            backgroundColor: "#34495e",
            color: "white",
            padding: "20px 0",
            textAlign: "center"
          }}
        >
          <p>2025 &copy; Admin Team</p>
        </footer>
      </div>
    </div>
  );
}

export default ManageArtworks;
