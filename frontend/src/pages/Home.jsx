import { useNavigate, Link } from "react-router-dom";
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


    const journeyData = [
        {
            id: 1,
            title: "Register your service",
            desc: "Register with us and let the world see what you are good at.",
            img: "../images/popular.svg"
        },
        {
            id: 2,
            title: "Become a pro",
            desc: "Becoming a pro makes you one of our service providers.",
            img: "../images/popular.svg"
        },
        {
            id: 3,
            title: "Get job offers",
            desc: "We will help you get the best jobs and boost your popularity.",
            img: "../images/popular.svg"
        },
        {
            id: 4,
            title: "Manage your time", // Fixed "you" to "your"
            desc: "We will help you with scheduling & availability.",
            img: "../images/popular.svg"
        }
    ];


    const handymenData = [
        {
            id: 1,
            name: "Ade Brown",
            profession: "Professional Electrician",
            avatar: "Avatar.svg",
            rating: "4.5",
            jobsCount: "900 jobs",
            skills: ["AC Fix", "Rewiring", "Car Fix", "1+ more"],
            location: "Shomolu, Lokoja",
            price: "47,000"
        },
        {
            id: 2,
            name: "Ade Brown", // Replace with different profile names as needed
            profession: "Professional Electrician",
            avatar: "Avatar.svg",
            rating: "4.5",
            jobsCount: "900 jobs",
            skills: ["AC Fix", "Rewiring", "Car Fix", "1+ more"],
            location: "Shomolu, Lokoja",
            price: "47,000"
        },
        {
            id: 3,
            name: "Ade Brown",
            profession: "Professional Electrician",
            avatar: "Avatar.svg",
            rating: "4.5",
            jobsCount: "900 jobs",
            skills: ["AC Fix", "Rewiring", "Car Fix", "1+ more"],
            location: "Shomolu, Lokoja",
            price: "47,000"
        }
    ];

    const dealsData = [
        {
            id: 1,
            serviceName: "AC Installation",
            price: "47,000",
            img: "yellowNaira.svg"
        },
        {
            id: 2,
            serviceName: "AC Installation",
            price: "47,000",
            img: "yellowNaira.svg"
        }
    ];

    const reviewsData = [
        {
            id: 1,
            name: "Ade Brown",
            time: "1 month ago",
            avatar: "Avatar.svg",
            rating: 4, // Represents 4 stars
            text: "It was a great experience using this platform. I mean all I had to do was check out the service man profile and book a fix."
        },
        {
            id: 2,
            name: "Ade Brown",
            time: "1 month ago",
            avatar: "Avatar.svg",
            rating: 2,
            text: "You want conveniency? This is the most convenient way of getting your problem and job done. All you literarily have to do is book."
        },
        {
            id: 3,
            name: "Ade Brown",
            time: "1 month ago",
            avatar: "Avatar.svg",
            rating: 4,
            text: "Been experiencing issues with my TV and Service Router, with just a single click, I had it repaired after trying to get someone to help for over 2 months."
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


                <div className="handyman">
                    {/* Left column containing informational text, card grid loops, and action button */}
                    <div className="left cont">
                        <h2>Handyman Journey</h2>
                        <p>As a service man you can work with us using these steps:</p>

                        <div className="card-cont">
                            {journeyData.map((step) => (
                                <div className="card" key={step.id}>
                                    {/* Dynamically sources all step graphics right out of your public folder */}
                                    <img src={`/images/${step.img}`} alt={`${step.title} icon`} />
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Cleaned up button structure using a React Router navigation path link */}
                        {/* <Link to="/register-pro" className="cta-link-btn"> */}
                        <button type="button"
                            onClick={() => navigate("/handyman/login")}
                        >Become a Pro</button>
                        {/* </Link> */}
                    </div>

                    {/* Right column featuring your handyman showcase graphic layout */}
                    <div className="right img">
                        <img src="../images/userSignInImg.png" alt="Handyman journey showcase" />
                    </div>
                </div>



            </div>



            {/* FIFTH SECTION */}



            <div className="fifth">
                <h1>Featured Handymen</h1>

                <div className="card-cont">
                    {handymenData.map((handyman) => (
                        <div className="card" key={handyman.id}>

                            {/* Top Area: Profile Header Info */}
                            <div className="top">
                                <img src={`/images/${handyman.avatar}`} alt={`${handyman.name}'s Avatar`} />
                                <div className="img-det">
                                    <h2>{handyman.name}</h2>
                                    <p>{handyman.profession}</p>
                                    <div className="rating">
                                        <img src="../images/star.svg" alt="Star Rating Icon" />
                                        <h3>{handyman.rating}</h3>
                                        <p>({handyman.jobsCount})</p>
                                    </div>
                                </div>
                            </div>

                            {/* Middle Area: Core Skills Tags */}
                            <div className="jobs">
                                {handyman.skills.map((skill, index) => (
                                    <button type="button" key={index}>{skill}</button>
                                ))}
                            </div>

                            <hr /> {/* 👈 CRITICAL React Fix: Added closing slash */}

                            {/* Details Area: Location and Rates */}
                            <div className="location">
                                <img src="../images/location.svg" alt="Location Marker Icon" />
                                <p>{handyman.location}</p>
                            </div>
                            <div className="price">
                                <img src="../images/naira.svg" alt="Price Tag Icon" />
                                <p><strong>{handyman.price}</strong>/hour</p>
                            </div>

                            {/* Bottom Area: Contact and Profile Buttons */}
                            <div className="btn">
                                {/* Wrapped buttons in valid React Router Links instead of nested <a> tags */}
                                <Link to={`/chat/${handyman.id}`} className="message-link link">
                                    <button type="button" className="message">
                                        <img src="../images/message.svg" alt="Message Icon" />
                                        Message
                                    </button>
                                </Link>

                                <Link to={`/profile/${handyman.id}`} className="profile-link link">
                                    <button type="button" className="profile">
                                        <img src="../images/user.svg" alt="Profile Icon" />
                                        View Profile
                                    </button>
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>
            </div>




            {/* SIXTH SECTION */}


            <div className="sixth">
                <h1>Top Deals</h1>
                <p>Summer is here, Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>

                <div className="card-cont">
                    {dealsData.map((deal) => (
                        <div className="card" key={deal.id}>

                            {/* 🌟 Inline style strings converted to React Objects */}
                            <h1 style={{ fontSize: "12px", fontWeight: "600", marginBottom: "6px" }}>
                                {deal.serviceName}
                            </h1>

                            <p style={{ fontSize: "12px", fontWeight: "400", marginBottom: "12px" }}>
                                <i>Get any services for</i>
                            </p>

                            <div className="price" style={{ marginBottom: "12px" }}>
                                {/* Dynamically sourcing your image badge out of the public assets directory */}
                                <img src={`../images/${deal.img}`} alt="Naira currency indicator icon" />
                                <p style={{ color: "#F59E0B", fontSize: "12px" }}>
                                    <strong>{deal.price}</strong>/hour
                                </p>
                            </div>

                            <p style={{ fontSize: "12px", fontWeight: "400", marginBottom: "24px" }}>
                                Call us or schedule a service online
                            </p>

                            {/* 🌟 Removed invalid button nesting in favor of a clean React Router Link structure */}
                            <Link to="/booking" className="deal-booking-link">
                                <button type="button">Book a Service</button>
                            </Link>

                        </div>
                    ))}
                </div>
            </div>



            {/* SEVENTH SECTION */}

            <div className="seventh">
                <h1>What They Say</h1>
                <p>
                    Summer is here, Lorem ipsum dolor sit amet, consectetur adipiscing elit Summer is here, Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit
                </p>

                <div className="card-cont">
                    {reviewsData.map((review) => (
                        <div className="card" key={review.id}>

                            {/* Top Area: Reviewer Identity Block */}
                            <div className="top">
                                <img src={`/images/${review.avatar}`} alt={`${review.name}'s Avatar`} />

                                <div className="img-det">
                                    <h2>{review.name}</h2>
                                    <p>{review.time}</p>

                                    {/* Dynamic Star Generator: Loops matching the rating number */}
                                    <div className="rating">
                                        {[...Array(review.rating)].map((_, index) => (
                                            <img key={index} src="/images/star.svg" alt="Star Rating Indicator" />
                                        ))}
                                    </div>
                                </div>

                            </div>

                            {/* Bottom Area: Review Message Content */}
                            <p>{review.text}</p>

                        </div>
                    ))}
                </div>
            </div>



            {/* HOW IT WORKS */}
            <footer>
                {/* 🌟 Changed id="eight" to className="eight" */}
                <div className="eight">
                    <div className="right">
                        <h1>Join us and start enjoying our premium services</h1>
                        <p>Join over 4,000+ Service men, and get started with the best platform to showcase your quality to the world</p>
                    </div>

                    <div className="left">
                        {/* Kept plain structural tags without router link elements as requested */}
                        <button type="button">
                            <a href="#get-started">Get Started</a>
                        </button>
                    </div>
                </div>

                {/* 🌟 Changed id="ninth" to className="ninth" */}
                <div className="ninth">
                    <div className="right">
                        <h1>LetFixIt</h1>
                        <p>Easy fixing of problems by hiring competent service men</p>
                    </div>

                    <div className="left">
                        <div className="product">
                            <p>Product</p>
                            <ul>
                                <li>Features</li>
                                <li>Pricing</li>
                            </ul>
                        </div>

                        <div className="company">
                            <p>Company</p>
                            <ul>
                                <li>About Us</li>
                                <li>Contact</li>
                            </ul>
                        </div>

                        <div className="resources">
                            <p>Resources</p>
                            <ul>
                                <li>Blogs</li>
                                <li>Newsletter</li>
                                <li>Events</li>
                                <li>Help Centre</li>
                                <li>Tutorials</li>
                                <li>Support</li>
                            </ul>
                        </div>

                        <div className="legal">
                            <p>Legal</p>
                            <ul>
                                <li>Terms</li>
                                <li>Privacy</li>
                                <li>Cookies</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 🌟 Changed id="tenth" to className="tenth" */}
                <div className="tenth">
                    <div className="socials">
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                            <img src="/images/twitter.svg" alt="Twitter Profile" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                            <img src="/images/linkeldn.svg" alt="LinkedIn Profile" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">
                            <img src="/images/facebook.svg" alt="Facebook Profile" />
                        </a>
                    </div>
                </div>
            </footer>

        </div>
    );
}

export default Home;