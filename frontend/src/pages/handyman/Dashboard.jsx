import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";

function HandymanDashboard() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        scheduled: 0,
        completed: 0,
        cancelled: 0
    });

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await API.get("/api/bookings/handyman/mybookings");
            const data = response.data;
            setBookings(data);

            // Calculate stats
            setStats({
                total: data.length,
                scheduled: data.filter((b) => b.status === "scheduled").length,
                completed: data.filter((b) => b.status === "completed").length,
                cancelled: data.filter((b) => b.status === "cancelled").length
            });

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (bookingId, status) => {
        try {
            await API.put(`/api/bookings/${bookingId}`, { status });
            fetchBookings(); // refresh bookings
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/handyman/login");
    };

    const statusColor = {
        "scheduled": "#f5a623",
        "in progress": "#007bff",
        "completed": "#039855",
        "cancelled": "#e00"
    };

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <div className="navbar">
                <h1 className="logo">LetFixIt</h1>

                <div className="nav-links">
                    <a href="/handyman/dashboard" className="active">Dashboard</a>
                    <a href="/handyman/profile">Profile</a>
                </div>

                <div className="nav-user">
                    <div className="avatar">
                        {user?.username?.[0]?.toUpperCase()}
                    </div>
                    <p>{user?.username?.split(" ")[0]}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {/* Main content */}
            <div className="main-cont">
                <div className="dash-head">
                    <h1>Welcome, {user?.username?.split(" ")[0]}</h1>
                    <p>Manage your bookings and profile</p>
                </div>

                {/* Stats */}
                <div className="stats-container">
                    <div className="stat-card">
                        <h3>{stats.total}</h3>
                        <p>Total Bookings</p>
                    </div>
                    <div className="stat-card">
                        <h3>{stats.scheduled}</h3>
                        <p>Scheduled</p>
                    </div>
                    <div className="stat-card">
                        <h3>{stats.completed}</h3>
                        <p>Completed</p>
                    </div>
                    <div className="stat-card">
                        <h3>{stats.cancelled}</h3>
                        <p>Cancelled</p>
                    </div>
                </div>

                {/* Bookings */}
                <h2 style={{ marginBottom: "16px" }}>Recent Bookings</h2>

                {loading && <p>Loading bookings...</p>}

                {!loading && bookings.length === 0 && (
                    <p className="no-results">No bookings yet</p>
                )}

                <div className="bookings-list">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="booking-card">
                            <div className="booking-top">
                                <div className="booking-info">
                                    <h4>{booking.userId?.username}</h4>
                                    <p>{booking.userId?.email}</p>
                                </div>
                                <span
                                    className="booking-status"
                                    style={{ color: statusColor[booking.status] }}
                                >
                                    {booking.status}
                                </span>
                            </div>

                            <div className="booking-service">
                                <p className="service-title">{booking.service}</p>
                                <p className="service-desc">{booking.problem}</p>
                            </div>

                            <div className="booking-meta">
                                <div className="meta-item">
                                    <span>📍</span>
                                    <p>{booking.address}</p>
                                </div>
                                <div className="meta-item">
                                    <span>🕐</span>
                                    <p>{booking.time}</p>
                                </div>
                                <div className="meta-item">
                                    <span>📅</span>
                                    <p>{booking.date}</p>
                                </div>
                            </div>

                            {/* Status update buttons */}
                            <div className="booking-btns">
                                {booking.status === "scheduled" && (
                                    <>
                                        <button
                                            className="profile-btn"
                                            onClick={() => handleStatusUpdate(booking._id, "in progress")}
                                        >
                                            Start Job
                                        </button>
                                        <button
                                            className="cancel-btn"
                                            onClick={() => handleStatusUpdate(booking._id, "cancelled")}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                                {booking.status === "in progress" && (
                                    <button
                                        className="profile-btn"
                                        onClick={() => handleStatusUpdate(booking._id, "completed")}
                                    >
                                        Mark Complete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HandymanDashboard;