import React, { useEffect, useState } from "react";
import axios from "axios";
import VehicleOwnerSidebar from "./VehicleOwnerSidebar";
import styles from "./PostCar.module.css";

const PostCar = () => {
  const [cars, setCars] = useState([]);
  const [editId, setEditId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [vehicleOwners, setVehicleOwners] = useState([]);
  const [carImage1, setCarImage1] = useState(null);
  const [carImage2, setCarImage2] = useState(null);

 
  const currentOwnerId = localStorage.getItem("vehicleownerid");

  const [formData, setFormData] = useState({
    cartitle: "",
    shortdescription: "",
    price: "",
    variant: "",
    driverstatus: "",
    registrationyear: "",
    carvehicleno: "",
    catid: "",
    vehicleownerid: "",
  });

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/postcars");
      setCars(res.data);
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/categoryMaster");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchVehicleOwners = async () => {
    try {
      const res = await axios.get("http://localhost:5000/vehicalOwner");
      setVehicleOwners(res.data);
    } catch (err) {
      console.error("Error fetching vehicle owners:", err);
    }
  };

  useEffect(() => {
    fetchCars();
    fetchCategories();
    fetchVehicleOwners();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();

      for (let key in formData) {
        formPayload.append(key, formData[key]);
      }

      if (carImage1) formPayload.append("carimage1", carImage1);
      if (carImage2) formPayload.append("carimage2", carImage2);

      if (editId) {
        await axios.put(
          `http://localhost:5000/postcars/${editId}`,
          formPayload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        await axios.post("http://localhost:5000/postcars", formPayload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchCars();
      setFormData({
        cartitle: "",
        shortdescription: "",
        price: "",
        variant: "",
        driverstatus: "",
        registrationyear: "",
        carvehicleno: "",
        catid: "",
        vehicleownerid: "",
      });
      setCarImage1(null);
      setCarImage2(null);
      setEditId(null);
    } catch (err) {
      console.error("Error saving car:", err);
    }
  };

  const handleDelete = async (id, carOwnerId) => {
    if (carOwnerId !== currentOwnerId) {
      alert("You are not authorized to delete this car.");
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/postcars/${id}`);
      fetchCars();
    } catch (err) {
      console.error("Error deleting car:", err);
    }
  };

  const handleEdit = (car) => {
    if (car.vehicleownerid !== currentOwnerId) {
      alert("You are not authorized to edit this car.");
      return;
    }

    setFormData({
      cartitle: car.cartitle,
      shortdescription: car.shortdescription,
      price: car.price,
      variant: car.variant,
      driverstatus: car.driverstatus,
      registrationyear: car.registrationyear,
      carvehicleno: car.carvehicleno,
      catid: car.catid,
      vehicleownerid: car.vehicleownerid,
    });
    setCarImage1(null);
    setCarImage2(null);
    setEditId(car._id);
  };

  return (
    <div className={styles.dashboardContainer}>
      <VehicleOwnerSidebar />
      <div className={styles.mainContent}>
        <h2>{editId ? "Edit Car" : "Post a New Car"}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="cartitle"
            placeholder="Car Title"
            value={formData.cartitle}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="shortdescription"
            placeholder="Short Description"
            value={formData.shortdescription}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCarImage1(e.target.files[0])}
            required={!editId}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCarImage2(e.target.files[0])}
            required={!editId}
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="variant"
            placeholder="Variant"
            value={formData.variant}
            onChange={handleChange}
            required
          />
          <select
            name="driverstatus"
            value={formData.driverstatus}
            onChange={handleChange}
            required
          >
            <option value="">Select Driver Status</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>

          <input
            type="text"
            name="registrationyear"
            placeholder="Registration Year"
            value={formData.registrationyear}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="carvehicleno"
            placeholder="Vehicle No"
            value={formData.carvehicleno}
            onChange={handleChange}
            required
          />
          <select
            name="catid"
            value={formData.catid}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.catname}
              </option>
            ))}
          </select>
          <select
            name="vehicleownerid"
            value={formData.vehicleownerid}
            onChange={handleChange}
            required
          >
            <option value="">Select Vehicle Owner</option>
            {vehicleOwners.map((owner) => (
              <option key={owner._id} value={owner._id}>
                {owner.fullname}
              </option>
            ))}
          </select>
          <button type="submit" className={styles.submitBtn}>
            {editId ? "Update Car" : "Post Car"}
          </button>
        </form>

        <h3>Posted Cars</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Desc</th>
              <th>Price</th>
              <th>Variant</th>
              <th>Driver</th>
              <th>Reg Year</th>
              <th>Vehicle No</th>
              <th>Image 1</th>
              <th>Image 2</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td>{car.cartitle}</td>
                <td>{car.shortdescription}</td>
                <td>{car.price}</td>
                <td>{car.variant}</td>
                <td>{car.driverstatus}</td>
                <td>{car.registrationyear}</td>
                <td>{car.carvehicleno}</td>
                <td>
                  <img
                    src={`http://localhost:5000/uploads/${car.carimage1}`}
                    alt="car1"
                    width="60"
                  />
                </td>
                <td>
                  <img
                    src={`http://localhost:5000/uploads/${car.carimage2}`}
                    alt="car2"
                    width="60"
                  />
                </td>
                <td>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(car._id, car.vehicleownerid)}
                  >
                    Delete
                  </button>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEdit(car)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostCar;




















































