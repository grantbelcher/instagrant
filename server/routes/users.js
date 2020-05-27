const express = require('express');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../db/models/User');


const router = express.Router();

// test router
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    console.error(err.message);
    return res.json({ message: err.message });
  }
});

router.post(
  '/',
  [
    check('name').isLength({ min: 5 }),
    check('password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const { name, password } = req.body;
      console.log(name, password, 'name and pass');
      const userExists = await User.findOne({ name });
      console.log(userExists, 'check duplicate user');
      if (userExists) return res.status(401).json({ message: 'user already exists' });
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      const newUser = new User({ name, password: hashedPass });
      await newUser.save();
      const { id } = newUser;
      console.log(id, 'id');
      const secret = config.get('secret_key');
      const token = jwt.sign({ token: id }, secret, { expiresIn: '1h' });
      return res.json({ token });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'server error' });
    }
  },
);

module.exports = router;
