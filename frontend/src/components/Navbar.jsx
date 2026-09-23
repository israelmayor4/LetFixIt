import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar({ activePage, onLogout }) {
    const { user } = useAuth();

    const links = [
        { name: "Dashboard", path: "/dashboard", logo: "dashboard.svg" },
        { name: "Service", path: "/service", logo: "services.svg" },
        { name: "Booking", path: "/booking", logo: "bookings.svg" },
        { name: "Wallet", path: "/wallet", logo: "wallet.svg" },
        { name: "Conversations", path: "/conversation", logo: "Chat.svg" },
        { name: "Profile", path: "/profile", logo: "profile.svg" },
    ];

    return (
        <div className="navbar">
            <h1 className="logo">LetFixIt</h1>

            <div className="nav-links">
                {links.map((link) => (
                    <Link
                        key={link.name}
                        to={link.path}
                        className={activePage === link.name ? "active" : ""}
                    >
                        <img src={`/images/${link.logo}`} alt="" />
                        {link.name}
                    </Link>
                ))}
            </div>

            <div className="nav-user">
                <div className="support">
                    <img src="/images/fi_headphones.svg" alt="" />
                    <p>Contact Support</p>
                </div>
                <div className="logout">
                    <img src="/images/logout.svg" />
                    <button onClick={onLogout}>Logout</button>
                </div>

            </div>
        </div>
    );
}

export default Navbar;