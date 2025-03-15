import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import Modal from "../../../components/Modal/Modal";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionAmount] = useState(50);
  const [modalOpen, setModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [joinDate, setJoinDate] = useState("2023-01-01");
  const [contact, setContact] = useState("+880123456789");
  const [membershipEnd, setMembershipEnd] = useState("2024-12-31");
  const [bio, setBio] = useState(
    "Passionate web developer and lifelong learner."
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const response = await axios.get(
          `/api/subscription-status?email=${user?.email}`
        );
        setIsSubscribed(response.data.isSubscribed);
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
      }
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 bg-white rounded-3xl shadow-2xl space-y-12 my-10">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-indigo-500 shadow-xl object-cover"
        />
        <div className="space-y-3 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            {user?.displayName}
          </h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-gray-500">📅 Joined: {joinDate}</p>
          <p className="text-gray-500">📞 Contact: {contact}</p>
          <div className="flex gap-5 justify-center md:justify-start mt-4">
            <a
              href="#"
              className="text-blue-600 text-3xl hover:scale-125 duration-200"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-gray-800 text-3xl hover:scale-125 duration-200"
            >
              <FaGithub />
            </a>
            <a
              href="#"
              className="text-blue-500 text-3xl hover:scale-125 duration-200"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-inner">
        <h3 className="font-semibold text-xl mb-3">About Me</h3>
        <p className="italic text-gray-700 leading-relaxed text-justify">
          "{bio}"
        </p>
      </div>

      {/* Membership Status */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex flex-col md:flex-row justify-between items-center gap-5 shadow-xl">
        {isSubscribed ? (
          <div>
            <p className="text-2xl font-bold">✅ Premium Member</p>
            <p className="text-sm">Membership valid till: {membershipEnd}</p>
          </div>
        ) : (
          <div>
            <p className="text-2xl font-bold">🚀 Upgrade to Premium</p>
            <button
              onClick={handleSubscribe}
              className="mt-3 bg-yellow-400 hover:bg-yellow-500 px-8 py-3 rounded-lg text-black font-semibold shadow-lg"
            >
              Subscribe for ${subscriptionAmount}
            </button>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center">
        {[
          { label: "Projects", value: "150+" },
          { label: "Articles", value: "25+" },
          { label: "Followers", value: "1.2k" },
          { label: "Courses", value: "30+" },
        ].map((item, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl shadow-md">
            <p className="text-4xl font-bold text-indigo-600">{item.value}</p>
            <p className="text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <button
          onClick={() => navigate("/edit-profile")}
          className="bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-500 shadow-lg"
        >
          ✏️ Edit Profile
        </button>
        <button
          onClick={() => navigate("/account-settings")}
          className="bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 shadow-lg"
        >
          ⚙️ Account Settings
        </button>
        {isSubscribed && (
          <button
            onClick={() => navigate("/manage-subscription")}
            className="bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 shadow-lg"
          >
            💳 Manage Subscription
          </button>
        )}
        <button
          onClick={() => navigate("/my-activities")}
          className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 shadow-lg"
        >
          📊 My Activities
        </button>
      </div>

      {/* Payment Modal */}
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h2 className="text-2xl font-bold text-center">Complete Payment</h2>
          <p className="mt-3 text-center">
            Subscribe for just ${subscriptionAmount} to enjoy premium features!
          </p>
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={`${
              isProcessing ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            } text-white px-8 py-3 mt-6 rounded-lg w-full shadow-lg`}
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
