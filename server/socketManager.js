
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
    socket.broadcast.emit('NEW_USER_CONNECTED', connectedUsers);
    socket.emit('NEW_USER_CONNECTED', connectedUsers);
  });
  // USER DISCONNECTS
  socket.on('USER_DISCONNECTED', (user) => {
    if (user !== null) {
      connectedUsers = removeUser(connectedUsers, user);
      socket.broadcast.emit('NEW_USER_CONNECTED', connectedUsers);
    }
  });
  socket.on('MESSAGE_SENT', async (message) => {
    console.log(message, 'looooook heeeeeeeeeeeer');
    const { chatId, user, text } = message;
    const currentChat = await Chat.findById(chatId);
    currentChat.messages.push({
      username: user.name,
      avatar: user.avatar,
      text,
    });
    await currentChat.save();
    socket.broadcast.emit('MESSAGE_RECIEVED', currentChat);
    socket.emit('MESSAGE_RECIEVED', currentChat);
  });
  socket.on('COMMUNITY_CHAT', (callback) => {
    getCommunityChat(callback);
  });
  // socket.on('disconnect', (obj) => {
  //   console.log('!!!!!!!!!!!!!!!', obj);
  // });
};


function addUser(userList, user) {
  const newList = {
    ...userList,
  };
  newList[user.name] = user;
  return newList;
}

function removeUser(userList, user) {
  console.log(user, 'look here');
  let newList = userList;
  if (newList[user.name]) {
    delete newList[user.name];
  }
  return newList;
}

module.exports = socketManager;
