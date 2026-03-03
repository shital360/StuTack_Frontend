import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Login.css";

import eye from "../../assets/hide.png";
import eyeOff from "../../assets/visible.png";
import bg from "../../assets/login.png";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");

  const [roll, setRoll] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userType = role === "student" ? "Student" : "Admin";

      const payload = {
        userType,
        rollNumber: role === "student" ? roll.trim() : undefined,
        email: role === "admin" ? username.trim() : undefined,
        password: role === "admin" ? password : undefined,
      };

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Login Response:", data);

      if (data.success) {
        // Save user
        localStorage.setItem("user", JSON.stringify(data.user));

        const userRole = data.role.toLowerCase();
        localStorage.setItem("role", userRole);

        if (userRole === "student") {
          // ✅ IMPORTANT FIX (rollNumber, not rollNo)
          localStorage.setItem("rollNo", data.user.rollNumber);

          navigate("/student");
        } 
        else if (userRole === "admin") {
          navigate("/admin/dashboard");
        }

      } else {
        alert(data.message || "Login failed");
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <label className="login-label">Login as</label>
        <select
          className="login-select"
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setRoll("");
            setUsername("");
            setPassword("");
          }}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        {role === "student" && (
          <input
            type="text"
            placeholder="Roll Number"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            className="login-input"
          />
        )}

        {role === "admin" && (
          <>
            <input
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
              <img
                src={showPassword ? eyeOff : eye}
                alt="toggle"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              />
            </div>
          </>
        )}

        <button onClick={handleLogin} className="login-button">
          Login
        </button>

        <p className="login-text">
          Don't have an account?
          <span
            onClick={() => navigate("/register")}
            className="register-link"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;