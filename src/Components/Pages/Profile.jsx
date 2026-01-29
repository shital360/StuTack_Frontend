import React, { useState } from "react";
import "../Style/Profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Shital Dangol",
    email: "shitaldangol@gmail.com",
    role: "Student",
  });

  // 🔥 IMPORTANT STATES
  const [avatar, setAvatar] = useState(null);       // saved image
  const [tempAvatar, setTempAvatar] = useState(null); // editing image

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // image preview only
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setTempAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setTempAvatar(avatar); // sync old image
    setIsEditing(true);
  };

  const handleSave = () => {
    setAvatar(tempAvatar); // ✅ save image
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempAvatar(avatar); // ❌ revert image
    setIsEditing(false);
  };

  const displayImage = isEditing ? tempAvatar || avatar : avatar;

  return (
    <div className="profile-wrapper">
      <div className="header">
        <h1 className="title">Profile</h1>
        <p className="subtitle">Manage your account information</p>
      </div>

      <div className="profile-card">
        <div className="top-section">

          {/* ===== Avatar ===== */}
          <div className="avatar-container">
            <label className="avatar-label">
              {displayImage ? (
                <img src={displayImage} alt="avatar" className="avatar-img" />
              ) : (
                <div className="avatar">👤</div>
              )}

              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                />
              )}
            </label>

            {isEditing && <span className="change-text">Change Photo</span>}
          </div>

          <div>
            {isEditing ? (
              <input
                className="input name-input"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            ) : (
              <h2 className="name">{profile.name}</h2>
            )}

            {isEditing ? (
              <select
                name="role"
                value={profile.role}
                onChange={handleChange}
                className="role-select"
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
              </select>
            ) : (
              <p className="role">{profile.role}</p>
            )}
          </div>
        </div>

        <hr />

        <h3 className="section-title">Personal Information</h3>

        <div className="info-row">
          <div className="icon">👤</div>
          <div>
            <small>Full Name</small>
            {isEditing ? (
              <input
                className="input"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            ) : (
              <p>{profile.name}</p>
            )}
          </div>
        </div>

        <div className="info-row">
          <div className="icon">✉️</div>
          <div>
            <small>Email Address</small>
            {isEditing ? (
              <input
                className="input"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            ) : (
              <p>{profile.email}</p>
            )}
          </div>
        </div>

        <div className="info-row">
          <div className="icon">🛡️</div>
          <div>
            <small>Role</small>
            {isEditing ? (
              <select
                name="role"
                value={profile.role}
                onChange={handleChange}
                className="role-select"
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
              </select>
            ) : (
              <p>{profile.role}</p>
            )}
          </div>
        </div>

        <hr />

        {!isEditing ? (
          <button className="edit-btn" onClick={handleEdit}>
            Edit Profile
          </button>
        ) : (
          <div className="btn-group">
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
