import { useState } from "react";

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [tempAvatar, setTempAvatar] = useState(null);

  const [profile, setProfile] = useState({
    name: "Sita Thapa",
    email: "sita.thapa@sims.edu",
    roll: "2",
    class: "8",
    phone: "9800000000",
    address: "Kathmandu, Nepal",
  });

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setTempAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setTempAvatar(avatar);
    setIsEditing(true);
  };

  const handleSave = () => {
    setAvatar(tempAvatar);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempAvatar(avatar);
    setIsEditing(false);
  };

  const displayImage = isEditing ? tempAvatar || avatar : avatar;

  const inputStyle = {
    flex: 1,
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
  };

  const rowStyle = {
    display: "flex",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #ecf0f1",
  };

  const labelStyle = {
    width: "140px",
    fontSize: "13px",
    color: "#7f8c8d",
    fontWeight: "600",
  };

  const valueStyle = {
    fontSize: "15px",
    color: "#2c3e50",
  };

  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "650px" }}>
        <h1
          style={{
            fontSize: "28px",
            color: "#2c3e50",
            marginBottom: "5px",
          }}
        >
          Profile
        </h1>

        <p
          style={{
            color: "#7f8c8d",
            marginBottom: "30px",
            fontSize: "14px",
          }}
        >
          Manage your account information
        </p>

        <div
          style={{
            background: "white",
            borderRadius: "10px",
            padding: "30px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
          }}
        >
          {/* Avatar + Name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "25px",
            }}
          >
            <label style={{ cursor: isEditing ? "pointer" : "default" }}>
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  background: "#ecf0f1",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "40px",
                  border: "3px solid #2c3e50",
                }}
              >
                {displayImage ? (
                  <img
                    src={displayImage}
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  "👤"
                )}
              </div>

              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              )}
            </label>

            <div>
              <h2
                style={{
                  fontSize: "22px",
                  color: "#2c3e50",
                  marginBottom: "4px",
                }}
              >
                {profile.name}
              </h2>

              <p style={{ color: "#7f8c8d", fontSize: "14px" }}>
                Student — Class {profile.class}
              </p>

              {isEditing && (
                <p
                  style={{
                    color: "#3498db",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  Click photo to change
                </p>
              )}
            </div>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #ecf0f1",
              marginBottom: "20px",
            }}
          />

          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#2c3e50",
              marginBottom: "16px",
            }}
          >
            Personal Information
          </h3>

          {/* Fields */}
          {[
            { label: "Full Name", name: "name" },
            { label: "Email", name: "email" },
            { label: "Roll No.", name: "roll" },
            { label: "Phone", name: "phone" },
            { label: "Address", name: "address" },
          ].map((field) => (
            <div key={field.name} style={rowStyle}>
              <div style={labelStyle}>{field.label}</div>
              {isEditing ? (
                <input
                  name={field.name}
                  value={profile[field.name]}
                  onChange={handleChange}
                  style={inputStyle}
                />
              ) : (
                <div style={valueStyle}>{profile[field.name]}</div>
              )}
            </div>
          ))}

          {/* Class */}
          <div style={rowStyle}>
            <div style={labelStyle}>Class</div>
            {isEditing ? (
              <select
                name="class"
                value={profile.class}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="10-A">Class 10-A</option>
              </select>
            ) : (
              <div style={valueStyle}>Class {profile.class}</div>
            )}
          </div>

          {/* Buttons */}
          <div
            style={{
              marginTop: "24px",
              display: "flex",
              gap: "12px",
            }}
          >
            {!isEditing ? (
              <button
                onClick={handleEdit}
                style={{
                  padding: "12px 24px",
                  background: "#2c3e50",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  style={{
                    padding: "12px 24px",
                    background: "#1abc9c",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "15px",
                  }}
                >
                  ✅ Save
                </button>

                <button
                  onClick={handleCancel}
                  style={{
                    padding: "12px 24px",
                    background: "#e74c3c",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "15px",
                  }}
                >
                  ❌ Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;