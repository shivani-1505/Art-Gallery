import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getApp } from "firebase/app";

const AdminProfile = () => {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    id: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      const email = localStorage.getItem("AdminEmail");
      if (!email) {
        console.error("No admin email found in localStorage.");
        return;
      }

      try {
        const db = getFirestore(getApp());
        const adminsRef = collection(db, "admin");
        const q = query(adminsRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setAdminData({
            FullName: data.name || "",
            Email: data.email || "",
            ID: data.id || "",
          });
        } else {
          console.error("No admin found with the provided email.");
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("AdminEmail");
    navigate("/admin-login");
  };

  const styles = {
    pageContainer: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#ecf0f1",
      width: '100vw', 
    },
    header: {
      backgroundColor: "#2c3e50",
      padding: "15px",
      color: "white",
      textAlign: "center",
      fontSize: "24px",
      fontWeight: "bold",
    },
    footer: {
      backgroundColor: "#34495e",
      padding: "20px 0",
      color: "white",
      textAlign: "center",
      fontSize: "14px",
    },
    content: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    detailsContainer: {
      backgroundColor: "white",
      width: "90%",
      maxWidth: "600px",
      borderRadius: "10px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "30px",
      marginBottom: "20px",
    },
    fieldContainer: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
      color: "#333",
    },
    value: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "14px",
      backgroundColor: "#f7f7f7",
    },
    logoutButton: {
      width: "100px",
      padding: "10px",
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <header style={styles.header}>
        Admin Portal
      </header>

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.detailsContainer}>
          <h2 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "20px" }}>Admin Details</h2>
          <div style={styles.fieldContainer}>
            <label style={styles.label}>ID</label>
            <div style={styles.value}>{adminData.ID}</div>
          </div>
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Full Name</label>
            <div style={styles.value}>{adminData.FullName}</div>
          </div>
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Email</label>
            <div style={styles.value}>{adminData.Email}</div>
          </div>
        </div>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>2025 &copy; Admin Team</p>
      </footer>
    </div>
  );
};

export default AdminProfile;
