import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";

function Login() {
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
            const response = await API.post("/api/auth/login", formData);
            login(response.data); // save user to context and localStorage

            // Redirect based on role
            if (response.data.role === "handyman") {
                navigate("/handyman/dashboard");
            } else {
                navigate("/dashboard");
            }

        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="form-cont">
            <form onSubmit={handleSubmit} id="userSignIn">
                <h2 style={{ fontSize: "36px", fontWeight: "600" }}>Log In</h2>
                <p style={{ marginBottom: "24px", marginTop: "16px" }}>
                    Welcome back! Please enter your details.
                </p>

                <label style={{ display: "block" }}>Email</label>
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

                <label style={{ display: "block" }}>Password</label>
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

                <button style={{ marginBottom: "16px" }} type="submit" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                </button>

                {/* Note: changed "class" to "className" and added closing "/" to img */}
                {/* <button style={{ marginBottom: "32px" }} className="google-btn" type="button">
          <img src="./IMAGES/google-icon.png" alt="" />
          Sign in with Google
      </button> */}

                <p style={{ textAlign: "center", fontSize: "14px", fontWeight: "400" }}>
                    Don't have an account? <Link style={{color: '#F59E0B', textDecoration: 'none'}} to="/register">Sign Up</Link>
                </p>
            </form>
        </div>

    );


   {/*} return (
         <div className="auth-container">
            <div className="auth-box">
                <h1>LetFixIt</h1>
                <h2>Welcome back</h2>
                <p>Sign in to your account</p>

                {error && <div className="error-msg">{error}</div>}

                <form onSubmit={handleSubmit}>
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
                            value={formData.password}  // 👈 should be formData.password
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div> 

    )*/}
}

export default Login;