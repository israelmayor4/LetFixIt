import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";

function HandymanRegister() {
    const [currentStep, setCurrentStep] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Screen 1 — Basic Details
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Screen 2 — Profession
    const [jobTitle, setJobTitle] = useState("");
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");
    const [rate, setRate] = useState("");

    // Screen 3 — Bio and Image
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState("");

    // Screen 4 — Skills and Certification
    const [primarySkill, setPrimarySkill] = useState("");
    const [specificSkills, setSpecificSkills] = useState("");
    const [certification, setCertification] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const steps = [
        "Basic Details",
        "Profession",
        "Professional Bio",
        "Skills & Certification"
    ];

    const professionsData = [
        { id: 1, jobTitle: "Electrician", desc: "Wiring, repairs , Installation", img: "elect.svg" },
        { id: 2, jobTitle: "Art & Painting", desc: "Art, designs, interior and exterior painting", img: "art.svg" },
        { id: 3, jobTitle: "Cleaning & Maintenance", desc: "Decoration, accessories", img: "clean.svg" }, // Fixed "\$" to "&" typo
        { id: 4, jobTitle: "Plumbing", desc: "Pipe repairs, installations, leaks", img: "plumb.svg" },
        { id: 5, jobTitle: "Appliances", desc: "Home appliance and gadgets repair", img: "app.svg" },
        { id: 6, jobTitle: "Carpentry", desc: "Furniture, doors, windows, roofing.", img: "carp.svg" },
        { id: 7, jobTitle: "Cooling & HVAC Services", desc: "AC installation, maintenance", img: "cool.svg" }
    ];

    const handleNext = () => {
        setError(null);

        if (currentStep === 1) {
            if (!username || !email || !password) {
                setError("Please fill in all fields");
                return;
            }
            if (password.length < 8) {
                setError("Password must be at least 8 characters");
                return;
            }
        }

        if (currentStep === 2) {
            if (!jobTitle) {
                setError("Please fill in all fields");
                return;

                // 
            }
        }

        if (currentStep === 3) {
            if (!avatar || !location || !phone || !rate) {
                setError("Please write a short bio");
                return;
            }
        }

        setCurrentStep(currentStep + 1);
    };

    const handleSubmit = async () => {
        if (!primarySkill || !specificSkills) {
            setError("Please fill in all fields");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const payload = {
                username,
                email,
                password,
                jobTitle,
                location,
                phone,
                rate: Number(rate),
                bio,
                avatar,
                services: specificSkills.split(",").map((s) => s.trim()),
                certification
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
            <div className="side-img">
                <img src="/images/SignupImg.png" alt="" />
            </div>

            <div className="auth-box register-box">

                {/* Header */}
                <div className="head">
                    <h1>LetFixIt</h1>
                    <p>
                        Already have an account?{' '}
                        <a href="/handyman/login">Log In</a>
                    </p>
                </div>


                {/* Progress bar */}
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${(currentStep / steps.length) * 100}%` }}
                    ></div>
                </div>

                {/* Steps indicator */}
                <div className="step-indicators">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`step-dot ${currentStep === index + 1 ? "active" : ""} ${currentStep > index + 1 ? "done" : ""}`}
                        >
                            <div className="dot">
                                {currentStep > index + 1 ? "✓" : index + 1}
                            </div>
                            <p>{step}</p>
                        </div>
                    ))}
                </div>

                {error && <div className="error-msg">{error}</div>}

                {/* SCREEN 1 — Basic Details */}
                {currentStep === 1 && (
                    <div className="step-form">

                        <h2>Get Started</h2>
                        <p style={{ marginBottom: "24px", marginTop: "16px" }}>
                            Let's help you get started with your professional account.
                        </p>

                        <label style={{ display: "block" }}>Name*</label>
                        <input
                            type="text"
                            className="username" /* 🌟 Converted from id="username" */
                            placeholder="Enter your name"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <br />

                        <label style={{ display: "block" }}>Email*</label>
                        <input
                            type="email"
                            className="e-mail" /* 🌟 Converted from id="e-mail" */
                            placeholder="Enter your email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <br />

                        <label style={{ display: "block" }}>Password*</label>
                        <input
                            style={{ marginBottom: "6px" }}
                            type="password"
                            className="password" /* 🌟 Converted from id="password" */
                            placeholder="Create a Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <br />
                        <p style={{ marginBottom: "8%" }}>Must be at least 8 characters</p>



                        {/* <div className="input-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Minimum 6 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div> */}
                    </div>
                )}

                {/* SCREEN 2 — Profession */}
                {currentStep === 2 && (

                    <div className="step-form">
                        <h2>Profession</h2>
                        <p style={{ marginBottom: "24px", marginTop: "16px" }}>
                            Select profession that best describes you
                        </p>

                        <div className="profession-cont">
                            {professionsData.map((prof) => (
                                <div
                                    key={prof.id}
                                    /* 🌟 Dynamically adds an 'selected' class if clicked so you can highlight it in CSS */
                                    // className={`profession ${selectedProfession === prof.id ? 'selected' : ''}`}
                                    // onClick={() => setSelectedProfession(prof.id)}
                                    className={`profession ${jobTitle === prof.jobTitle ? 'selected' : ''}`}


                                    value={jobTitle}
                                    onClick={() => setJobTitle(prof.jobTitle)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {/* Grabs graphics safely from your public folder layout */}
                                    <img src={`/images/${prof.img}`} alt={`${prof.title} option banner`} />

                                    <div className="details">
                                        {/* 🌟 Changed id="job-title" to className="job-title" */}
                                        <h2 className="job-title">{prof.jobTitle}</h2>
                                        <p>{prof.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>




                    </div>


                    // <div className="step-form">
                    //     <div className="input-group">
                    //         <label>Job Title / Profession</label>
                    //         <select
                    //             value={jobTitle}
                    //             onChange={(e) => setJobTitle(e.target.value)}
                    //         >
                    //             <option value="">Select your profession</option>
                    //             <option value="electrician">Electrician</option>
                    //             <option value="plumbing">Plumbing</option>
                    //             <option value="carpentry">Carpentry</option>
                    //             <option value="appliances">Appliances</option>
                    //             <option value="cleaning">Cleaning & Maintenance</option>
                    //             <option value="art & painting">Art & Painting</option>
                    //         </select>
                    //     </div>
                    //     <div className="input-group">
                    //         <label>Location</label>
                    //         <input
                    //             type="text"
                    //             placeholder="e.g Lokoja, Kogi"
                    //             value={location}
                    //             onChange={(e) => setLocation(e.target.value)}
                    //         />
                    //     </div>
                    //     <div className="input-group">
                    //         <label>Phone Number</label>
                    //         <input
                    //             type="text"
                    //             placeholder="e.g +234 902000000"
                    //             value={phone}
                    //             onChange={(e) => setPhone(e.target.value)}
                    //         />
                    //     </div>
                    //     <div className="input-group">
                    //         <label>Hourly Rate (₦)</label>
                    //         <input
                    //             type="number"
                    //             placeholder="e.g 47000"
                    //             value={rate}
                    //             onChange={(e) => setRate(e.target.value)}
                    //         />
                    //     </div>
                    // </div>
                )}

                {/* SCREEN 3 — Professional Bio and Image */}
                {currentStep === 3 && (


                    <div className="step-form">
                        <h2>Professional Bio</h2>
                        <p style={{ marginBottom: "24px", marginTop: "16px" }}>
                            Upload profile image and fill other details.
                        </p>

                        {/* 🌟 CUSTOM DESIGNED AVATAR UPLOAD CARD 🌟 */}
                        <div className="avatar-upload-section" style={{ marginBottom: '24px', textAlign: 'center' }}>
                            <label htmlFor="avatar-input" className="avatar-dropzone" style={{ cursor: 'pointer' }}>
                                {avatar ? (
                                    /* If an image is selected, show a preview of it */
                                    <div className="avatar-preview-wrapper">
                                        <img src={avatar} alt="Profile Preview" className="avatar-preview-img" />
                                        <p style={{ color: '#196D6D', marginTop: '8px', fontSize: '14px' }}>Change Photo</p>
                                    </div>
                                ) : (
                                    /* Default placeholder graphic layout when empty */
                                    <div className="avatar-placeholder-box">
                                        <div className="upload-icon-circle">
                                            <i className="fa-solid fa-cloud-arrow-up"></i>
                                        </div>
                                        <h3>Upload Profile Picture</h3>
                                        <p>PNG, JPG up to 5MB</p>
                                    </div>
                                )}
                            </label>

                            {/* ⚠️ THE HIDDEN FILE EXPLORER INPUT ELEMENT */}
                            <input
                                type="file"
                                id="avatar-input"
                                accept="image/*" /* Limits file picker directly to images only */
                                style={{ display: 'none' }} /* Hidden from view, triggered via the label htmlFor */
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        // Converts the file data into a temporary web URL string for instant image previews
                                        setAvatar(URL.createObjectURL(file));
                                    }
                                }}
                            />
                        </div>

                        {/* Bio Description Input Block */}
                        <div className="input-fields-group" style={{ marginTop: "32px" }}>
                            <label style={{ display: "block", marginBottom: "8px" }}>Location*</label>
                            <input
                                type="text"
                                placeholder="e.g. Shomolu, Lagos"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />

                            <label style={{ display: "block", marginTop: "16px", marginBottom: "8px" }}>Phone Number*</label>
                            <input
                                type="tel"
                                placeholder="e.g. +234..."
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />

                            <label style={{ display: "block", marginTop: "16px", marginBottom: "8px" }}>Hourly Rate (₦)*</label>
                            <input
                                type="number"
                                placeholder="e.g. 5000"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                required
                            />
                        </div>

                    </div>



                    // <div className="step-form">
                    //     <div className="input-group">
                    //         <label>Profile Image URL</label>
                    //         <input
                    //             type="text"
                    //             placeholder="Paste image URL (optional)"
                    //             value={avatar}
                    //             onChange={(e) => setAvatar(e.target.value)}
                    //         />
                    //         {avatar && (
                    //             <img
                    //                 src={avatar}
                    //                 alt="Preview"
                    //                 className="avatar-preview"
                    //             />
                    //         )}
                    //     </div>
                    //     <div className="input-group">
                    //         <label>Professional Bio</label>
                    //         <textarea
                    //             placeholder="Tell users about yourself, your experience and what makes you stand out..."
                    //             value={bio}
                    //             onChange={(e) => setBio(e.target.value)}
                    //             rows={5}
                    //         />
                    //     </div>
                    // </div>
                )}

                {/* SCREEN 4 — Skills and Certification */}
                {currentStep === 4 && (
                    <div className="step-form">

                        <h2>Skills & Certifications</h2>
                        <p style={{marginBottom: "16px", marginTop: "16px"}}>What can you actually do?</p>
                    
                        <div className="input-group">
                            <label style={{ display: "block", marginTop: "16px", marginBottom: "8px" }}>Primary Skill</label>
                            <input
                                type="text"
                                placeholder="e.g House Wiring"
                                value={primarySkill}
                                onChange={(e) => setPrimarySkill(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label style={{ display: "block", marginTop: "16px", marginBottom: "8px" }}>Specific Skills</label>
                            <input
                            style={{marginBottom: '1px'}}
                                type="text"
                                placeholder="e.g Solar Installation, Fault Finding, AC Wiring"
                                value={specificSkills}
                                onChange={(e) => setSpecificSkills(e.target.value)}
                            />
                            <small>Separate each skill with a comma</small>
                        </div>
                        <div className="input-group">
                            <label>Certification (optional)</label>
                            <input
                                type="text"
                                placeholder="e.g Certified Electrician — COREN 2021"
                                value={certification}
                                onChange={(e) => setCertification(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {/* Navigation buttons */}
                <div className="register-footer">
                    {currentStep > 1 && (
                        <button
                            className="outline-btn"
                            onClick={() => setCurrentStep(currentStep - 1)}
                        >
                            ← Back
                        </button>
                    )}

                    {currentStep < 4 && (
                        <button
                            className="fill-btn"
                            onClick={handleNext}
                        >
                            Next →
                        </button>
                    )}

                    {currentStep === 4 && (
                        <button
                            className="fill-btn"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Create Account 🎉"}
                        </button>
                    )}
                </div>

                {/* <p style={{ textAlign: "center", marginTop: "16px" }}>
                    Already have an account? <Link to="/handyman/login">Sign In</Link>
                </p>
                <p style={{ textAlign: "center" }}>
                    Are you a user? <Link to="/register">Register here</Link>
                </p> */}

            </div>
        </div>
    );
}

export default HandymanRegister;