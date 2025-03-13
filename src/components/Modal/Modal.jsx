import { useEffect, useState } from 'react';
import axios from 'axios';

const Modal = ({ onClose, onPaymentSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/subscription-status`);
        console.log("Subscription Status on Modal Open:", response.data);
      } catch (error) {
        console.error("Error fetching subscription status:", error);
      }
    };

    fetchSubscriptionStatus();
  }, []);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess(); // Payment successful
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Payment Checkout</h2>
        <button 
          onClick={handlePayment} 
          disabled={isProcessing}
          className="pay-btn"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default Modal;
