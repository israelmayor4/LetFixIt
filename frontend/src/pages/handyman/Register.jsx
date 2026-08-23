import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";

function HandymanRegister() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        jobTitle: "",
        location: "",
        phone: "",
        rate: "",
        bio: "",
        services: ""
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // Convert services string to array
            const payload = {
                ...formData,
                rate: Number(formData.rate),
                services: formData.services.split(",").map((s) => s.trim())
            };

            const response = await API.post("/api/handymen/register", payload);
            login(response.data);
            navigate("/handyman/dashboard");

        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h1>LetFixIt</h1>
                <h2>Register as Handyman</h2>
                <p>Join LetFixIt and start getting bookings</p>

                {error && <div className="error-msg">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your full name"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Job Title</label>
                        <select
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select your profession</option>
                            <option value="electrician">Electrician</option>
                            <option value="plumbing">Plumbing</option>
                            <option value="carpentry">Carpentry</option>
                            <option value="appliances">Appliances</option>
                            <option value="cleaning">Cleaning & Maintenance</option>
                            <option value="art & painting">Art & Painting</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="e.g Lokoja, Kogi"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="e.g +234 902000000"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Hourly Rate (₦)</label>
                        <input
                            type="number"
                            name="rate"
                            placeholder="e.g 47000"
                            value={formData.rate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Services (comma separated)</label>
                        <input
                            type="text"
                            name="services"
                            placeholder="e.g House Wiring, Solar Installation, Fault Finding"
                            value={formData.services}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Bio</label>
                        <textarea
                            name="bio"
                            placeholder="Tell users about yourself..."
                            value={formData.bio}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                <p>Already have an account? <Link to="/handyman/login">Sign In</Link></p>
                <p>Are you a user? <Link to="/register">User Register</Link></p>
            </div>
        </div>
    );
}

export default HandymanRegister;