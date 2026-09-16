import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import AddBookingBtn from "../../components/AddBookingBtn";

function UserBooking() {
    const [view, setView] = useState("myBookings"); // myBookings or bookNow
    const [bookings, setBookings] = useState([]);
    const [handymen, setHandymen] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedHandyman, setSelectedHandyman] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("9am");
    const [address, setAddress] = useState("");
    const [area, setArea] = useState("");
    const [problem, setProblem] = useState("");

    const location = useLocation();

    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get("action") === "book") {
            setView("bookNow");
        } else {
            setView("myBookings");
        }
        fetchBookings();
        fetchHandymen();
    }, [location.search]);

    const fetchBookings = async () => {
        try {
            const response = await API.get("/api/bookings");
            setBookings(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchHandymen = async () => {
        try {
            const response = await API.get("/api/handymen");
            setHandymen(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const specificServices = {
        electrician: ["House Wiring", "Solar Installation", "Generator Repair", "Fault Finding"],
        plumbing: ["Pipe Installation", "Burst Pipe Fix", "Drainage Clearing", "Water Heater"],
        carpentry: ["Door Installation", "Furniture Repair", "Cabinet Making", "Roofing"],
        appliances: ["Washing Machine Repair", "Fridge Repair", "TV Repair", "Microwave Repair"],
        cleaning: ["Deep Cleaning", "Fumigation", "Window Cleaning", "Post Construction"],
        "art & painting": ["Interior Painting", "Exterior Painting", "Wall Design", "Graffiti"],
    };

    const categories = [
        { label: "Electrician", value: "electrician", icon: "⚡" },
        { label: "Art & Painting", value: "art & painting", icon: "🎨" },
        { label: "Plumbing", value: "plumbing", icon: "🔧" },
        { label: "Appliances", value: "appliances", icon: "📺" },
        { label: "Carpentry", value: "carpentry", icon: "🔨" },
        { label: "Cleaning", value: "cleaning", icon: "🧹" },
    ];

    const handleConfirmBooking = async () => {
        try {
            await API.post("/api/bookings", {
                handymanId: selectedHandyman._id,
                category: selectedCategory,
                service: selectedService,
                date: selectedDate,
                time: selectedTime,
                address: `${address}, ${area}`,
                problem
            });

            alert("Booking confirmed!");
            setView("myBookings");
            fetchBookings();
            setCurrentStep(1);

        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    const statusColor = {
        "scheduled": "#f5a623",
        "in progress": "#007bff",
        "completed": "#039855",
        "cancelled": "#e00"
    };

    const steps = ["Book service", "Select service", "Select handyman", "Date & Time", "Details", "Review"];

    return (
        <div className="dashboard">
            <Navbar activePage="Booking" onLogout={handleLogout} />

            <div className="main-cont">

                {/* MY BOOKINGS SECTION */}
                {view === "myBookings" && (
                    <div>
                        <div className="dash-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <h1>My Bookings</h1>
                                <p>Manage and track your appointments</p>
                            </div>

                            <AddBookingBtn text={"+ Add Bookings"}/> 
                           




                            {/* <button
                                className="profile-btn"
                                style={{ padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer" }}
                                onClick={() => { setView("bookNow"); setCurrentStep(1); }}
                            >
                                + Add Booking
                            </button> */}
                        </div>

                        {loading && <p>Loading bookings...</p>}

                        {!loading && bookings.length === 0 && (
                            <div style={{ textAlign: "center", marginTop: "60px" }}>
                                <p style={{ color: "#888", marginBottom: "16px" }}>You have no bookings yet</p>

                                <AddBookingBtn text={" Book a Service"}/> 

                                

                                {/* <button
                                    className="profile-btn"
                                    style={{ padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer" }}
                                    onClick={() => setView("bookNow")}
                                >
                                    Book a Service
                                </button> */}
                            </div>
                        )}

                        <div className="bookings-list">
                            {bookings.map((booking) => (
                                <div key={booking._id} className="booking-card">
                                    <div className="booking-top">
                                        <div className="booking-info">
                                            <h4>{booking.handymanId?.username}</h4>
                                            <p>{booking.handymanId?.jobTitle}</p>
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
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* BOOK NOW SECTION */}
                {view === "bookNow" && (
                    <div className="book-now-form">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                            <h2>Add Booking</h2>
                            <button
                                onClick={() => setView("myBookings")}
                                style={{ background: "none", border: "1px solid #ccc", padding: "8px 16px", borderRadius: "8px", cursor: "pointer" }}
                            >
                                ← Back
                            </button>
                        </div>

                        {/* Steps bar */}
                        <div className="steps-bar">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`step-item ${currentStep === index + 1 ? "active" : ""} ${currentStep > index + 1 ? "done" : ""}`}
                                >
                                    <span className="step-num">{currentStep > index + 1 ? "✓" : index + 1}</span>
                                    <p>{step}</p>
                                </div>
                            ))}
                        </div>

                        {/* STEP 1 — Select category */}
                        {currentStep === 1 && (
                            <div className="step-content">
                                <h2>What do you need fixed?</h2>
                                <p>Choose a service category to get started</p>
                                <div className="service-cards">
                                    {categories.map((cat) => (
                                        <div
                                            key={cat.value}
                                            className={`service-card ${selectedCategory === cat.value ? "selected" : ""}`}
                                            onClick={() => setSelectedCategory(cat.value)}
                                        >
                                            <div className="icon">{cat.icon}</div>
                                            <div className="det">
                                                <h3>{cat.label}</h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STEP 2 — Select specific service */}
                        {currentStep === 2 && (
                            <div className="step-content">
                                <h2>Select a Specific Service</h2>
                                <div className="service-cards">
                                    {specificServices[selectedCategory]?.map((service) => (
                                        <div
                                            key={service}
                                            className={`service-card ${selectedService === service ? "selected" : ""}`}
                                            onClick={() => setSelectedService(service)}
                                        >
                                            <h3>{service}</h3>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STEP 3 — Select handyman */}
                        {currentStep === 3 && (
                            <div className="step-content">
                                <h2>Choose your Handyman</h2>
                                <div className="card-container">
                                    {handymen
                                        .filter((h) => h.jobTitle.toLowerCase() === selectedCategory)
                                        .map((handyman) => (
                                            <div
                                                key={handyman._id}
                                                className={`card ${selectedHandyman?._id === handyman._id ? "selected" : ""}`}
                                                onClick={() => setSelectedHandyman(handyman)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <div className="card-top">
                                                    <img
                                                        src={handyman.avatar || "https://via.placeholder.com/50"}
                                                        alt={handyman.username}
                                                    />
                                                    <div className="card-info">
                                                        <h2>{handyman.username}</h2>
                                                        <p>{handyman.jobTitle}</p>
                                                        <div className="rating">
                                                            <span>⭐</span>
                                                            <span>{handyman.rating || "New"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-location">
                                                    <span>📍</span>
                                                    <p>{handyman.location}</p>
                                                </div>
                                                <div className="card-price">
                                                    <span>💰</span>
                                                    <p><strong>₦{handyman.rate?.toLocaleString()}</strong>/hour</p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                {handymen.filter((h) => h.jobTitle.toLowerCase() === selectedCategory).length === 0 && (
                                    <p className="no-results">No handymen available for this category yet</p>
                                )}
                            </div>
                        )}

                        {/* STEP 4 — Date and Time */}
                        {currentStep === 4 && (
                            <div className="step-content">
                                <h2>Schedule your service</h2>
                                <p>Choose a date and time that works for you</p>
                                <div className="date-time-cont">
                                    <div className="input-group">
                                        <label>Select Date</label>
                                        <input
                                            type="date"
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            min={new Date().toISOString().split("T")[0]}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Select Time</label>
                                        <select onChange={(e) => setSelectedTime(e.target.value)} value={selectedTime}>
                                            {["6am","7am","8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm"].map((t) => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 5 — Details */}
                        {currentStep === 5 && (
                            <div className="step-content">
                                <h2>Booking Details</h2>
                                <p>Provide details about where the work will be done</p>
                                <div className="booking-details-cont">
                                    <div className="details-section">
                                        <p className="section-label">Service Location</p>
                                        <div className="details-row">
                                            <div className="input-group">
                                                <label>Service Address</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter address"
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label>Area/District</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter area/district"
                                                    value={area}
                                                    onChange={(e) => setArea(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="details-section">
                                        <p className="section-label">Describe the problem</p>
                                        <div className="input-group">
                                            <label>Describe Problem</label>
                                            <textarea
                                                placeholder="Enter details"
                                                value={problem}
                                                onChange={(e) => setProblem(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 6 — Review */}
                        {currentStep === 6 && (
                            <div className="step-content">
                                <h2>Review & Confirm</h2>
                                <p>Review your booking details before confirming</p>
                                <div className="review-cont">
                                    <div className="review-left">
                                        <h3>Service Details</h3>
                                        <div className="review-row">
                                            <span className="review-label">Category:</span>
                                            <span>{selectedCategory}</span>
                                        </div>
                                        <div className="review-row">
                                            <span className="review-label">Service:</span>
                                            <span>{selectedService}</span>
                                        </div>
                                        <div className="review-handyman">
                                            <img
                                                src={selectedHandyman?.avatar || "https://via.placeholder.com/50"}
                                                alt={selectedHandyman?.username}
                                            />
                                            <div className="review-handyman-info">
                                                <h4>{selectedHandyman?.username}</h4>
                                                <p>{selectedHandyman?.jobTitle}</p>
                                            </div>
                                        </div>
                                        <div className="review-row">
                                            <span className="review-label">Date:</span>
                                            <span>{selectedDate}</span>
                                        </div>
                                        <div className="review-row">
                                            <span className="review-label">Time:</span>
                                            <span>{selectedTime}</span>
                                        </div>
                                        <div className="review-row">
                                            <span className="review-label">Address:</span>
                                            <span>{address}, {area}</span>
                                        </div>
                                        <div className="review-row">
                                            <span className="review-label">Problem:</span>
                                            <span>{problem}</span>
                                        </div>
                                    </div>

                                    <div className="review-right">
                                        <div className="pricing-section">
                                            <h3>Pricing Details</h3>
                                            <div className="pricing-row">
                                                <span>Hourly rate:</span>
                                                <span>₦{selectedHandyman?.rate?.toLocaleString()}/hour</span>
                                            </div>
                                            <hr />
                                            <p className="payment-note">
                                                💡 Payment is only deducted after you confirm the job is complete.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="profile-btn"
                                    style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "none", cursor: "pointer", marginTop: "24px", fontSize: "15px" }}
                                    onClick={handleConfirmBooking}
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        )}

                        {/* Footer navigation */}
                        <div className="step-footer">
                            <p>Step <strong>{currentStep}</strong> of 6</p>
                            <div style={{ display: "flex", gap: "12px" }}>
                                {currentStep > 1 && (
                                    <button
                                        onClick={() => setCurrentStep(currentStep - 1)}
                                        style={{ padding: "10px 24px", borderRadius: "8px", border: "1px solid #ccc", cursor: "pointer", background: "white" }}
                                    >
                                        ← Previous
                                    </button>
                                )}
                                {currentStep < 6 && (
                                    <button
                                        className="profile-btn"
                                        style={{ padding: "10px 24px", borderRadius: "8px", border: "none", cursor: "pointer" }}
                                        onClick={() => {
                                            if (currentStep === 1 && !selectedCategory) {
                                                alert("Please select a category");
                                                return;
                                            }
                                            if (currentStep === 2 && !selectedService) {
                                                alert("Please select a service");
                                                return;
                                            }
                                            if (currentStep === 3 && !selectedHandyman) {
                                                alert("Please select a handyman");
                                                return;
                                            }
                                            if (currentStep === 4 && !selectedDate) {
                                                alert("Please select a date");
                                                return;
                                            }
                                            if (currentStep === 5 && (!address || !area || !problem)) {
                                                alert("Please fill in all fields");
                                                return;
                                            }
                                            setCurrentStep(currentStep + 1);
                                        }}
                                    >
                                        Next →
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserBooking;