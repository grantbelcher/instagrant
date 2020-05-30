const User = require('../db/models/User');
const Chat = require('../db/models/Chats');
const Message = require('../db/models/Message');

let connectedUsers = {};
let community = [];

const socketManager = (socket) => {


  // USER CONNECTS
  socket.on('USER_CONNECTED', (user) => {
    connectedUsers = addUser(connectedUsers, user);
    console.log(connectedUsers, 'connected');
  });
  // USER DISCONNECTS
  socket.on('USER_DISCONNECTED', (user) => {
    console.log('yoo')
    connectedUsers = removeUser(connectedUsers, user);
    console.log(connectedUsers, 'connected users');
  });
  // USER LOGS OUT
  socket.on('MESSAGE_SENT', (message) => {
    console.log(message);
    community.push(message);
    console.log(community, 'messages');
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
