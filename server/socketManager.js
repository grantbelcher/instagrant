
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
    socket.broadcast.emit('MESSAGE_RECIEVED', chat);
    socket.emit('MESSAGE_SENT', chat);
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
