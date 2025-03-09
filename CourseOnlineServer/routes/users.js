module.exports = (db) => {
const express = require('express');
const { checkAuth, checkAdmin } = require('../middlewares/auth')(db);
const User = require('../models/User');

  const router = express.Router();
  const userModel = User(db);

  // Get all users (Admin only)
  router.get('/', checkAuth, checkAdmin, async (req, res) => {
    userModel.findAll((err, users) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching users' });
      }
      res.status(200).json(users);
    });
  });

  // Get user by ID
  router.get('/:id', checkAuth, async (req, res) => {
    const { id } = req.params;
    userModel.findById(id, (err, user) => {
      if (err || !user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    });
  });

  // Update user by ID
  router.put('/:id', checkAuth, async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    userModel.updateById(id, updates, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating user' });
      }
      res.status(200).json({ message: 'User updated successfully' });
    });
  });

  // Delete user by ID
  router.delete('/:id', checkAuth, async (req, res) => {
    const { id } = req.params;
    userModel.deleteById(id, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting user' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    });
  });

  return router;
};