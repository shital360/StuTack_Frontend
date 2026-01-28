import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 👇 Assets
import eye from "../../assets/hide.png";
import eyeOff from "../../assets/visible.png";
import bg from "../../assets/login.png"; // Background image

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        navigate("/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      alert("Server error");
      console.log(err);
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
        justifyContent: "flex-start", // ← left align
        paddingLeft: "150px", // ← adjust distance from left
      }}
    >
      {/* Login Card */}
      <div
        style={{
          width: "360px",
          padding: "30px",
          borderRadius: "12px",
          background: "linear-gradient(to bottom, rgba(180,205,235,0.95), rgba(110,160,220,0.95))",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "white", marginBottom: "20px" }}>Login</h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
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

        {/* Password */}
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

        {/* Login button */}
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
