// console.log('yo')
const Promise = require('bluebird');
const db = require('./index');

console.log('starting');

const configureDb = () => {
  Promise.promisifyAll(db);
  console.log(db, 'ater promise');
  return db.queryAsync('DROP DATABASE IF EXISTS instagrant;')
    .then(() => {
      console.log('theennnn');
      db.queryAsync('CREATE DATABASE instagrant;');
    })
  //   .then(() => {
  //     db.connection.queryAsync('USE DATABASE instagrant;');
  //   })
  //   .then(() => {
  //     db.connection.queryAsync(`CREATE TABLE users (
  //     userId INT AUTOINCREMENT,
  //     username VARCHAR(20) NOT NULL,
  //     fullname VARCHAR(20) NOT NULL,
  //     bio VARCHAR(255) NOT NULL,
  //     photo VARCHAR(255), 
  //     PRIMARY KEY(userId)
  //     );`);
  //   })
  //   .then(() => {
  //     db.connection.queryAsync(`CREATE TABLE posts (
  //       postId INT AUTOINCREMENT,
  //       userId INT,
  //       username VARCHAR(20) NOT NULL,
  //       location VARCHAR(50),
  //       picture VARCHAR(255),
  //       PRIMARY KEY (postId)
  //       FOREIGN KEY (authorId) REFERENCES users(userId)
  //     );`);
  //   })
  //   .then(() => {
  //     db.connection.queryAsync(`CREATE TABLE relationships (
  //       id INT AUTOINCREMENT,
  //       followerId INT,
  //       followingId INT,
  //       PRIMARY KEY (id),
  //       FOREIGN KEY (followerId) REFERENCES users(userId),
  //       FOREIGN KEY (followingId) REFERENCES users(userId)
  //     );`);
  //   })
  //   .then(() => {
  //     db.connection.queryAsync(`CREATE TABLE likes(
  //       id INT AUTOINCREMENT,
  //       userId INT,
  //       postId INT,
  //       PRIMARY KEY (id),
  //       FOREIGN KEY (userId) REFERENCES users(userId),
  //       FOREIGN KEY (postId) REFERENCES users(userId)
  //     );`);
  //   })
  //   .then(() => {
  //     db.connection.queryAsync(`CREATE TABLE likes(
  //       id INT AUTOINCREMENT,
  //       userId INT,
  //       postId INT,
  //       PRIMARY KEY (id),
  //       FOREIGN KEY (userId) REFERENCES users(userId),
  //       FOREIGN KEY (postId) REFERENCES users(userId)
  //     );`);
  //   })
  //   .then(() => {
  //     db.connection.queryAsync(`CREATE TABLE comments(
  //       commentId INT AUTOINCREMENT,
  //       userId INT,
  //       postId INT,
  //       parentId INT,
  //       text VARCHAR(255),
  //       PRIMARY KEY (commentId),
  //       FOREIGN KEY (userId) REFERENCES users(userId),
  //       FOREIGN KEY (postId) REFERENCES posts(postId),
  //       FOREIGN KEY (parentId) REFERENCES comments(commentId)
  //     );`);
  //   })
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
