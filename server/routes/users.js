const express = require('express');
const User = require('../../db/models/User');

const router = express.Router();

router.get('/', async (req, res) => {
  const { q } = req.query;
  try {
    let users = await User.find({
      name: {
        $regex: q,
        $options: 'i',
      },
    });
    users = users.slice(0, 10);
    return res.send(users);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
