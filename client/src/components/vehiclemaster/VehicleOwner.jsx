import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./VehicleOwner.module.css";

const VehicleOwner = () => {
  const [owners, setOwners] = useState([]);

  // fetch owners on mount
  const fetchOwners = async () => {
    try {
      const res = await axios.get("http://localhost:5000/vehicalOwner");
      setOwners(res.data);
    } catch (err) {
      console.error("Error fetching vehicle owners:", err);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle owner?")) {
      try {
        await axios.delete(`http://localhost:5000/vehicalOwner/${id}`);
        fetchOwners(); // refresh list
      } catch (err) {
        console.error("Error deleting vehicle owner:", err);
      }
    }
  };

  return (
    <div className={styles.vehicleownerContainer}>
      <h2>All Vehicle Owners</h2>

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
            <React.Fragment key={owner._id}>
              <tr>
                <td>{idx + 1}</td>
                <td>{owner.fullname}</td>
                <td>{owner.emailid}</td>
                <td>{owner.mobileno}</td>
                <td>{owner.locationid?.locationname || "N/A"}</td>
                <td>
                  <button className={`${styles.actionBtn} ${styles.delete}`} onClick={() => handleDelete(owner._id)}>
                    Delete
                  </button>
                </td>
              </tr>

              {owner.postcars?.length > 0 && (
                <tr>
                  <td colSpan="6">
                    <strong>Posted Cars:</strong>
                    <table className={styles.vehicleownerTable}>
                      <thead>
                        <tr>
                          <th>Car Title</th>
                          <th>Price</th>
                          <th>Year</th>
                          <th>Driver</th>
                          <th>Vehicle No</th>
          
                        </tr>
                      </thead>
                      <tbody>
                        {owner.postcars.map((car) => (
                          <tr key={car._id}>
                            <td>{car.cartitle}</td>
                            <td>{car.price}</td>
                            <td>{car.registrationyear}</td>
                            <td>{car.driverstatus}</td>
                            <td>{car.carvehicleno}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleOwner;
