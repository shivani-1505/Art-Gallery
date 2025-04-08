import { useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "./firebase";
import { useNavigate } from "react-router-dom";
import adminIntroImage from './images/admin-bg.jpg';

const db = getFirestore(app);

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      // Query Firestore for an admin with matching email and password
      const adminsRef = collection(db, "admin");
      const q = query(
        adminsRef,
        where("email", "==", formData.email),
        where("password", "==", formData.password)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Store email in local storage and redirect to the admin home page
        localStorage.setItem("AdminEmail", formData.email);
        navigate("/admin");
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } catch (err) {
      console.error("Error during login: ", err);
      setErrorMessage("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const styles = {
    pageContainer: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
      backgroundImage: `url(${adminIntroImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100vw', 
    },
    header: {
      backgroundColor: "#2c3e50",
      padding: "15px 20px",
      color: "white",
      textAlign: "center",
      fontSize: "24px",
      fontWeight: "bold",
    },
    content: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: "url('./images/admin-intro-bg.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: "20px",
    },
    formContainer: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      width: "90%",
      maxWidth: "400px",
      borderRadius: "10px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "30px",
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "14px",
      marginBottom: "15px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
    errorMessage: {
      color: "red",
      textAlign: "center",
      marginTop: "10px",
    },
    footer: {
      backgroundColor: "#34495e",
      padding: "20px 0",
      color: "white",
      textAlign: "center",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <header style={styles.header}>
        Admin Portal
      </header>

      {/* Login Form Section */}
      <div style={styles.content}>
        <div style={styles.formContainer}>
          <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>
            <b>Admin Login</b>
          </h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>
              {loading ? "Logging In..." : "Login"}
            </button>
            {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>2025 &copy; Admin Team</p>
      </footer>
    </div>
  );
};

export default AdminLogin;
