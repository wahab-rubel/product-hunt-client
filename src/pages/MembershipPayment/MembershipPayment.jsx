import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MembershipPayment = () => {
  const [email, setEmail] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/memberships`, {
        userEmail: email,
        isActive: true,
        paidAt: new Date(),
        durationInDays: 30, // Optional
      });

      if (response.data.success) {
        toast.success('Membership activated successfully!');
        setPaymentSuccess(true);
      } else {
        toast.error('Failed to activate membership');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Buy Membership</h2>
      <p className="mb-4 text-center text-gray-600">
        Get unlimited product uploads, premium support, and more for 30 days.
      </p>
      <input
        type="email"
        className="w-full p-3 border rounded mb-4"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay Membership ($10)'}
      </button>

      {paymentSuccess && (
        <p className="text-green-600 text-center mt-4">
          🎉 Membership activated! You can now upload unlimited products.
        </p>
      )}
    </div>
  );
};

export default MembershipPayment;
