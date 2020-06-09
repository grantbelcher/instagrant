const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  password: String,
  avatar: {
    type: String,
    default: null,
  },
  chats: [
    {
      type: Schema.ObjectId,
      ref: 'Chats',
    },
  ],
  notifications: [
    {
      type: Schema.ObjectId,
      ref: 'Chats',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
