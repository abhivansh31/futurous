import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VITE_APP_BACKEND_BASE_URL = import.meta.env.VITE_APP_BACKEND_BASE_URL;

const ViewMessage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${VITE_APP_BACKEND_BASE_URL}/api/messages/${id}`
        );
        setMessage(response.data.message);
        setIsLocked(response.data.isLocked);
      } catch (error) {
        setError("Failed to fetch message");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (!message) {
    return <div>Message not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Message Details</h2>
      <div className="mb-4">
        <p className="text-lg">{message.message}</p>
        <p className="text-gray-600 mt-2">
          Delivery Date: {new Date(message.deliveryDate).toLocaleDateString()}
        </p>
        <p className="text-gray-600">
          Status:{" "}
          {isLocked ? (
            <span className="text-red-500">Locked</span>
          ) : (
            <span className="text-green-500">Unlocked</span>
          )}
        </p>
      </div>

      {!isLocked && (
        <div className="space-x-4">
          <button
            onClick={() => navigate(`/update/${id}`)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update
          </button>
          <button
            onClick={async () => {
              try {
                await axios.delete(`${BACKEND_URL}/api/messages/${id}`);
                navigate("/dashboard");
              } catch (error) {
                console.error("Error deleting message:", error);
                setError("Failed to delete message");
              }
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewMessage;
