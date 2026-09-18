import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const statsData = [
        { id: 1, img: "../images/jobComplete.svg", title: "1000+", desc: "Jobs Completed" },
        { id: 2, img: "../images/avgRating.svg", title: "4.8", desc: "Average Rating" },
        { id: 3, img: "../images/verPro.svg", title: "100+", desc: "Verified Professionals" },
        { id: 4, img: "../images/cliSat.svg", title: "87%", desc: "Client Satisfaction" },
    ];


    //   POPULR CATEGORIES

    const categoriesData = [
        {
            id: 1,
            title: "Electrical",
            desc: "Wiring, tech gadget repairs, smart device installation.",
            img: "../images/popular.svg"
        },
        {
            id: 2,
            title: "Plumbing",
            desc: "Pipe repairs, installations, drainage leaks & repairs",
            img: "../images/popular.svg" // Unified to use your clean public asset path
        },
        {
            id: 3,
            title: "HVAC Services", // Fixed the typo from HAVC to HVAC
            desc: "AC installation, maintenance, repair, cooling repair.",
            img: "../images/popular.svg"
        },
        {
            id: 4,
            title: "Carpentry",
            desc: "Furniture, doors, windows, roofing.",
            img: "../images/popular.svg"
        }
    ];


    //   HOW WE WORK

    const stepsData = [
        {
            id: 1,
            title: "Tell us the job",
            desc: "What technical problem do you want solved?",
            img: "../images/popular.svg"
        },
        {
            id: 2,
            title: "Pick a pro",
            desc: "Select from a catalogue of professional service men.",
            img: "../images/popular.svg"
        },
        {
            id: 3,
            title: "Book and relax",
            desc: "Book a fix and relax, everything will be done to perfection",
            img: "../images/popular.svg"
        },
        {
            id: 4,
            title: "Spread the word",
            desc: "Book a fix and relax, everything will be done to perfection", // Optional: Update description text later if needed
            img: "../images/popular.svg"
        }
    ];

    return (
        <div className="home">

            <div className="first-section">
                {/* NAVBAR */}
                <div className="home-nav">
                    <h1 className="let-logo">LetFixIt</h1>
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
                        <input type="search" placeholder="What services do you need" />
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <button>Find a Handyman</button>
                    </div>

                </div>


            </div>

            {/* SECOND SECTION */}

            <div className="second">
                {statsData.map((stat) => (
                    <div className="card" key={stat.id}>
                        {/* Grabbing static assets safely directly from your public/images/ folder */}
                        <img src={`/images/${stat.img}`} alt={`${stat.desc} icon`} />
                        <h3>{stat.title}</h3>
                        <p>{stat.desc}</p>
                    </div>
                ))}
            </div>


            {/* THIRD SECTION */}

            <div className="third">
                <h1>Popular Categories</h1>

                <div className="card-cont">
                    {categoriesData.map((category) => (
                        <div className="card" key={category.id}>
                            {/* Grabs the icons dynamically from your public/images directory */}
                            <img src={`/images/${category.img}`} alt={`${category.title} category icon`} />
                            <h3>{category.title}</h3>
                            <p>{category.desc}</p>
                        </div>
                    ))}
                </div>
            </div>



            {/* FOURTH SECTION */}


            <div className="fourth">
                <h1>How We Work</h1>
                <p>As a Client you can work with us using these steps:</p>

                <div className="client">

                    {/* Left column featuring your showcase graphic layout */}
                    <div className="left img">
                        <img src="/images/frame.png" alt="Client workflow showcase" />
                    </div>

                    {/* Right column containing informational text, card grid loops, and action button */}
                    <div className="right cont">
                        <h2>Client Journey</h2>
                        <p>As a Client you can work with us using these steps:</p>

                        <div className="card-cont">
                            {stepsData.map((step) => (
                                <div className="card" key={step.id}>
                                    {/* Dynamically sources all step graphics right out of your public folder */}
                                    <img src={`/images/${step.img}`} alt={`${step.title} icon`} />
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* 🌟 Cleaned up button structure using a React Router navigation path link */}
                        
                         <button type="button" onClick={() => navigate("/register")}>Book an appointment</button>
                        

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