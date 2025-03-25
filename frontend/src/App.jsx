import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateMessage from "./pages/CreateMessage.jsx";
import ViewMessage from "./pages/ViewMessage.jsx";
import UpdateMessage from "./pages/UpdateMessage.jsx"; 

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create" element={<CreateMessage />} />
                <Route path="/view/:id" element={<ViewMessage />} />
                <Route path="/update/:id" element={<UpdateMessage />} /> 
            </Routes>
        </Router>
    );
}

export default App;