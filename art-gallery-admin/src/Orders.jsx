import React, { useEffect, useState } from "react";
import { db } from "./firebase"; // Ensure Firebase is properly configured
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import adminIntroImage from "./images/admin-bg.jpg";
import profileImage from "./images/user (2).png";

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Handle deletion of an order (optional)
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "orders", id));
      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
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
              <a href="#dashboard" style={{ color: "white", textDecoration: "none" }}>
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

      {/* Page Content Wrapper */}
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
            <b>Manage Orders</b>
          </h1>
          <p style={{ color: "#2c3e50" }}>View all orders placed by buyers.</p>
        </section>

        {/* Dashboard Section */}
        <section
          id="dashboard"
          style={{ padding: "40px 20px", backgroundColor: "#ecf0f1", textAlign: "center" }}
        >
          <h2>Orders</h2>
          {orders.length === 0 ? (
            <p>Loading orders...</p>
          ) : (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                maxWidth: "800px",
                margin: "0 auto"
              }}
            >
              {orders.map((order) => (
                <li
                  key={order.id}
                  style={{
                    backgroundColor: "white",
                    margin: "10px 0",
                    padding: "15px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    textAlign: "left"
                  }}
                >
                  <p>
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <p>
                    <strong>Buyer Name:</strong> {order.buyerName}
                  </p>
                  <p>
                    <strong>Buyer Email:</strong> {order.buyerEmail}
                  </p>
                  <p>
                    <strong>Price: </strong> 135000
                  </p>
                  <p>
                    <strong>Artwork:</strong> {order.artwork}
                  </p>
                  <button
                    onClick={() => handleDelete(order.id)}
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
                </li>
              ))}
            </ul>
          )}
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

export default ManageOrders;
