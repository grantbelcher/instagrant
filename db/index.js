const mongoose = require('mongoose');
const config = require('config');

const dbUrl = 'mongodb://ec2-34-222-36-118.us-west-2.compute.amazonaws.com:27017';

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
