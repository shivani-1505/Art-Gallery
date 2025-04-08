export { 
  app, 
  database, ref, set, update, onValue, // Realtime Database exports
  db, collection, addDoc, getDocs // Firestore exports (added getDocs)
} from "./firebaseConfig.js";