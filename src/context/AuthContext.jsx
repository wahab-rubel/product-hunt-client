import React, { createContext, useState, useEffect } from "react";
import { 
  GoogleAuthProvider, 
  signInWithPopup,  
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  signOut,
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, { displayName: name, photoURL });
  };

  // ✅ Google Sign In
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      return result.user;
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      throw error;
    }
  };

  
  const signIn = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      return result.user;
    } catch (error) {
      console.error("Sign In Error:", error);
      throw error;
    }
  };

  // ✅ Logout
  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // ✅ Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); 
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, googleSignIn, signIn, logOut, createUser, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
