import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const UpdateMessage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/messages/${id}`
        );
        setMessage(response.data.message);
        setDeliveryDate(response.data.deliveryDate);
      } catch (error) {
        setError("Failed to fetch message");
        console.error("Error:", error);
      }
    };
    fetchMessage();
  }, [id]);

  const handleUpdate = async () => {
    const selectedDate = new Date(deliveryDate);
    const now = new Date();
    now.setHours(24, 0, 0, 0);

    if (selectedDate <= now) {
      alert("Please select a future delivery date.");
      return;
    }

    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/messages/${id}`,
        {
          message,
          deliveryDate,
        }
      );
      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Failed to update message");
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Update Message</h2>
      {error && <div className="text-red-500">{error}</div>}
      <textarea
        className="w-full p-3 border rounded-lg mb-4"
        rows="5"
        placeholder="Update your message..."
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
        onClick={handleUpdate}
      >
        Update Message
      </button>
    </div>
  );
};

export default UpdateMessage;
