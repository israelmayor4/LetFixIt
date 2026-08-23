import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import HandymanCard from "../../components/HandymanCard";

function UserDashboard() {
    const [handymen, setHandymen] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchHandymen();
    }, []);

    const fetchHandymen = async () => {
        try {
            const response = await API.get("/api/handymen");
            setHandymen(response.data);
        } catch (error) {
            setError("Failed to fetch handymen");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="dashboard">
            <Navbar activePage="Dashboard" onLogout={handleLogout} />

            <div className="main-cont">
                <div className="dash-head">
                    <h1>Welcome, {user?.username?.split(" ")[0]}</h1>
                    <p>Find and book the best handymen near you</p>
                </div>

                {loading && <p>Loading handymen...</p>}
                {error && <p className="error-msg">{error}</p>}

                <div className="card-container">
                    {handymen.map((handyman) => (
                        <HandymanCard
                            key={handyman._id}
                            data={handyman}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;