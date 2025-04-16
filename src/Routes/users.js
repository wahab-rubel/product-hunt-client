// 📁 routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // তোমার MongoDB User model

// ✅ Check if user is a moderator
router.get('/users/moderator/:email', async (req, res) => {
  const email = req.params.email;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ moderator: false });
    }

    const isModerator = user.role === 'moderator';
    res.json({ moderator: isModerator });

  } catch (error) {
    console.error('Error checking moderator status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
