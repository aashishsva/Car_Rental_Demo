import React, { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import UserSidebar from "./UserSidebar";
import axios from "axios";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/userregister/${userId}`);
        setUser(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/userregister/${userId}`, formData);
      alert("Profile updated successfully");
      setUser(formData);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <UserSidebar />
      </div>

      <div className={styles.profileCard}>
        <h2 className={styles.title}>My Profile</h2>
        <img
          src="https://avatars.githubusercontent.com/u/1?v=4"
          alt="Profile"
          className={styles.avatar}
        />
        <div className={styles.info}>
          <p>
            <strong>Name:</strong>{" "}
            {isEditing ? (
              <input
                name="fullname"
                value={formData.fullname || ""}
                onChange={handleChange}
              />
            ) : (
              user.fullname
            )}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {isEditing ? (
              <input
                name="emailid"
                value={formData.emailid || ""}
                onChange={handleChange}
              />
            ) : (
              user.emailid
            )}
          </p>

          <p>
            <strong>Phone:</strong> {user.mobileno}
          </p>

          <p>
            <strong>Date of Birth:</strong>{" "}
            {isEditing ? (
              <input
                type="date"
                name="dateofbirth"
                value={formData.dateofbirth?.split("T")[0] || ""}
                onChange={handleChange}
              />
            ) : (
              user.dateofbirth?.split("T")[0]
            )}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {isEditing ? (
              <input
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
              />
            ) : (
              user.address
            )}
          </p>

          <p>
            <strong>Role:</strong> {user.role}
          </p>

          {isEditing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}
