const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  password: String,
  chats: [
    {
      type: Schema.ObjectId,
      ref: 'Chat',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
