import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">

            <div className="first-section">
                {/* NAVBAR */}
                <div className="home-nav">
                    <h1 className="logo">LetFixIt</h1>
                    <div className="home-nav-links">
                        <a href="#about">About</a>
                        <a href="#services">Services</a>
                        <a href="#for-pro">For Pro</a>
                        <a href="#support">Support</a>

                    </div>
                    <div className="home-nav-btns">
                        <button
                            className="outline-btn"
                            onClick={() => navigate("/login")}
                        >
                            User Login
                        </button>
                        <button
                            className="fill-btn"
                            onClick={() => navigate("/handyman/login")}
                        >
                            Handyman Login
                        </button>
                    </div>
                </div>

                <div className="first-section-content">
                    <h1>Book Trusted <span>Handymen</span> in Minutes.</h1>

                    <div className="avg-rating">
                            <h3>⭐ 4.8</h3>
                            <p>Average rating</p>
                    </div>

                    <p>From plumbing to electricals, find vetted professionals near you.</p>

                    <div className="avg-job">
          
                        <h3>1000+</h3>
                        <p>Jobs completed</p>
                    </div>

                    <div className="search-box">

                        <i class="fa-solid fa-magnifying-glass"></i>
                        <button>Find a Handyman</button>
                    </div>

                </div>


            </div>

            {/* HERO SECTION */}
            <div className="hero">
                <div className="hero-text">
                    <h1>Find Trusted Handymen <span>Near You</span></h1>
                    <p>Book verified professionals for all your home repair and maintenance needs. Fast, reliable and affordable.</p>
                    <div className="hero-btns">
                        <button
                            className="fill-btn"
                            onClick={() => navigate("/register")}
                        >
                            Get Started as User
                        </button>
                        <button
                            className="outline-btn"
                            onClick={() => navigate("/handyman/register")}
                        >
                            Join as Handyman
                        </button>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="hero-card">
                        <div className="hero-card-avatar">A</div>
                        <div>
                            <h4>Ade Brown</h4>
                            <p>Professional Electrician</p>
                            <p>⭐ 4.5 (900 jobs)</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SERVICES SECTION */}
            <div className="home-section" id="services">
                <h2>Our Services</h2>
                <p>We cover a wide range of home repair and maintenance services</p>

                <div className="services-grid">
                    {[
                        { icon: "⚡", title: "Electrical", desc: "Wiring, repairs, solar installation" },
                        { icon: "🔧", title: "Plumbing", desc: "Pipe repairs, installations, leaks" },
                        { icon: "🔨", title: "Carpentry", desc: "Furniture, doors, windows, roofing" },
                        { icon: "📺", title: "Appliances", desc: "Home appliance and gadgets repair" },
                        { icon: "🧹", title: "Cleaning", desc: "Deep cleaning, fumigation, maintenance" },
                        { icon: "🎨", title: "Art & Painting", desc: "Interior and exterior painting" },
                    ].map((service) => (
                        <div key={service.title} className="service-item">
                            <div className="service-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="home-section grey" id="how-it-works">
                <h2>How It Works</h2>
                <p>Book a handyman in 3 simple steps</p>

                <div className="steps-grid">
                    {[
                        { step: "1", title: "Choose a Service", desc: "Browse and select the service you need from our wide range of categories" },
                        { step: "2", title: "Pick a Handyman", desc: "Select from our list of verified and rated professionals near you" },
                        { step: "3", title: "Book & Relax", desc: "Schedule a date and time that works for you and we'll handle the rest" },
                    ].map((item) => (
                        <div key={item.step} className="step-item-home">
                            <div className="step-circle">{item.step}</div>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA SECTION */}
            <div className="home-section cta">
                <h2>Ready to get started?</h2>
                <p>Join thousands of users who trust LetFixIt for their home repairs</p>
                <div className="hero-btns">
                    <button
                        className="fill-btn white"
                        onClick={() => navigate("/register")}
                    >
                        Create Account
                    </button>
                    <button
                        className="outline-btn white"
                        onClick={() => navigate("/handyman/register")}
                    >
                        Join as Handyman
                    </button>
                </div>
            </div>

            {/* FOOTER */}
            <div className="home-footer">
                <h2 className="logo">LetFixIt</h2>
                <p>© 2026 LetFixIt. All rights reserved.</p>
                <div className="footer-links">
                    <a href="/login">User Login</a>
                    <a href="/register">User Register</a>
                    <a href="/handyman/login">Handyman Login</a>
                    <a href="/handyman/register">Handyman Register</a>
                </div>
            </div>

        </div>
    );
}

export default Home;