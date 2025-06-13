import React, { useState, useEffect } from "react";
import styles from "./CategoryMaster.module.css";
import Sidebar from "../sidebar/Sidebar";
import axios from "axios";

const CategoryMaster = () => {
  const [categories, setCategories] = useState([]);
  const [catname, setCatname] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/categorymaster");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!catname.trim()) return;

    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/categorymaster/${editId}`, { catname });
        setEditMode(false);
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/categorymaster", { catname });
      }
      setCatname("");
      fetchCategories();
    } catch (error) {
      console.error("Error submitting category:", error);
    }
  };

  const handleEdit = (category) => {
    setCatname(category.catname);
    setEditMode(true);
    setEditId(category._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`http://localhost:5000/categorymaster/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <>
      {/* <Sidebar /> */}
      <div className={styles.categorymasterContainer}>
        <h2>Category Master</h2>

        <form className={styles.categoryForm} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Category Name"
            value={catname}
            onChange={(e) => setCatname(e.target.value)}
            required
          />
          <button type="submit" className={`${styles.actionBtn} ${styles.add}`}>
            {editMode ? "Update" : "Add"} Category
          </button>
        </form>

        <table className={styles.categoryTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat._id}>
                <td>{index + 1}</td>
                <td>{cat.catname}</td>
                <td>
                  <button className={styles.editBtn} onClick={() => handleEdit(cat)}>
                    Edit
                  </button>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(cat._id)}>
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

export default CategoryMaster;
