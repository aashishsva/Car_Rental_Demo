const Registration = require("../models/AdminRegistration"); // Adjust path as needed
const bcrypt = require("bcrypt");

// Get all registrations
exports.getAllAdmin = async (req, res) => {
    try {
        const admin = await Registration.find();
        res.json(admin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create new registration
exports.registerAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hasedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Registration({ username, email, password: hasedPassword });
        await newAdmin.save();
        res.status(201).json({ message: "Admin registered successfully", user: newAdmin });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};



// Update registration 
exports.updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updateAdmin = await Registration.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );
        if (!updateAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json({ message: "Admin updated successfully", user: updateAdmin });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// Delete registration
exports.deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteAdmin = await Registration.findByIdAndDelete(id);
        if (!deleteAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json({ message: "Admin deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};