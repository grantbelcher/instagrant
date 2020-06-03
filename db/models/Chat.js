const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema({
  name: String,
  users: [
    {
      _id: {
        type: Schema.ObjectId,
        ref: 'User',
      },
      name: String,
      avatar: String,
    },
  ],
  messages: [
    {
      id: Schema.ObjectId,
      username: String,
      avatar: String,
      text: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});


module.exports = mongoose.model('Chat', chatSchema);
