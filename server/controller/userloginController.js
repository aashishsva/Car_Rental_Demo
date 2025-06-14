const User = require('../models/UserRegistration');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'my_super_secret_key_123';

// 🔐 Login user
const loginUser = async (req, res) => {
  try {
    const { emailid, password } = req.body;

    // Check user exists
    const user = await User.findOne({ emailid });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, emailid: user.emailid },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Respond with token and basic user info
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        emailid: user.emailid,
        mobileno: user.mobileno,
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = loginUser;
