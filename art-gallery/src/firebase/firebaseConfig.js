// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAGYKS0X4kJWI-u54GRQuAofOKYBBd7hDc",
    authDomain: "artvista-480fa.firebaseapp.com",
    databaseURL: "https://artvista-480fa-default-rtdb.firebaseio.com",
    projectId: "artvista-480fa",
    storageBucket: "artvista-480fa.appspot.com",
    messagingSenderId: "627287660615",
    appId: "1:627287660615:web:f61dffed1967749cf63962",
    measurementId: "G-HFH4EY86CK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const database = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Initialize analytics only if in a browser environment
let analytics = null;
if (typeof window !== 'undefined') {
    // Import and initialize analytics only in browser environments
    try {
        const { getAnalytics } = await import('firebase/analytics');
        analytics = getAnalytics(app);
    } catch (error) {
        console.warn("Analytics not initialized:", error.message);
    }
}

// Export the Firebase configuration and services
export { app, db, database, auth, storage, analytics };
export default firebaseConfig;