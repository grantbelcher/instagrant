const express = require('express');
// const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../db/models/User');
const Chat = require('../../db/models/Chat');
const auth = require('../../middleware/auth');

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

router.get('/profile', auth, async (req, res) => {
// router.get('/profile', async (req, res) => {
  try {
    const { user: id } = req;
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: 'cannot find user' });
    return res.json({ user });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'server error' });
  }
});

router.post(
  '/SignUp',
  [
    check('name').isLength({ min: 5 }),
    check('password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const { name, password, avatar } = req.body;
      const userExists = await User.findOne({ name });
      if (userExists) return res.status(401).json({ message: 'user already exists' });
      // const salt = await bcrypt.genSalt(10);
      // const hashedPass = await bcrypt.hash(password, salt);
      const hashedPass = password;
      const newUser = new User({ name, password: hashedPass, avatar });
      const communityChat = await Chat.findOne({ name: 'Community' });
      newUser.chats.push(communityChat._id);
      await newUser.save();
      const { id } = newUser;
      const secret = 'mysecretkey';
      const token = jwt.sign({ id }, secret, { expiresIn: '1h' });
      return res.json({ token });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'server error' });
    }
  },
);

router.post(
  '/SignIn',
  [
    check('name').exists(),
    check('password').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const { name, password } = req.body;
      const user = await User.findOne({ name });
      const match = (password === user.password);
      if (!match || !user) return res.status(404).json({ message: 'invalid credentials' });
      const { id } = user;
      const secret = 'mysecretkey';
      const token = jwt.sign({ id }, secret, { expiresIn: 1200 });
      return res.json({ token });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'server error' });
    }
  },
);


module.exports = router;
