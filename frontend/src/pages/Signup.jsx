import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VITE_BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post(`${VITE_BACKEND_BASE_URL}/api/auth`, {
        email,
        username,
        password,
      });
      navigate("/");
    } catch (error) {
      alert("Error signing up");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 border rounded mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
