import React from "react";
import "../Style/profile.css";

const Profile = () => {
  return (
    <div className="profile-wrapper">
      <h1 className="title">Profile</h1>
      <p className="subtitle">Manage your account information</p>

      <div className="profile-card">
        {/* Top */}
        <div className="top-section">
          <div className="avatar">👤</div>
          <div>
            <h2>Shital Dangol</h2>
            <p className="role">Student</p>
          </div>
        </div>

        <hr />

        {/* Personal Info */}
        <h3>Personal Information</h3>

        <div className="info">
          <div className="info-row">
            <span className="icon">👤</span>
            <div>
              <small>Full Name</small>
              <p>Shital Dangol</p>
            </div>
          </div>

          <div className="info-row">
            <span className="icon">✉️</span>
            <div>
              <small>Email Address</small>
              <p>shitaldangol@gmail.com</p>
            </div>
          </div>

          <div className="info-row">
            <span className="icon">🛡️</span>
            <div>
              <small>Role</small>
              <p>Student</p>
            </div>
          </div>
        </div>

        <hr />

        <button className="edit-btn">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
