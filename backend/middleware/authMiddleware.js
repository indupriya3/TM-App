const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Extract token from the Authorization header
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Attach user ID to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};