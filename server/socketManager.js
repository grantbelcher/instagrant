
const User = require('../db/models/User');
const Chat = require('../db/models/Chat');
const Message = require('../db/models/Message');


let connectedUsers = {};
const getCommunityChat = (callback) => {
  Chat.findOne({ name: 'Community' }, (err, data) => {
    if (err) console.error(err);
    console.log(data);
    callback(data);
  });
};

const socketManager = (socket) => {
  // USER CONNECTS
  socket.on('USER_CONNECTED', (user) => {
    connectedUsers = addUser(connectedUsers, user);
    console.log(connectedUsers, 'connected users');
    socket.broadcast.emit('NEW_USER_CONNECTED', connectedUsers);
    socket.emit('NEW_USER_CONNECTED', connectedUsers);
  });
  // USER DISCONNECTS
  socket.on('USER_DISCONNECTED', (user) => {
    console.log('yoo');
    connectedUsers = removeUser(connectedUsers, user);
    console.log(connectedUsers, 'connected users');
  });
  // USER LOGS OUT
  socket.on('MESSAGE_SENT', async (message, callback) => {
    const { chatId, user, text } = message;
    const currentChat = await Chat.findById(chatId);
    currentChat.messages.push({
      username: user.name,
      text,
    });
    await currentChat.save();
    socket.emit('MESSAGE_RECIEVED', currentChat);
    // callback(currentChat);
  });
  socket.on('COMMUNITY_CHAT', (callback) => {
    getCommunityChat(callback);
  });
};


function addUser(userList, user) {
  const newList = {
    ...userList,
  };
  newList[user.name] = user;
  return newList;
}

function removeUser(userList, user) {
  let newList = userList;
  delete newList[user.name];
  console.log(newList);
  return newList;
}

module.exports = socketManager;
