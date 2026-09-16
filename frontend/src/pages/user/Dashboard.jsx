import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import HandymanCard from "../../components/HandymanCard";



function Header() {
  const [showNotifications, setShowNotifications] = useState(false);


  const [user, setUser] = useState({ username: "Guest User" }); // Fallback state

  useEffect(() => {
    // 1. Grab the user object you stored in localStorage during login
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set state: e.g., { username: "Justina Alani", email: "..." }
    }
  }, []);

  const firstLetter = user.username?.charAt(0).toUpperCase() || "G";


  const notificationsList = [
    { id: 1, name: "Justina Alani", time: "2 mins ago", msg: "Sent you a message", avatar: "Avatar wrap.png" },
    { id: 2, name: "Justina Alani", time: "2 mins ago", msg: "Sent you a message", avatar: "Avatar wrap.png" },
    { id: 3, name: "Justina Alani", time: "2 mins ago", msg: "Sent you a message", avatar: "Avatar wrap.png" },
  ];

  return (
    <div className="head">
      <div className="search-box">
        <input type="search" placeholder="Enter Search Keyword" />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="user">
        <div className="notification">
          <img src="/images/notification.png" alt="Bell" onClick={() => setShowNotifications(!showNotifications)} style={{ cursor: 'pointer' }} />
          {showNotifications && (
            <div className="dropdown">
              <div className="head">
                <h3>Notifications <span>{notificationsList.length}</span></h3>
                <img className="closeBtn" src="/images/x.png" alt="Close" onClick={() => setShowNotifications(false)} />
              </div>
              <div className="messages">
                {notificationsList.map((item) => (
                  <div className="message" key={item.id}>
                    <img src={`/images/${item.avatar}`} alt="Avatar" />
                    <div className="content">
                      <h3>{item.name} <span>{item.time}</span></h3>
                      <p>{item.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="profile">
          <div id="profileAvatar" className="avatar">{firstLetter}</div>
          <p id="profileName">{user.username.toUpperCase()}</p>
          <i></i>
        </div>
      </div>
    </div>
  );
}





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


                
                <Header />











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