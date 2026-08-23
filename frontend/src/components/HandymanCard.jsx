import { useNavigate } from "react-router-dom";

function HandymanCard({ data }) {
    const navigate = useNavigate();

    return (
        <div className="card">
            <div className="card-top">
                <img
                    src={data.avatar || "https://via.placeholder.com/50"}
                    alt={data.username}
                />
                <div className="card-info">
                    <h2>{data.username}</h2>
                    <p>{data.jobTitle}</p>
                    <div className="rating">
                        <span>⭐</span>
                        <h3>{data.rating || "New"}</h3>
                        <p>({data.totalJobs} jobs)</p>
                    </div>
                </div>
            </div>

            <div className="card-services">
                {data.services?.slice(0, 3).map((service, index) => (
                    <button key={index}>{service}</button>
                ))}
                {data.services?.length > 3 && (
                    <button>{data.services.length - 3}+ more</button>
                )}
            </div>

            <hr />

            <div className="card-location">
                <span>📍</span>
                <p>{data.location || "Location not set"}</p>
            </div>

            <div className="card-price">
                <span>💰</span>
                <p><strong>₦{data.rate?.toLocaleString()}</strong>/hour</p>
            </div>

            <div className="card-btns">
                <button className="msg-btn">
                    💬 Message
                </button>
                <button
                    className="profile-btn"
                    onClick={() => navigate(`/handyman/${data._id}`)}
                >
                    👤 View Profile
                </button>
            </div>
        </div>
    );
}

export default HandymanCard;