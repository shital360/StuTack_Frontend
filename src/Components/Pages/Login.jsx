import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 👇 Assets
import eye from "../../assets/hide.png";
import eyeOff from "../../assets/visible.png";
import bg from "../../assets/login.png";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student"); // student/admin select
  const [roll, setRoll] = useState(""); // student roll
  const [username, setUsername] = useState(""); // admin email
  const [password, setPassword] = useState(""); // admin password

  const handleLogin = async () => {
    if (role === "student") {
      if (roll.trim() === "") {
        alert("Please enter roll number");
        return;
      }
      // save student role & roll
      localStorage.setItem("role", "student");
      localStorage.setItem("roll", roll.trim());
      navigate("/results"); // student page
    } else {
      // admin login validation
      if (username.trim() === "" || password.trim() === "") {
        alert("Please enter email & password");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        });

        const data = await res.json();
        console.log("LOGIN RESPONSE:", data);

        if (data.success) {
          localStorage.setItem("role", "admin");
          navigate("/dashboard"); // admin page
        } else {
          alert(data.message || "Login failed");
        }
      } catch (err) {
        console.error(err);
        alert("Server error");
      }
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: "150px",
      }}
    >
      {/* Login Card */}
      <div
        style={{
          width: "360px",
          padding: "30px",
          borderRadius: "12px",
          background:
            "linear-gradient(to bottom, rgba(180,205,235,0.95), rgba(110,160,220,0.95))",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "white", marginBottom: "20px" }}>Login</h2>

        {/* ROLE SELECT */}
        <label style={{ color: "white" }}>Login as</label>
        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setRoll("");
            setUsername("");
            setPassword("");
          }}
          style={{ width: "100%", margin: "10px 0", padding: "8px" }}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        {/* STUDENT ROLL */}
        {role === "student" && (
          <>
            <input
              type="text"
              placeholder="Roll Number"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                border: "none",
                borderRadius: "6px",
              }}
            />
          </>
        )}

        {/* ADMIN EMAIL/PASSWORD */}
        {role === "admin" && (
          <>
            <input
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                border: "none",
                borderRadius: "6px",
              }}
            />
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  paddingRight: "45px",
                  marginBottom: "15px",
                  border: "none",
                  borderRadius: "6px",
                }}
              />
              <img
                src={showPassword ? eyeOff : eye}
                alt="toggle visibility"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "22px",
                  height: "22px",
                  cursor: "pointer",
                }}
              />
            </div>
          </>
        )}

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            background: "#4caf50",
            border: "none",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <p style={{ marginTop: "15px", color: "white" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "yellow", cursor: "pointer" }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
