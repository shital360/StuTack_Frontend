import "../Style/Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing-container">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          🎓 <span>SIMS</span>
        </div>

        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li>
            <Link to="/login" className="login-btn">Login</Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-text">
          <h1>
            Modern Student Information <br />
            Management System
          </h1>

          <p>
            Streamline your educational institution's workflow with our
            comprehensive student management platform. Manage records,
            attendance, results, and improve outcomes.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="primary-btn">
              Get Started
            </Link>
            <Link to="/login" className="secondary-btn">
              Sign In
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            alt="Students Illustration"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-row">
        <h2>Everything You Need to Manage Students</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="icon blue">👥</div>
            <h3>Student Management</h3>
            <p>
              Efficiently manage student records, profiles, and academic
              information in one centralized system.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon green">📄</div>
            <h3>Course Management</h3>
            <p>
               Track courses, subjects, assignments, and grades
               with complete organization.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon purple">📊</div>
            <h3>Analytics & Results</h3>
            <p>
              Generate detailed analytics and reports to monitor
              student performance and trends.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon orange">📘</div>
            <h3>Attendance Tracking</h3>
            <p>
              Monitor student attendance with automated tracking
              and real-time reports.
            </p>
          </div>
        </div>
        
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <h2>About EduTrack</h2>
        <p>
          EduTrack is a centralized student information management system
          designed for schools and colleges to manage student records,
          attendance, courses, and results with accuracy and security.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Student Information Management System</p>
      </footer>

    </div>
  );
};

export default Landing;
