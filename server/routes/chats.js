const mongoose = require('mongoose');
const express = require('express');
const Chat = require('../../db/models/Chat')
const router = express.Router();

router.post('/', async (req, res) => {
  const { recipients, name } = req.body;
  try {
    const newChat = new Chat({ name, users: recipients });
    await newChat.save();
    console.log(newChat);
    // for each recipient
      // add newChat's id to their chat list
      // save each user


    return res.send(newChat);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
