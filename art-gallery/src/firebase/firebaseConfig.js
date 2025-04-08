// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update, onValue } from "firebase/database";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"; // Added getDocs

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGYKS0X4kJWI-u54GRQuAofOKYBBd7hDc",
  authDomain: "artvista-480fa.firebaseapp.com",
  databaseURL: "https://artvista-480fa-default-rtdb.firebaseio.com",
  projectId: "artvista-480fa",
  storageBucket: "artvista-480fa.appspot.com",
  messagingSenderId: "627287660615",
  appId: "1:627287660615:web:f61dffed1967749cf63962",
  measurementId: "G-HFH4EY86CK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const database = getDatabase(app); // Realtime Database for auctions
const db = getFirestore(app); // Firestore for artists and artworks

// Export initialized services and functions
export { 
    app, 
    database, ref, set, update, onValue, // Realtime Database exports
    db, collection, addDoc, getDocs // Firestore exports (added getDocs)
  };