const mongoose = require('mongoose');
const config = require('config');

const dbUrl = "mongodb+srv://native-d4ivu.mongodb.net/instagrant";

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
