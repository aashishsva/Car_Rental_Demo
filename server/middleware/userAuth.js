
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization']; // Bearer token
  const token = authHeader && authHeader.split(' ')[1]; // Get only the token part

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded; // now you can use req.user anywhere
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}

module.exports = verifyToken;
