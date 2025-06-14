const User = require("../models/UserRegistration");
const VehicleOwner = require("../models/VehicleOwner");
const bcrypt = require("bcryptjs");

// 🔹 Get single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("locationid");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // 👈 yeh res.data frontend me directly set ho sakta hai
  } catch (err) {
    res.status(500).json({
      message: "Error fetching user",
      error: err.message,
    });
  }
};


// 🔹 Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("locationid");
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
};

// 🔹 Register a new user
const registerUser = async (req, res) => {
  try {
    const {
      fullname,
      emailid,
      mobileno,
      password,
      dateofbirth,
      address,
      locationid,
      role,
    } = req.body;

    const existingUser = await User.findOne({ emailid });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create in User model
    const newUser = new User({
      fullname,
      emailid,
      mobileno,
      password: hashedPassword,
      dateofbirth,
      address,
      locationid,
      role,
    });

    await newUser.save();

    // 🔽 ADD THIS FOR DEBUGGING
    console.log("✅ User created with ID:", newUser._id);
    console.log("🛠 Creating VehicleOwner for:", emailid);

    // Also insert in VehicleOwner model if role is vehicleowner
    if (role === "vehicleowner") {
      const newVehicleOwner = new VehicleOwner({
        fullname,
        emailid,
        mobileno,
        password: hashedPassword,
        dateofbirth,
        address,
        locationid,
        postcars: [],
        userid: newUser._id, // Link to User
      });

      // await newVehicleOwner.save();
      await newVehicleOwner.save();
      console.log("🚀 VehicleOwner saved with ID:", newVehicleOwner._id);
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

// 🔹 Update user by ID
const updateUser = async (req, res) => {
  try {
    const {
      fullname,
      emailid,
      mobileno,
      password,
      dateofbirth,
      address,
      locationid,
      role,
    } = req.body;

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const updateData = {
      fullname,
      emailid,
      mobileno,
      dateofbirth,
      address,
      locationid,
      role,
    };

    if (hashedPassword) updateData.password = hashedPassword;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
};

// 🔹 Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
};
