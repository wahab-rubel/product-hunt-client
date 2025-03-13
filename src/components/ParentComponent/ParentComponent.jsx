import Modal from './Modal';
import { useState } from 'react';
import axios from 'axios';

const ParentComponent = () => {
  const [showModal, setShowModal] = useState(false);

  const handlePaymentSuccess = async () => {
    console.log("✅ Payment was successful!");
    setShowModal(false); 

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/subscription-status`);
      console.log("Subscription Status after Payment:", response.data);
    } catch (error) {
      console.error("Error fetching subscription status after payment:", error);
    }
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)} className="open-modal-btn">
        Open Payment Modal
      </button>

      {showModal && (
        <Modal 
          onClose={() => setShowModal(false)} 
          onPaymentSuccess={handlePaymentSuccess} 
        />
      )}
    </div>
  );
};

export default ParentComponent;
