import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Style/Register.css";

import eye from "../../assets/hide.png";
import eyeOff from "../../assets/visible.png";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formatName = (value) =>
    value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : "";

  const handleRegister = () => {
    if (!fullName.trim()) return toast.error("Full name is required");
    
    if (!username.trim()) return toast.error("Username is required");
    
    if (!email.includes("@")) 
      return toast.error("Please enter a valid email address");
    
    if (!dob) return toast.error("Date of birth is required");

    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");

    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    toast.success("Registration successful 🎉");
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  return (
    <div className="register-page">
      <div className="register-overlay">
        <div className="container">
          <h2>Register</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(formatName(e.target.value))}
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          {/* Password */}
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              <img
                src={showPassword ? eyeOff : eye}
                className="eye-icon"
                alt="toggle"
              />
            </span>
          </div>

          {/* Confirm Password */}
          <div className="password-box">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              <img
                src={showConfirmPassword ? eyeOff : eye}
                className="eye-icon"
                alt="toggle"
              />
            </span>
          </div>

          <button onClick={handleRegister}>Register</button>

          <p>
            Already have an account?{" "}
            <span className="login-link" onClick={() => navigate("/")}>
              Login
            </span>
          </p>

          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    </div>
  );
}

export default Register;