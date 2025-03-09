const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (db) => {
  const router = express.Router();
  const userModel = User(db); // יצירת המודל עם db

  // Register
  router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      userModel.create(name, email, hashedPassword, role, (err, userId) => {
        if (err) {
          return res.status(500).json({ message: 'Error registering user', err });
        }
        const token = jwt.sign({ userId: userId, role: role }, 'secret');

        res.status(201).json({ message: 'User registered successfully', userId , token });
      });
    } catch (err) {
      res.status(500).json({ message: 'Error registering user' });
    }
  });

  // Login
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      userModel.findByEmail(email, async (err, user) => {
        if (err || !user) {
          return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id, role: user.role }, 'secret');
        res.status(200).json({ token, userId: user.id, role: user.role });
      });
    } catch (err) {
      res.status(500).json({ message: 'Error logging in' });
    }
  });

  return router;
};
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('./User');

// module.exports = (db) => {
//   const router = express.Router();
//   const userModel = User(db);

//   // Register
//   router.post('/register', async (req, res) => {
//     const { name, email, password, role } = req.body;
//     try {
//       const hashedPassword = await bcrypt.hash(password, 12);
//       userModel.create(name, email, hashedPassword, role, (err, userId) => {
//         if (err) {
//           return res.status(500).json({ message: 'Error registering user' });
//         }
//         res.status(201).json({ message: 'User registered successfully', userId });
//       });
//     } catch (err) {
//       res.status(500).json({ message: 'Error registering user' });
//     }
//   });

//   // Login
//   router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       userModel.findByEmail(email, async (err, user) => {
//         if (err || !user) {
//           return res.status(404).json({ message: 'User not found' });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//           return res.status(400).json({ message: 'Invalid credentials' });
//         }
//         const token = jwt.sign({ userId: user.id, role: user.role }, 'secret');
//         res.status(200).json({ token, userId: user.id, role: user.role });
//       });
//     } catch (err) {
//       res.status(500).json({ message: 'Error logging in' });
//     }
//   });

//   return router;
// };