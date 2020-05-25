const express = require('express');
const path = require('path');

const PORT = 1000;
const app = express();

app.use('/', express.static(path.join(__dirname, '../client/public')));


app.get('/', (req, res) => {
  res.send(`listening on port ${PORT}!`);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
