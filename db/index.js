const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(
    'mongodb://127.0.0.1:27017/vicarious',
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
