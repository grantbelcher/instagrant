
const User = require('../db/models/User');
const Chat = require('../db/models/Chat');
const Message = require('../db/models/Message');


let connectedUsers = {};
const getCommunityChat = (callback) => {
  Chat.find({}, (err, data) => {
    if (err) console.error(err);
    console.log(data);
    callback(data);
  });
  // try {
  //   const communityChat = await Chat.find({});
  //   return communityChat;
  // } catch (err) {
  //   console.error(err.message);
  //   return null;
  // }
};



const socketManager = (socket) => {

  // USER CONNECTS
  socket.on('USER_CONNECTED', (user) => {
    connectedUsers = addUser(connectedUsers, user);
    console.log(connectedUsers, 'connected users');
  });
  // USER DISCONNECTS
  socket.on('USER_DISCONNECTED', (user) => {
    console.log('yoo');
    connectedUsers = removeUser(connectedUsers, user);
    console.log(connectedUsers, 'connected users');
  });
  // USER LOGS OUT
  socket.on('MESSAGE_SENT', (message) => {
    // console.log(message);
    // community.push(message);
    // console.log(community, 'messages');
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

// function sendMessage (chatId, message) => {
//   const { socket }
// }

module.exports = socketManager;
