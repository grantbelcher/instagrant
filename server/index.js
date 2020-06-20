/* eslint-disable import/order */
const express = require('express');
const path = require('path');
const cors = require('cors');
const userRoute = require('./routes/auth');

const app = express();

app.use(cors(), express.json());
app.use('/', express.static(path.join(__dirname, '../client/public')));
app.use('/auth', userRoute);

const PORT = 1000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!!!`);
});
