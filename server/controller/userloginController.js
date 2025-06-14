const User = require('../models/UserRegistration');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'my_super_secret_key_123';

// 🔐 Login user with role
const loginUser = async (req, res) => {
  try {
    const { emailid, password, role } = req.body; // Role added

    // Check user exists with role
    const user = await User.findOne({ emailid, role });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email, password, or role' });
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email, password, or role' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, emailid: user.emailid, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Respond with token and basic user info
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        fullname: user.fullname,
        emailid: user.emailid,
        mobileno: user.mobileno,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = loginUser;
