import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function Header() {
    const [showNotifications, setShowNotifications] = useState(false);
    const { user } = useAuth(); // 👈 use AuthContext instead of localStorage directly

    const firstLetter = user?.username?.charAt(0).toUpperCase() || "G";

    const notificationsList = [
        { id: 1, name: "Justina Alani", time: "2 mins ago", msg: "Sent you a message" },
        { id: 2, name: "Justina Alani", time: "2 mins ago", msg: "Sent you a message" },
        { id: 3, name: "Justina Alani", time: "2 mins ago", msg: "Sent you a message" },
    ];

    return (
        <div className="head">
            <div className="search-box">
                <input type="search" placeholder="Enter Search Keyword" />
                <img className="image" src="/images/search.svg" alt="Google Icon" />
                {/* <i className="fa-solid fa-magnifying-glass"></i> */}
            </div>

            <div className="user">
                <div className="notification">
                    <i
                        className="fa-solid fa-bell"
                        onClick={() => setShowNotifications(!showNotifications)}
                        style={{ cursor: "pointer", fontSize: "20px" }}
                    ></i>

                    {showNotifications && (
                        <div className="dropdown">
                            <div className="head">
                                <h3>Notifications <span>{notificationsList.length}</span></h3>
                                <i
                                    className="fa-solid fa-x closeBtn"
                                    onClick={() => setShowNotifications(false)}
                                    style={{ cursor: "pointer" }}
                                ></i>
                            </div>

                            <div className="messages">
                                {notificationsList.map((item) => (
                                    <div className="message" key={item.id}>
                                        <div className="avatar">{item.name.charAt(0)}</div>
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
                    <div className="avatar">{firstLetter}</div>
                    <p>{user?.username?.split(" ")[0]}</p>
                </div>
            </div>
        </div>
    );
}

export default Header;