const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema({
  users: [
    {
      type: Schema.ObjectId, ref: 'User',
    },
  ],
  messages: [
    {
      id: mongoose.Types.ObjectId(),
      username: String,
      text: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model('Chats', chatSchema);
