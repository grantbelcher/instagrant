const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
  id: Schema.ObjectId,
  chatId: String,
  username: String,
  text: String,
  avatar: String,
  date: {
    type: Date,
    default: Date.now,
  },
  favorites: [
    String,
  ],
});

module.exports = mongoose.model('Message', messageSchema);
