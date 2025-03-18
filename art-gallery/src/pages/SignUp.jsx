import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdArrowBack } from "react-icons/md";
import { db } from "../firebase"; // Import Firestore configuration
import { collection, addDoc } from "firebase/firestore";

export default function SignUp({ onBackClick }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Add user data to Firestore
      const usersCollection = collection(db, "users");
      await addDoc(usersCollection, {
        name: formData.name,
        email: formData.email,
        password: formData.password, // Store securely in a real app (hashed)
        createdAt: new Date(),
      });

      console.log("User added to Firestore!");
      alert("Sign up successful!");
    } catch (err) {
      console.error("Error adding user: ", err);
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="bg-black min-h-screen w-screen flex flex-col items-center text-white">
      {/* Header Section */}
      <header className="w-full bg-white text-black py-4 px-6 flex items-center">
        <h1 className="text-xl font-bold">Art Gallery</h1>
      </header>

      <div className="max-w-lg w-full bg-gray-900 p-8 rounded-2xl shadow-lg mt-6">

        {/* Form Section */}
        <div className="flex items-center mb-6 relative">
          <h1 className="text-3xl font-semibold text-center w-full">Sign Up</h1>
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <label className="block text-gray-400 text-sm mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-400 text-white"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-400 text-white"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-400 text-white"
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-400 text-white"
              placeholder="Confirm your password"
              required
            />
          </div>

          <motion.button
            type="submit"
            className="w-full bg-amber-400 text-black font-semibold p-3 rounded-lg shadow-lg hover:bg-amber-500 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </motion.form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <span className="text-amber-400 cursor-pointer hover:underline">Log in</span>
        </p>
      </div>
    </div>
  );
}
