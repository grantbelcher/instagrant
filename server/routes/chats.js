const mongoose = require('mongoose');
const express = require('express');
const Chat = require('../../db/models/Chat');
const User = require('../../db/models/User');
const sortIds = require('../../utils/sortRecipientIds');

const router = express.Router();

const initialMessage = {
  _id: '5ed81e09b1a0c469407c0216',
  username: 'Admin69',
  avatar: 'https://is2-ssl.mzstatic.com/image/thumb/Purple71/v4/f2/13/74/f21374ed-8a0f-70a4-2f03-b863315e0f4c/source/256x256bb.jpg',
  text: 'NEW CHAT CREATED',
};

router.get('/community', async (req, res) => {
  try {
    const community = await Chat.findOne({ name: 'Community' });
    return res.send(community);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { recipients, name } = req.body;
  const recipIds = recipients.map(({ _id }) => _id);
  const hashedIds = (sortIds(recipIds));
  try {
    const existingChat = await Chat.findOne({ hashedIds });
    if (!existingChat) {
      const newChat = new Chat({ name, users: recipients, messages: initialMessage, hashedIds });
      await newChat.save();
      // for each recipient
      recipients.forEach((user) => {
        User.findById(user._id)
          .then((doc) => {
            doc.chats.push(newChat._id);
            doc.notifications.push(newChat._id);
            return doc;
          })
          .then((newDoc) => newDoc.save((err, data) => {
            console.log('saving');
          }));
      });
      return res.send(newChat);
    }
    return res.send(existingChat);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/user', async (req, res) => {
  const { ids } = req.body;
  try {
    const chats = await Chat.find().where('_id').in(ids).exec();
    return res.send(chats);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'server error' });
  }
});


module.exports = router;
