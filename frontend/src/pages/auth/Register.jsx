import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";
// import googleIcon from '../../assets/google.svg'; 



function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
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
            // Register to different endpoints based on role
            const endpoint = formData.role === "handyman"
                ? "/api/handymen/register"
                : "/api/auth/register";

            const response = await API.post("/api/auth/register", formData);
            login(response.data);

            navigate("/dashboard");

        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
    // Redirects directly to your Express backend route
    window.location.href = 'http://localhost:5000/auth/google';
  };

    return (
        /* Added className="form-cont" to catch your core layout and pseudo-element styles */
        /* Added "register-page" so we can override just the background image in CSS */
        <div className="form-cont register-page" id="main-container">
            <form onSubmit={handleSubmit} id="userSignIn">
                <h2 style={{ fontSize: "36px", fontWeight: "600" }}>Sign Up</h2>
                <p style={{ marginBottom: "24px", marginTop: "16px" }}>
                    Start your 30-days free trial
                </p>

                {error && <div className="error-msg">{error}</div>}

                <label style={{ display: "block" }}>Full Name*</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter your full name"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <label style={{ display: "block" }}>Email*</label>
                <input
                    type="email"
                    id="e-mail"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <br />

                <label style={{ display: "block" }}>Password*</label>
                <input
                    style={{ marginBottom: "4px" }}
                    type="password"
                    id="password"
                    placeholder="Create a Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <label style={{ display: "block", color: '#FCFCFD' }}>Must be more than 8 characters</label>
                <br />

                <button style={{ marginBottom: "16px"}} type="submit" disabled={loading}>
                    {loading ? "Creating account..." : "Create account"}
                </button>

                 <button style={{ marginBottom: "32px" }} className="google-btn" type="button" onClick={handleGoogleSignIn}>
          <img src='/images/google.svg' alt="" />
          Sign in with Google
      </button> 

                {/* Updated text to point back to the login page */}
                <p style={{ textAlign: "center", fontSize: "14px", fontWeight: "400" }}>
                    Already have an account? <Link style={{color: '#F59E0B', textDecoration: 'none'}} to="/login">Log In</Link>
                </p>
            </form>
        </div>
    );

   {/*  return (
        <div className="auth-container">
            <div className="auth-box">
                <h1>LetFixIt</h1>
                <h2>Create an account</h2>
                <p>Join LetFixIt today</p>

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

                    <p>Are you a handyman? <Link to="/handyman/register">Register here</Link></p>

                    <button type="submit" disabled={loading}>
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                <p>Already have an account? <Link to="/login">Sign In</Link></p>
            </div>
        </div>
    );*/}
}

export default Register;