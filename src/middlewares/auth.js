const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const { token } = req.headers;
  console.log(token);
  if (!token) {
    res.status(401).json({ message: 'Token not found' });
    return;
  }
  try {
    const { isAdmin } = jwt.verify(token, 'secret');
    req.isAdmin = isAdmin;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateUser;