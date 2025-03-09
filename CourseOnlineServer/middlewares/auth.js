const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (db) => {
  const userModel = User(db);

  // Middleware to check authentication
  const checkAuth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    try {
      const decoded = jwt.verify(token, 'secret');
      req.userId = decoded.userId;
      req.userRole = decoded.role;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };

  // Middleware to check admin role
  const checkAdmin = async (req, res, next) => {
    userModel.findById(req.userId, (err, user) => {
      if (err || !user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Access forbidden: Admins only' });
      }
      next();
    });
  };

  // Middleware to check teacher role
  const checkTeacher = async (req, res, next) => {
    userModel.findById(req.userId, (err, user) => {
      if (err || !user || user.role !== 'teacher') {
        return res.status(403).json({ message: 'Access forbidden: Teachers only' });
      }
      next();
    });
  };

  return {
    checkAuth,
    checkAdmin,
    checkTeacher
  };
};