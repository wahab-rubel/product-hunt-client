import { useState } from 'react';

const Modal = ({ onClose, onPaymentSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate the payment process
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess(); // Notify success after payment
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Payment Checkout</h2>
        {/* Add your payment form or logic here */}
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
