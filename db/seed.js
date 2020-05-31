const db = require('./index');
db();
const Chat = require('./models/Chat');


const seed = async () => {
  const community = new Chat({ name: 'Community' });
  await community.save();
};

seed();
