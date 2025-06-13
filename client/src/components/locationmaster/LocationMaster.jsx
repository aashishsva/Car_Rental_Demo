import React, { useState, useEffect } from "react";
import styles from "./LocationMaster.module.css";
import Sidebar from "../sidebar/Sidebar";
import axios from "axios";

const LocationMaster = () => {
  const [locations, setLocations] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/locationmaster");
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!locationName.trim()) return;

    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/locationmaster/${editId}`, { locationname: locationName });
        setEditMode(false);
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/locationmaster", { locationname: locationName });
      }
      setLocationName("");
      fetchLocations();
    } catch (error) {
      console.error("Error submitting location:", error);
    }
  };

  const handleEdit = (location) => {
    setLocationName(location.locationname);
    setEditMode(true);
    setEditId(location._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this location?")) return;
    try {
      await axios.delete(`http://localhost:5000/locationmaster/${id}`);
      fetchLocations();
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  return (
    <>
      {/* <Sidebar /> */}
      <div className={styles.locationmasterContainer}>
        <h2>Location Master</h2>

        <form className={styles.locationForm} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Location Name"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            required
          />
          <button type="submit" className={`${styles.actionBtn} ${styles.add}`}>
            {editMode ? "Update" : "Add"} Location
          </button>
        </form>

        <table className={styles.locationTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>Location Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((loc, index) => (
              <tr key={loc._id}>
                <td>{index + 1}</td>
                <td>{loc.locationname}</td>
                <td>
                  <button className={styles.editBtn} onClick={() => handleEdit(loc)}>
                    Edit
                  </button>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(loc._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LocationMaster;
