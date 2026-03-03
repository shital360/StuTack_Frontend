import React from "react";

const StudentDashboard = () => {
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Welcome, Sita Thapa</h1>
      <p style={subtitleStyle}>Manage your academic information efficiently.</p>

      <div style={cardContainerStyle}>
        <div style={cardStyle}>
          <p style={cardTitleStyle}>Total Courses</p>
          <h2 style={cardValueStyle}>5</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardTitleStyle}>Attendance</p>
          <h2 style={cardValueStyle}>75%</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardTitleStyle}>GPA</p>
          <h2 style={cardValueStyle}>3.5</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardTitleStyle}>Result Status</p>
          <h2 style={{ ...cardValueStyle, color: "#2ecc71" }}>
            Passed
          </h2>
        </div>
      </div>
    </div>
  );
};

/* ===== STYLES ===== */

const containerStyle = {
  padding: "40px",
};

const titleStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  marginBottom: "5px",
  color: "#2c3e50",
};

const subtitleStyle = {
  color: "#7f8c8d",
  marginBottom: "30px",
};

const cardContainerStyle = {
  display: "flex",
  gap: "25px",
  flexWrap: "wrap",
};

const cardStyle = {
  flex: "1",
  minWidth: "220px",
  backgroundColor: "white",
  borderRadius: "10px",
  padding: "30px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  textAlign: "center",
};

const cardTitleStyle = {
  color: "#7f8c8d",
  marginBottom: "10px",
  fontSize: "14px",
};

const cardValueStyle = {
  fontSize: "30px",
  color: "#3498db",
};

export default StudentDashboard;