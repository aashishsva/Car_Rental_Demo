import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./PostCar.module.css";
import VehicleOwnerSidebar from "./VehicleOwnerSidebar"; // ← Sidebar Import

const PostCar = () => {
  const [formData, setFormData] = useState({
    catid: "",
    cartitle: "",
    shortdescription: "",
    price: "",
    variant: "",
    driverstatus: "",
    registrationyear: "",
    carvehicleno: "",
    rcnumber: "",
  });

  const [categories, setCategories] = useState([]);
  const [cars, setCars] = useState([]);
  const [carImage1, setCarImage1] = useState(null);
  const [carImage2, setCarImage2] = useState(null);
  const [rcImage, setRcImage] = useState(null);
  const [editId, setEditId] = useState(null);

  const vehicleOwnerId = localStorage.getItem("vehicleownerid");

  useEffect(() => {
    fetchCategories();
    fetchCars();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/categoryMaster");
    setCategories(res.data);
  };

  const fetchCars = async () => {
    const res = await axios.get(
      `http://localhost:5000/postcars?vehicleownerid=${vehicleOwnerId}`
    );
    setCars(res.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      catid: "",
      cartitle: "",
      shortdescription: "",
      price: "",
      variant: "",
      driverstatus: "",
      registrationyear: "",
      carvehicleno: "",
      rcnumber: "",
    });
    setCarImage1(null);
    setCarImage2(null);
    setRcImage(null);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("catid", formData.catid);
    data.append("vehicleownerid", vehicleOwnerId);
    data.append("cartitle", formData.cartitle);
    data.append("shortdescription", formData.shortdescription);
    data.append("price", formData.price);
    data.append("variant", formData.variant);
    data.append("driverstatus", formData.driverstatus);
    data.append("registrationyear", formData.registrationyear);
    data.append("carvehicleno", formData.carvehicleno);
    data.append("rcnumber", formData.rcnumber);

    if (carImage1) data.append("carimage1", carImage1);
    if (carImage2) data.append("carimage2", carImage2);
    if (rcImage) data.append("rcimage", rcImage);

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/postcars/${editId}`, data);
      } else {
        await axios.post("http://localhost:5000/postcars", data);
      }
      fetchCars();
      resetForm();
    } catch (error) {
      console.error("Error posting car:", error);
    }
  };

  const handleEdit = (car) => {
    setEditId(car._id);
    setFormData({
      catid: car.catid?._id || "",
      cartitle: car.cartitle,
      shortdescription: car.shortdescription,
      price: car.price,
      variant: car.variant,
      driverstatus: car.driverstatus,
      registrationyear: car.registrationyear,
      carvehicleno: car.carvehicleno,
      rcnumber: car.rcnumber,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      await axios.delete(`http://localhost:5000/postcars/${id}`);
      fetchCars();
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <VehicleOwnerSidebar />
      </div>

      <div className={styles.main}>
        <h2>{editId ? "Edit Car" : "Post a Car"}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
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

          <input
            type="text"
            name="cartitle"
            value={formData.cartitle}
            onChange={handleChange}
            placeholder="Car Title"
            required
          />
          <textarea
            name="shortdescription"
            value={formData.shortdescription}
            onChange={handleChange}
            placeholder="Short Description"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <input
            type="text"
            name="variant"
            value={formData.variant}
            onChange={handleChange}
            placeholder="Variant"
          />
          <input
            type="text"
            name="driverstatus"
            value={formData.driverstatus}
            onChange={handleChange}
            placeholder="Driver Status"
          />
          <input
            type="number"
            name="registrationyear"
            value={formData.registrationyear}
            onChange={handleChange}
            placeholder="Registration Year"
          />
          <input
            type="text"
            name="carvehicleno"
            value={formData.carvehicleno}
            onChange={handleChange}
            placeholder="Car Vehicle No"
          />
          <input
            type="text"
            name="rcnumber"
            value={formData.rcnumber}
            onChange={handleChange}
            placeholder="RC Number"
          />

          <label>
            Car Image 1:{" "}
            <input
              type="file"
              onChange={(e) => setCarImage1(e.target.files[0])}
            />
          </label>
          <label>
            Car Image 2:{" "}
            <input
              type="file"
              onChange={(e) => setCarImage2(e.target.files[0])}
            />
          </label>
          <label>
            RC Image:{" "}
            <input
              type="file"
              onChange={(e) => setRcImage(e.target.files[0])}
            />
          </label>

          <button type="submit">{editId ? "Update" : "Post Car"}</button>
        </form>

        <h3>Your Posted Cars</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td>{car.cartitle}</td>
                <td>{car.price}</td>
                <td>{car.catid?.catname}</td>
                <td>
                  <img
                    src={`http://localhost:5000/upload/${car.carimage1}`}
                    alt="Car 1"
                    width="50"
                  />
                  <img
                    src={`http://localhost:5000/upload/${car.carimage2}`}
                    alt="Car 2"
                    width="50"
                  />
                </td>
                <td>
                  <button onClick={() => handleEdit(car)}>Edit</button>
                  <button onClick={() => handleDelete(car._id)}>Delete</button>
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
