import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./VehicleOwner.module.css"; // ✅ Correct module import
import Sidebar from "../sidebar/Sidebar";

const VehicleOwner = () => {
  const [owners, setOwners] = useState([]);
  const [locations, setLocations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    emailid: "",
    password: "",
    fullname: "",
    mobileno: "",
    dateofbirth: "",
    locationid: "",
    address: ""
  });

  const fetchOwners = async () => {
    try {
      const res = await axios.get("http://localhost:5000/vehicalOwner");
      setOwners(res.data);
    } catch (err) {
      console.error("Error fetching vehicle owners:", err);
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/locationMaster");
      setLocations(res.data);
    } catch (err) {
      console.error("Error fetching locations:", err);
    }
  };

  useEffect(() => {
    fetchOwners();
    fetchLocations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (owner) => {
    setFormData({
      emailid: owner.emailid,
      password: "",
      fullname: owner.fullname,
      mobileno: owner.mobileno,
      dateofbirth: owner.dateofbirth?.split("T")[0] || "",
      locationid: owner.locationid?._id || "",
      address: owner.address
    });
    setEditId(owner._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this owner?")) {
      try {
        await axios.delete(`http://localhost:5000/vehicalOwner/${id}`);
        fetchOwners();
      } catch (err) {
        console.error("Error deleting vehicle owner:", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/vehicalOwner/${editId}`, formData);
      } else {
        await axios.post("http://localhost:5000/vehicalOwner", formData);
      }

      setFormData({
        emailid: "",
        password: "",
        fullname: "",
        mobileno: "",
        dateofbirth: "",
        locationid: "",
        address: ""
      });
      setEditId(null);
      fetchOwners();
    } catch (err) {
      console.error("Error submitting vehicle owner:", err);
    }
  };

  return (
    <>
      {/* <Sidebar /> */}
      <div className={styles.vehicleownerContainer}>
        <h2>Vehicle Owner</h2>

        <form className={styles.vehicleownerForm} onSubmit={handleSubmit}>
          <input type="email" name="emailid" value={formData.emailid} onChange={handleChange} placeholder="Email" required />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Full Name" required />
          <input type="tel" name="mobileno" value={formData.mobileno} onChange={handleChange} placeholder="Mobile No" required />
          <input type="date" name="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required />
          <select name="locationid" value={formData.locationid} onChange={handleChange} required>
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc._id} value={loc._id}>{loc.locationname}</option>
            ))}
          </select>
          <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
          <button className={`${styles.actionBtn} ${styles.add}`} type="submit">
            {editId ? "Update Vehicle Owner" : "Add Vehicle Owner"}
          </button>
        </form>

        <table className={styles.vehicleownerTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner, idx) => (
              <tr key={owner._id}>
                <td>{idx + 1}</td>
                <td>{owner.fullname}</td>
                <td>{owner.emailid}</td>
                <td>{owner.mobileno}</td>
                <td>{owner.locationid?.locationname || "N/A"}</td>
                <td>
                  <button className={`${styles.actionBtn} ${styles.edit}`} onClick={() => handleEdit(owner)}>Edit</button>
                  <button className={`${styles.actionBtn} ${styles.delete}`} onClick={() => handleDelete(owner._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default VehicleOwner;
