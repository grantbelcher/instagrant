
const User = require('../db/models/User');
const Chat = require('../db/models/Chat');
const Message = require('../db/models/Message');


let connectedUsers = {};
let typingUsers = {};

const getCommunityChat = (callback) => {
  Chat.findOne({ name: 'Community' }, (err, data) => {
    if (err) console.error(err);
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

  socket.on('MESSAGE_SENT', (message) => {
    const { chatId, user, text } = message;
    console.log(message, 'MESSAGE SENT');
    let currentChat;
    Chat.findById(chatId)
      .then((doc) => {
        doc.messages.push({
          username: user.name,
          avatar: user.avatar,
          text,
        });
        return doc;
      })
      .then((updatedChat) => {
        updatedChat.save()
          .then((newChat) => {
            socket.broadcast.emit('MESSAGE_RECIEVED', newChat);
            socket.emit('MESSAGE_RECIEVED', newChat);
          })
          .catch((err) => {
            console.error(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });

    // currentChat.save()
    //   .then(() => {
    //     socket.broadcast.emit('MESSAGE_RECIEVED', currentChat);
    //   })
    //   .then(() => {
    //     socket.emit('MESSAGE_RECIEVED', currentChat);
    //   })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // });
   });
  socket.on('NEW_CHAT_CREATED', async (chat) => {
    console.log(chat, 'prior to broadcasting');
    socket.broadcast.emit('NEW_CHAT', chat);
    socket.emit('NEW_CHAT', chat);
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
  if (newList[user.name]) {
    delete newList[user.name];
  }
  return newList;
}


module.exports = socketManager;
