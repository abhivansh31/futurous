import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PORT = import.meta.env.PORT || 3000;

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const fetchMessages = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.get(
        `http://localhost:${PORT}/api/messages?userId=${userId}`
      );
      const messagesWithLockStatus = response.data.map((msg) => {
        const isLocked = msg.isLocked;
        return { ...msg, isLocked };
      });
      setMessages(messagesWithLockStatus);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const calculateCountdown = (deliveryDate) => {
    const now = new Date();
    const delivery = new Date(deliveryDate);
    const timeLeft = delivery - now;

    if (timeLeft <= 0) return "Delivered";

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    return `${days}d ${hours}h ${minutes}m left`;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/messages/${id}`);
      setMessages(messages.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const truncateMessage = (message, limit) => {
    return message.length > limit
      ? message.substring(0, limit) + "..."
      : message;
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Create a Message</h2>
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => navigate("/create")}
        >
          Create Message
        </button>
      </div>
      <h2 className="text-3xl font-bold mt-6">Your Messages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {messages.map((msg) => {
          const isLocked = msg.isLocked;
          return (
            <div key={msg._id} className="bg-white p-4 rounded-lg shadow-lg">
              <p className={`text-gray-700 ${isLocked ? "blur-[5px]" : ""}`}>
                {truncateMessage(msg.message, 50)}
              </p>
              <p className="text-sm text-gray-500">
                Deliver on: {new Date(msg.deliveryDate).toDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Status: {isLocked ? "Locked" : "Unlocked"}
              </p>
              <p className="text-sm text-gray-500">
                Countdown: {calculateCountdown(msg.deliveryDate)}
              </p>
              <button
                onClick={() => navigate(`/view/${msg._id}`)}
                disabled={isLocked}
                className={`mt-2 text-white py-2 px-4 rounded ${
                  isLocked
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                View
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
