import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import Modal from "../../../components/Modal/Modal";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionAmount, setSubscriptionAmount] = useState(50);
  const [modalOpen, setModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [joinDate, setJoinDate] = useState("2023-01-01");
  const [contact, setContact] = useState("+880123456789");
  const [membershipEnd, setMembershipEnd] = useState("2024-12-31"); // Example
  const [bio, setBio] = useState("Passionate web developer and lifelong learner.");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const response = await axios.get(`/api/subscription-status?email=${user?.email}`);
        setIsSubscribed(response.data.isSubscribed);
        // Optional backend fields
        // setMembershipEnd(response.data.membershipEnd);
        // setBio(response.data.bio);
      } catch (error) {
        console.error("Error fetching subscription status:", error);
      }
    };
    if (user?.email) fetchSubscriptionStatus();
  }, [user]);

  const handleSubscribe = () => setModalOpen(true);

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
      } else console.error("Payment failed:", response.data.message);
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-8">
        <span className="bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-2 text-white rounded-lg shadow-lg">
          My Profile
        </span>
      </h2>

      {/* Profile Header */}
      <div className="flex flex-col items-center space-y-4">
        <img src={user?.photoURL || "https://via.placeholder.com/150"} alt="User"
          className="w-32 h-32 rounded-full border-4 border-teal-500 shadow-lg" />
        <h3 className="text-2xl font-bold">{user?.displayName}</h3>
        <p className="text-gray-600">{user?.email}</p>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          Role: Premium User
        </span>
        <p className="text-gray-500">📅 Joined: {joinDate}</p>
        <p className="text-gray-500">📞 Contact: {contact}</p>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-2">
          <a href="#" className="text-blue-600 text-2xl"><FaFacebook /></a>
          <a href="#" className="text-gray-800 text-2xl"><FaGithub /></a>
          <a href="#" className="text-blue-500 text-2xl"><FaLinkedin /></a>
        </div>

        {/* Bio */}
        <p className="text-center italic mt-3 text-gray-700">
          "{bio}"
        </p>
      </div>

      {/* Subscription Section */}
      <div className="mt-8 text-center">
        {!isSubscribed ? (
          <button
            onClick={handleSubscribe}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600"
          >
            Subscribe ${subscriptionAmount}
          </button>
        ) : (
          <div className="p-4 bg-green-100 text-green-700 rounded-lg shadow-md">
            ✅ <strong>Membership:</strong> Verified
            <p>🎉 Premium until: {membershipEnd}</p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-gray-300"></div>

      {/* Extra Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button onClick={() => navigate("/edit-profile")} className="w-full bg-yellow-400 text-white py-3 rounded-lg hover:bg-yellow-500">
          ✏️ Edit Profile
        </button>
        <button onClick={() => navigate("/account-settings")} className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800">
          ⚙️ Account Settings
        </button>
        {isSubscribed && (
          <button onClick={() => navigate("/manage-subscription")} className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600">
            💳 Manage Subscription
          </button>
        )}
        <button onClick={() => navigate("/my-activities")} className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600">
          📊 My Activities
        </button>
      </div>

      {/* Payment Modal */}
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h2 className="text-xl font-bold text-center">Complete Payment</h2>
          <p className="mt-2 text-center">Subscribe for just ${subscriptionAmount}!</p>
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="bg-green-500 text-white px-8 py-3 mt-4 rounded-lg hover:bg-green-600 w-full"
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
