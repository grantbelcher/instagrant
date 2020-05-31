const mongoose = require('mongoose');
const express = require('express');
const Chat = require('../../db/models/Chat');
const User = require('../../db/models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  console.log(req.body, 'sddsdsdsdss');
  const { recipients, name } = req.body;
  try {
    const newChat = new Chat({ name, users: recipients });
    await newChat.save();
    console.log(newChat);
    // for each recipient
    recipients.forEach((user) => {
      User.findById(user._id)
        .then((doc) => {
          console.log(doc, 'doc');
          // doc.chats.push(newChat._id);
          return doc;
        })
        .then((newDoc) => newDoc.save((err, data) => {
          console.log('saving');
        }));
    });
    return res.send(newChat);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/', async (req, res) => {
  const { ids } = req.body;
  try {
    const chats = await Chat.find().where('_id').in(ids).exec();
    console.log(chats, 'get chats route');
    return res.send(chats);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'server error' });
  }
});


module.exports = router;
