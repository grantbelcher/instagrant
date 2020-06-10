const mongoose = require('mongoose')
const User = require('../db/models/User');
const Chat = require('../db/models/Chat');
const Message = require('../db/models/Message');


let connectedUsers = {};
let typingUsers = {};

const socketManager = (socket) => {
  // USER CONNECTS
  socket.on('USER_CONNECTED', (user) => {
    connectedUsers = addUser(connectedUsers, user);
    socket.broadcast.emit('NEW_USER_CONNECTED', connectedUsers);
    socket.emit('NEW_USER_CONNECTED', connectedUsers);
  });
  socket.on('DISCONNECTING', (user) => {
    connectedUsers = removeUser(connectedUsers, user);
    socket.broadcast.emit('USER_DISCONNECTED', connectedUsers);
  });

  socket.on('SENDING_MESSAGE', async (message) => {
    const { user, text, chatId } = message;
    const chat = await Chat.findById(chatId);
    if (!chat) return socket.emit('ERROR');
    const newMessage = new Message({
      username: user.name, avatar: user.avatar, text, chatId,
    });
    chat.messages.push(newMessage);
    console.log(chat, 'after adding message');
    socket.broadcast.emit('MESSAGE_RECIEVED', chat);
    socket.emit('MESSAGE_SENT', chat);
    // for each user in the chat
    const { users } = chat;
    users.forEach(async ({ _id }) => {
      const account = await User.findById(_id);
      account.notifications.push(chatId);
      await account.save();
    });
    await chat.save();
  });

  socket.on('ADD_FAVORITE', async (messageInfo) => {
    let { username, chatId, messageId } = messageInfo;
    const chat = await Chat.findById(chatId);
    // find message in chat
    console.log(username, chatId, messageId, 'bullshit');
    console.log(chat, 'CHAT');
    const message = chat.messages.find((item) => {
      const itemId = mongoose.Types.ObjectId(item._id);
      messageId = mongoose.Types.ObjectId(messageId);
      return itemId.equals(messageId);
    });
    console.log(message, 'MESSAGE');
    message.favorites.push(username);
    console.log(chat.messages);
    // broadcast and emit to client
    socket.broadcast.emit('LIKE_RECIEVED', chat);
    socket.emit('MESSAGE_LIKED', chat);
    await chat.save();
  });

  socket.on('REMOVE_FAVORITE', async (messageInfo) => {
    let { username, chatId, messageId } = messageInfo;
    const chat = await Chat.findById(chatId);
    // find message in chat
    const message = chat.messages.find((item) => {
      const itemId = mongoose.Types.ObjectId(item._id);
      messageId = mongoose.Types.ObjectId(messageId);
      return itemId.equals(messageId);
    });
    const indexOfName = message.favorites.findIndex((name) => name === username);
    message.favorites.splice(indexOfName, 1);
    // broadcast and emit to client
    socket.broadcast.emit('LIKE_RECIEVED', chat);
    socket.emit('MESSAGE_LIKED', chat);
    await chat.save();
  });

  socket.on('NEW_CHAT_CREATED', (newChat) => {
    socket.broadcast.emit('NEW_CHAT_CREATED', newChat);
    socket.emit('NEW_CHAT_CREATED', newChat);
  });
  socket.on('TYPING', (user) => {
    typingUsers = addUser(typingUsers, user);
    socket.broadcast.emit('USER_TYPING', typingUsers);
  });
  socket.on('STOP_TYPING', (user) => {
    typingUsers = removeUser(typingUsers, user, () => {
      socket.broadcast.emit('USER_TYPING', typingUsers);
    });
  });
};


function addUser(userList, user) {
  const newList = {
    ...userList,
  };
  newList[user.name] = user;
  return newList;
}

function removeUser(userList, user, callback) {
  const newList = userList;
  if (newList[user.name]) {
    delete newList[user.name];
    if (callback) {
      callback();
    }
  }
  return newList;
}


module.exports = socketManager;
