const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization']; // Bearer <token>
  const token = authHeader && authHeader.split(' ')[1];

  console.log("👉 Token received from frontend:", token); // Debug log

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'my_super_secret_key_123'); // ✅ Fix here
    console.log("✅ Decoded user from token:", decoded); // Debug log
    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ JWT verification failed:", err);
    return res.status(403).json({ error: 'Invalid or expired token' }); // This was the 403 error
  }
}

module.exports = verifyToken;
