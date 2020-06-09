const db = require('./index');

db();
const Chat = require('./models/Chat');
const User = require('./models/User');

const initialUsers = [
  {
    avatar: 'https://i2.wp.com/www.wizmnews.com/wp-content/uploads/2020/04/Donald-Trump-Ap-13-presser-face-AP.jpeg?resize=80%2C80&ssl=1',
    _id: '5eceed1fc868515bc9818ee4',
    name: 'DonaldTrump',
    password: '$2b$10$zKI5/wdRKD8NAu7Z1BIpAeQCjgzCBGQpRLZZW./F0P55dJO1k4usi',
    __v: 1,
  },
  {
    avatar: 'https://www.whosampled.com/static/track_images/r9591_201069_21950898901.jpg',
    _id: '5eceee6ec868515bc9818ee5',
    name: 'Billy Idol',
    password: '$2b$10$UslfI5gBdM0t/4rbyAiEuONMEw0SlUleyID7T9wOrjrREXiXKZ3ga',
    __v: 0,
  },
  {
    avatar: 'https://jilliebushell.com/wp-content/uploads/2017/01/billyochds.jpg',
    _id: '5eceef0ac868515bc9818ee6',
    name: 'Billy Ocean',
    password: '$2b$10$8Ro4vYLf2fKom.EG5FmCpOmyr7BZroed5Z6kkB/QqxpYorY11Dbz6',
    __v: 1,
  },
  {
    avatar: 'https://www.unm.edu/~popejoy/Pics/Bill%20Cosby%20100x100.jpg',
    _id: '5eceef66c868515bc9818ee7',
    name: 'Bill Cosby',
    password: '$2b$10$EcHInRINYL9C2N5ullllKeyaudMICSqHmn0S2lyh3isg90wqjBb0i',
    __v: 0,
  },
  {
    avatar: 'https://cdn2.poz.com/7434_bill-clinton.jpg_f5c038ca-90eb-4c31-9873-4831b4e76a3e.jpeg',
    _id: '5eceef8cc868515bc9818ee8',
    name: 'Bill Clinton',
    password: '$2b$10$nW3M54yG8szncMeNll5m2.xXkSf5tIGqYayzSW7a1Jo7CjPdL6S.C',
    __v: 0,
  },
  {
    avatar: 'https://d1ynl4hb5mx7r8.cloudfront.net/wp-content/uploads/2014/09/bill-murray-100.jpg',
    _id: '5eceefe9c868515bc9818ee9',
    name: 'Bill Murray',
    password: '$2b$10$GsJMTfJwuGvfYy8ejypZgOY6ZlrEySP.L45P9mv.XGHhEvPk/i.Qq',
    __v: 0,
  },
  {
    avatar: 'https://thehill.com/sites/default/files/styles/thumb_100/public/kardashiankourtney_04232018getty_0.jpg?itok=J6S55Obi',
    _id: '5ecef01dc868515bc9818eea',
    name: 'Kim K',
    password: '$2b$10$fgzirikQ1fDtIVrb9WNKRO4kTzNJZU/rsMTV3jUaxY9cwkvQoagZu',
    __v: 0,
  },
  {
    avatar: 'https://is1-ssl.mzstatic.com/image/thumb/Purple123/v4/33/17/fd/3317fd6c-e444-3c46-3578-c7f4defd2730/source/256x256bb.jpg',
    _id: '5ecef0c9c868515bc9818eeb',
    name: 'Angelina Jolie',
    password: '$2b$10$e1t25zUn.HyVKvfFtuWh3Obu.T8njf/Fx.SVcz0bFhgtiev8tYxHW',
    __v: 0,
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/2913753000/129d83cbfb9d09b921e3a70c885379f0.jpeg',
    _id: '5ecef0f1c868515bc9818eec',
    name: 'Sofia V',
    password: '$2b$10$CBoVdt0MMxpvy9nKaY5Z9u1q.GZ.1Xmav3ryQlL9c1IQ7R3Bm/Lt.',
    __v: 0,
  },
  {
    avatar: 'https://is2-ssl.mzstatic.com/image/thumb/Purple71/v4/f2/13/74/f21374ed-8a0f-70a4-2f03-b863315e0f4c/source/256x256bb.jpg',
    _id: '5ecef13ec868515bc9818eed',
    name: 'admin69',
    password: '$2b$10$q1XfX9hzEupbutt2FYerKuJsV6whTHKeIekP07ZuMOUTGjI0q4peO',
    __v: 2,
  },
];

const initialMessage = {
  _id: '5ed81e09b1a0c469407c0216',
  username: 'admin69',
  avatar: 'https://is2-ssl.mzstatic.com/image/thumb/Purple71/v4/f2/13/74/f21374ed-8a0f-70a4-2f03-b863315e0f4c/source/256x256bb.jpg',
  text: 'NEW CHAT CREATED',
};

// const createUsers = async (userList) => {
//   const { _id } = await Chat.findOne({ name: 'Community' });

// };

const seed = async () => {
  const community = new Chat({ name: 'Community', messages: [initialMessage] });
  await community.save();
  initialUsers.forEach(async (user) => {
    const newUser = new User(user);
    newUser.chats.push(community._id);
    await newUser.save();
  });
};

seed();
