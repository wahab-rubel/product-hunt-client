import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import Modal from "../../../components/Modal/Modal";

const Profile = () => {
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionAmount, setSubscriptionAmount] = useState(50);
  const [modalOpen, setModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Fetch user subscription status from backend API
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const response = await axios.get(
          `/api/subscription-status?email=${user?.email}`
        );
        setIsSubscribed(response.data.isSubscribed); // assuming response returns { isSubscribed: true/false }
      } catch (error) {
        console.error("Error fetching subscription status:", error);
      }
    };
    if (user?.email) fetchSubscriptionStatus();
  }, [user]);

  // Handle subscribe button click
  const handleSubscribe = () => {
    setModalOpen(true);
  };

  // Handle payment process
  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.post("/api/initiate-payment", {
        email: user.email,
        amount: subscriptionAmount,
      });
      if (response.data.success) {
        setIsSubscribed(true);
        setModalOpen(false);
      } else {
        console.error("Payment failed:", response.data.message);
      }
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center">
        <span className="border bg-orange-600 rounded text-cyan-50">
          My Profile
        </span>
      </h2>
      <div className="flex flex-col items-center mt-4">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="User"
          className="w-24 h-24 rounded-full border-8 border-teal-500"
        />
        <h3 className="text-xl font-semibold mt-2">{user?.displayName}</h3>
        <p className="text-gray-600">{user?.email}</p>
        {!isSubscribed ? (
          <button
            onClick={handleSubscribe}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Subscribe ${subscriptionAmount}
          </button>
        ) : (
          <div className="mt-4 p-2 bg-green-100 text-green-600 font-semibold rounded-lg">
            ✅ Membership Status: Verified
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h2 className="text-xl font-bold">Complete Payment</h2>
          <p>Subscribe for just ${subscriptionAmount}!</p>
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="bg-green-500 text-white px-6 py-2 mt-4 rounded-lg hover:bg-green-600"
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
