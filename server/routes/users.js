const express = require('express');
const User = require('../../db/models/User');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allUsers = await User.find({});
    return res.send(allUsers);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
