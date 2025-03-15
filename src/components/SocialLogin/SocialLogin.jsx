import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../context/AuthContext";


const SocialLogin = () => {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const handleGoogleSignIn = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const userInfo = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        token: credentialResponse.credential,
        googleId: decoded.sub,
      };

      // Send user info to the backend
      await axios.post("https://product-hunt-server-tawny.vercel.appusers", userInfo);
      console.log("User data is added", userInfo);

      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Google login error:", error.message);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="divider w-full"></div>
      {user ? (
        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      ) : (
        <GoogleLogin
          onSuccess={handleGoogleSignIn}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        />
      )}
    </div>
  );
};

export default SocialLogin;
