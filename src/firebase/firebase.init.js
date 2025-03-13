import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaTnBwHiigseRAGcMPCnv9_jPei0KhEFA",
  authDomain: "assignment-12-128a0.firebaseapp.com",
  projectId: "assignment-12-128a0",
  storageBucket: "assignment-12-128a0.appspot.com",
  messagingSenderId: "1092157040767",
  appId: "1:1092157040767:web:7b9da85867c5a0b885b74a",
  measurementId: "G-DYVL9KLH9C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Export Firebase services
export { app, auth, googleProvider, db, analytics };
