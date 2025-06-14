import React, { useEffect, useState } from "react";
import styles from "./OrderCar.module.css";
import Sidebar from "../sidebar/Sidebar";
import axios from "axios";

const OrderCar = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 👈 pagination
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    carid: "",
    ownerid: "",
    bookingdate: "",
    sourcelocation: "",
    destinationlocation: "",
    pickuptime: "",
    droptime: "",
  });

  const [cars, setCars] = useState([]);
  const [owners, setOwners] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchOrders();
    fetchCars();
    fetchOwners();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5000/ordercar");
    setOrders(res.data);
  };

  const fetchCars = async () => {
    const res = await axios.get("http://localhost:5000/postcars");
    setCars(res.data);
  };

  const fetchOwners = async () => {
    const res = await axios.get("http://localhost:5000/vehicalOwner");
    setOwners(res.data);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/ordercar/${editingId}`, formData);
    } else {
      await axios.post("http://localhost:5000/ordercar", formData);
    }
    setFormData({
      carid: "",
      ownerid: "",
      bookingdate: "",
      sourcelocation: "",
      destinationlocation: "",
      pickuptime: "",
      droptime: "",
    });
    setEditingId(null);
    fetchOrders();
  };

  const handleEdit = (order) => {
    setFormData(order);
    setEditingId(order._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/ordercar/${id}`);
    fetchOrders();
  };

 // 👉 Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <>
      <div className={styles.ordercarContainer}>
        <h2>Order Car</h2>

        <form className={styles.ordercarForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Select Car</label>
            <select name="carid" value={formData.carid} onChange={handleChange} required>
              <option value="">Select Car</option>
              {cars.map((car) => (
                <option key={car._id} value={car._id}>
                  {car.cartitle}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Select Owner</label>
            <select name="ownerid" value={formData.ownerid} onChange={handleChange} required>
              <option value="">Select Owner</option>
              {owners.map((owner) => (
                <option key={owner._id} value={owner._id}>
                  {owner.fullname}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Booking Date</label>
            <input type="date" name="bookingdate" value={formData.bookingdate} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Source Location</label>
            <input
              type="text"
              name="sourcelocation"
              placeholder="Source"
              value={formData.sourcelocation}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Destination Location</label>
            <input
              type="text"
              name="destinationlocation"
              placeholder="Destination"
              value={formData.destinationlocation}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Pickup Time</label>
            <input type="time" name="pickuptime" value={formData.pickuptime} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Drop Time</label>
            <input type="time" name="droptime" value={formData.droptime} onChange={handleChange} required />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <button type="submit" className={`${styles.actionBtn} ${styles.add}`}>
              {editingId ? "Update" : "Add"} Order
            </button>
          </div>
        </form>

        <table className={styles.ordercarTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>Car</th>
              <th>Owner</th>
              <th>Date</th>
              <th>From</th>
              <th>To</th>
              <th>Pickup</th>
              <th>Drop</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order._id}>
                <td>{i + 1}</td>
                <td>{order.carid?.cartitle || "N/A"}</td>
                <td>{order.ownerid?.fullname || "N/A"}</td>
                <td>{order.bookingdate}</td>
                <td>{order.sourcelocation}</td>
                <td>{order.destinationlocation}</td>
                <td>{order.pickuptime}</td>
                <td>{order.droptime}</td>
                <td>
                  <button className={`${styles.actionBtn} ${styles.update}`} onClick={() => handleEdit(order)}>
                    Edit
                  </button>
                  <button className={`${styles.actionBtn} ${styles.delete}`} onClick={() => handleDelete(order._id)}>
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

export default OrderCar;
