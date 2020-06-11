const mongoose = require('mongoose');
const config = require('config');

const dbUrl = 'mongodb+srv://12345:12345@native-d4ivu.mongodb.net/instagrant?retryWrites=true&w=majority';

module.exports = () => {
  mongoose.connect(
    dbUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connection open');
  });

  mongoose.connection.on('error', (err) => {
    console.log(err, 'Mongoose connection FAILED');
  });
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection disconnected');
  });
};
