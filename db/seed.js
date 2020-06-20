// console.log('yo')
const Promise = require('bluebird');
const db = require('./index');

const createUserQuery = ({
  username, fullname, bio, photo, password,
}) => {
  const values = `"${username}", "${fullname}", "${bio}", "${photo}", "${password}"`;
  return `INSERT INTO users (username, fullname, bio, photo, password) VALUES (${values});`;
};

const initialUsers = [
  {
    username: 'PresTrump',
    fullname: 'Donald J Trump',
    password: '111111',
    bio: 'a huge piece of shit',
    photo: 'https://i2.wp.com/www.wizmnews.com/wp-content/uploads/2020/04/Donald-Trump-Ap-13-presser-face-AP.jpeg?resize=80%2C80&ssl=1',
  },
  {
    username: 'BillyOcean',
    fullname: 'Billy Ocean',
    password: '111111',
    bio: 'Get out of my dreams and into my car!',
    photo: 'https://jilliebushell.com/wp-content/uploads/2017/01/billyochds.jpg',
  },
  {
    username: 'BillyIdol',
    fullname: 'BillyIdol',
    password: '111111',
    bio: 'Its a nice day for a White Wedding',
    photo: 'https://www.whosampled.com/static/track_images/r9591_201069_21950898901.jpg',
  },
  {
    username: 'TrillMurray420',
    fullname: 'Bill Murray',
    password: '111111',
    bio: 'The best way to teach your kids about taxes is by eating 30 percent of their ice cream.',
    photo: 'https://d1ynl4hb5mx7r8.cloudfront.net/wp-content/uploads/2014/09/bill-murray-100.jpg',
  },
  {
    username: 'KimK',
    fullname: 'Kim Kardashian',
    password: '111111',
    bio: 'a waste of a human being',
    photo: 'https://thehill.com/sites/default/files/styles/thumb_100/public/kardashiankourtney_04232018getty_0.jpg?itok=J6S55Obi',
  },
  {
    username: 'SexySaxMan',
    fullname: 'Bill Clinton',
    password: '111111',
    bio: 'when I was in England I experimented with marijuana a time or two, and I didn’t like it. I didn’t inhale it, and never tried it again',
    photo: 'https://pbs.twimg.com/profile_images/1016163015723552769/ZsrVkp3e_400x400.jpg',
  },
];

const configureDb = () => {
  Promise.promisifyAll(db);
  return db.queryAsync('DROP DATABASE IF EXISTS instagrant;')
    .then(() => {
      console.log('theennnn');
      db.queryAsync('CREATE DATABASE instagrant;');
    })
    .then(() => {
      db.queryAsync('USE instagrant;');
    })
    .then(() => {
      db.queryAsync(`CREATE TABLE users (
      userId INT AUTO_INCREMENT,
      username VARCHAR(20) NOT NULL,
      fullname VARCHAR(20) NOT NULL,
      password VARCHAR(12) NOT NULL,
      bio VARCHAR(255),
      photo VARCHAR(255), 
      PRIMARY KEY(userId)
      );`);
    })
    .then(() => {
      db.queryAsync(`CREATE TABLE posts (
        postId INT AUTO_INCREMENT,
        authorId INT,
        username VARCHAR(20) NOT NULL,
        location VARCHAR(50),
        picture VARCHAR(255),
        PRIMARY KEY (postId),
        FOREIGN KEY (authorId) REFERENCES users(userId)
      );`);
    })
    .then(() => {
      db.queryAsync(`CREATE TABLE relationships (
        id INT AUTO_INCREMENT,
        followerId INT,
        followingId INT,
        PRIMARY KEY (id),
        FOREIGN KEY (followerId) REFERENCES users(userId),
        FOREIGN KEY (followingId) REFERENCES users(userId)
      );`);
    })
    .then(() => {
      db.queryAsync(`CREATE TABLE likes(
        id INT AUTO_INCREMENT,
        userId INT,
        postId INT,
        PRIMARY KEY (id),
        FOREIGN KEY (userId) REFERENCES users(userId),
        FOREIGN KEY (postId) REFERENCES users(userId)
      );`);
    })
    .then(() => {
      db.queryAsync(`CREATE TABLE tags(
        id INT AUTO_INCREMENT,
        userId INT,
        postId INT,
        PRIMARY KEY (id),
        FOREIGN KEY (userId) REFERENCES users(userId),
        FOREIGN KEY (postId) REFERENCES users(userId)
      );`);
    })
    .then(() => {
      db.queryAsync(`CREATE TABLE comments(
        commentId INT AUTO_INCREMENT,
        userId INT,
        postId INT,
        parentId INT,
        text VARCHAR(255),
        PRIMARY KEY (commentId),
        FOREIGN KEY (userId) REFERENCES users(userId),
        FOREIGN KEY (postId) REFERENCES posts(postId),
        FOREIGN KEY (parentId) REFERENCES comments(commentId)
      );`);
    })
    .then(() => {
      initialUsers.forEach((user) => {
        const insertQuery = createUserQuery(user);
        db.queryAsync(insertQuery);
      });
    })
    .catch((err) => {
      console.log(err, 'ERROR');
    })
    .finally(() => {
      db.end((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Connection closed');
        }
      });
    });
};

configureDb();
