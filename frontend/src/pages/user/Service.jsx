import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import HandymanCard from "../../components/HandymanCard";

function UserService() {
    const [handymen, setHandymen] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [activeFilter, setActiveFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    const { logout } = useAuth();
    const navigate = useNavigate();

    const filters = [
        { label: "All", value: "all" },
        { label: "Top Rated", value: "top-rated" },
        { label: "Trending", value: "trending" },
        { label: "Experienced", value: "experienced" },
        { label: "Electrical", value: "electrician" },
        { label: "Plumbing", value: "plumbing" },
        { label: "Carpentry", value: "carpentry" },
        { label: "Appliances", value: "appliances" },
        { label: "Cleaning & Maintenance", value: "cleaning" },
        { label: "Art & Painting", value: "art & painting" },
    ];

    useEffect(() => {
        fetchHandymen();
    }, []);

    const fetchHandymen = async () => {
        try {
            const response = await API.get("/api/handymen");
            setHandymen(response.data);
            setFiltered(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = (filter) => {
        setActiveFilter(filter);

        if (filter === "all") {
            setFiltered(handymen);
        } else if (filter === "top-rated") {
            setFiltered(handymen.filter((h) => h.rating >= 4.5));
        } else if (filter === "trending") {
            setFiltered(handymen.filter((h) => h.trending === true));
        } else if (filter === "experienced") {
            setFiltered(handymen.filter((h) => h.experienced === true));
        } else {
            setFiltered(handymen.filter((h) => h.jobTitle.toLowerCase() === filter));
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="dashboard">
            <Navbar activePage="Service" onLogout={handleLogout} />

            <div className="main-cont">
                <div className="dash-head">
                    <h1>Top Handymen</h1>
                    <p>Find the best professionals for your needs</p>
                </div>

                {/* Filter buttons */}
                <div className="filter-buttons">
                    {filters.map((filter) => (
                        <button
                            key={filter.value}
                            className={activeFilter === filter.value ? "filter-btn active" : "filter-btn"}
                            onClick={() => handleFilter(filter.value)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {loading && <p>Loading...</p>}

                {!loading && filtered.length === 0 && (
                    <p className="no-results">No handymen found for this category</p>
                )}

                {/* Handyman cards */}
                <div className="card-container">
                    {filtered.map((handyman) => (
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

export default UserService;