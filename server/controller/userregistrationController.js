const User = require('../models/UserRegistration');
const bcrypt = require('bcryptjs');

// 🔹 Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('locationid'); // Optional
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

// 🔹 Register a new user
const registerUser = async (req, res) => {
  try {
    const { fullname, emailid, mobileno, password, dateofbirth, address, locationid } = req.body;

    const existingUser = await User.findOne({ emailid });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      emailid,
      mobileno,
      password: hashedPassword,
      dateofbirth,
      address,
      locationid,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

// 🔹 Update user by ID
const updateUser = async (req, res) => {
  try {
    const { fullname, emailid, mobileno, password, dateofbirth, address, locationid } = req.body;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const updateData = {
      fullname,
      emailid,
      mobileno,
      dateofbirth,
      address,
      locationid,
    };

    if (hashedPassword) updateData.password = hashedPassword;

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

// 🔹 Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

module.exports = { getAllUsers, registerUser, updateUser, deleteUser };
