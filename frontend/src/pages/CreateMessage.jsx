import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VITE_BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const CreateMessage = () => {
  const [message, setMessage] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!deliveryDate) {
      alert("Please enter a delivery date.");
      return;
    }

    const selectedDate = new Date(deliveryDate);
    const today = new Date();
    today.setHours(24, 0, 0, 0); // Set time to midnight for comparison with the past or future

    if (selectedDate <= today) {
      alert("Please select a future delivery date.");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post(
        `${VITE_BACKEND_BASE_URL}/api/messages`,
        {
          message,
          deliveryDate,
          userId,
        }
      );
      if (response.status === 201) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error creating message:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Write a Message</h2>
      <textarea
        className="w-full p-3 border rounded-lg mb-4"
        rows="5"
        placeholder="Write your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        type="date"
        className="w-full p-2 border rounded mb-4"
        value={deliveryDate}
        onChange={(e) => setDeliveryDate(e.target.value)}
      />
      <button
        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        onClick={handleSubmit}
      >
        Save Message
      </button>
    </div>
  );
};

export default CreateMessage;
