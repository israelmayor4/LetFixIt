import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";

function HandymanLogin() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
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
            const response = await API.post("/api/handymen/login", formData);
            login(response.data);
            navigate("/handyman/dashboard");

        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        //     <div className="auth-container">
        //         <div className="auth-box">
        //             <h1>LetFixIt</h1>
        //             <h2>Handyman Login</h2>
        //             <p>Sign in to manage your bookings</p>

        //             {error && <div className="error-msg">{error}</div>}

        //             <form onSubmit={handleSubmit}>
        //                 <div className="input-group">
        //                     <label>Email</label>
        //                     <input
        //                         type="email"
        //                         name="email"
        //                         placeholder="Enter your email"
        //                         value={formData.email}
        //                         onChange={handleChange}
        //                         required
        //                     />
        //                 </div>

        //                 <div className="input-group">
        //                     <label>Password</label>
        //                     <input
        //                         type="password"
        //                         name="password"
        //                         placeholder="Enter your password"
        //                         value={formData.password}
        //                         onChange={handleChange}
        //                         required
        //                     />
        //                 </div>

        //                 <button type="submit" disabled={loading}>
        //                     {loading ? "Signing in..." : "Sign In"}
        //                 </button>
        //             </form>

        //             <p>Don't have an account? <Link to="/handyman/register">Register as Handyman</Link></p>
        //             <p>Are you a user? <Link to="/login">User Login</Link></p>
        //         </div>
        //     </div>
        // );



        <div className="form-cont handUp">
            {/* 🌟 Changed id="signIn" to className="signIn" */}

            {error && <div className="error-msg">{error}</div>}

            <form onSubmit={handleSubmit} className="signIn">

                <h2 style={{ fontSize: "36px", fontWeight: "600" }}>Log In</h2>
                <p style={{ marginBottom: "24px", marginTop: "16px" }}>
                    Welcome back! Please enter your details.
                </p>

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
                    style={{ marginBottom: "24px" }}
                    type="password"
                    id="password"
                    placeholder="Create a Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <br />

                <button style={{ marginBottom: "16px" }} type="submit">
                    {loading ? "Signing in..." : "Sign In"}
                </button>

                <button style={{ marginBottom: "32px" }} className="google-btn" type="button">
                    <img src="/images/google.svg" alt="Google Icon" />
                    Sign in with Google
                </button>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ textAlign: "center", fontSize: "14px", fontWeight: "400" }}>
                        Don't have an account?{' '}
                        {/* Kept a plain anchor element as requested, updated to your placeholder target */}
                        <Link style={{ textDecoration: "none", color: "#F59E0B" }} to="/handyman/register">
                            Sign Up
                        </Link>
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: "400" }}>Are you a user? <Link style={{ textDecoration: "none", color: "#F59E0B" }} to="/login">
                        User Login
                    </Link>
                    </p>
                </div>



            </form>
        </div>
    );
}

export default HandymanLogin;