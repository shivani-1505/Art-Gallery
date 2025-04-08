// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGYKS0X4kJWI-u54GRQuAofOKYBBd7hDc",
  authDomain: "artvista-480fa.firebaseapp.com",
  projectId: "artvista-480fa",
  storageBucket: "artvista-480fa.appspot.com",
  messagingSenderId: "627287660615",
  appId: "1:627287660615:web:f61dffed1967749cf63962",
  measurementId: "G-HFH4EY86CK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

// Export the necessary Firebase services
export { app, analytics, db };
