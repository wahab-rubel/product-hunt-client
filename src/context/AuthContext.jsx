import React, { createContext, useState, useEffect, useContext } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "../firebase/firebase.init"; // Ensure Firebase is initialized

// Create context
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create a user with email and password
    const createUser = async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);
        // After creating user, you might want to fetch their role from the backend
        return fetchUserRole(email);
    };

    // Update user profile with name and photo URL
    const updateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, { displayName: name, photoURL });
    };

    // Google Sign In
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const loggedInUser = result.user;
            // After Google Sign-In, fetch the user's role from the backend
            return fetchUserRole(loggedInUser.email);
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            throw error;
        }
    };

    // Sign in with email and password
    const signIn = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const loggedInUser = result.user;
            // After email/password sign-in, fetch the user's role from the backend
            return fetchUserRole(loggedInUser.email);
        } catch (error) {
            console.error("Sign In Error:", error);
            throw error;
        }
    };

    // Fetch user role from the backend
    const fetchUserRole = async (email) => {
        if (!email) return null;
        try {
            const res = await fetch(`YOUR_BACKEND_URL/users/role/${email}`); // Replace with your backend API endpoint
            const data = await res.json();
            if (data?.role) {
                setUser({ ...auth.currentUser, role: data.role, email: email }); // Merge role with user object
                return { ...auth.currentUser, role: data.role, email: email };
            } else {
                setUser({ ...auth.currentUser, role: 'user', email: email }); // Default role if not found
                return { ...auth.currentUser, role: 'user', email: email };
            }
        } catch (error) {
            console.error("Error fetching user role:", error);
            setUser({ ...auth.currentUser, role: 'user', email: email }); // Default role on error
            return { ...auth.currentUser, role: 'user', email: email };
        }
    };

    // Logout user
    const logOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    // Use Firebase onAuthStateChanged to track user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                await fetchUserRole(currentUser.email); // Fetch role when user is authenticated
            } else {
                setUser(null);
            }
            setLoading(false); // Stop loading once the state is updated
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, googleSignIn, signIn, logOut, createUser, updateUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);