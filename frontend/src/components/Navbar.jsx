import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar({ activePage, onLogout }) {
    const { user } = useAuth();

    const links = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Service", path: "/service" },
        { name: "Booking", path: "/booking" },
        { name: "Profile", path: "/profile" },
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
                        {link.name}
                    </Link>
                ))}
            </div>

            <div className="nav-user">
                <div className="avatar">
                    {user?.username?.[0]?.toUpperCase()}
                </div>
                <p>{user?.username?.split(" ")[0]}</p>
                <button onClick={onLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Navbar;