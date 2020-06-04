const mongoose = require('mongoose');
const express = require('express');
const Chat = require('../../db/models/Chat');
const User = require('../../db/models/User');

const router = express.Router();

const initialMessage = {
  _id: '5ed81e09b1a0c469407c0216',
  username: 'Admin69',
  avatar: 'https://is2-ssl.mzstatic.com/image/thumb/Purple71/v4/f2/13/74/f21374ed-8a0f-70a4-2f03-b863315e0f4c/source/256x256bb.jpg',
  text: 'NEW CHAT CREATED',
};

router.post('/', async (req, res) => {
  const { recipients, name } = req.body;
  try {
    const newChat = new Chat({ name, users: recipients, messages: initialMessage });
    await newChat.save();
    // for each recipient
    recipients.forEach((user) => {
      User.findById(user._id)
        .then((doc) => {
          doc.chats.push(newChat._id);
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

router.post('/user', async (req, res) => {
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
