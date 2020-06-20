DROP DATABASE IF EXISTS Instagrant;

CREATE DATABASE Instagrant;

USE INSTAGRANT;

DROP TABLE IF EXISTS 'users';

CREATE TABLE `users` (
  `userId` INT AUTOINCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `fullName` VARCHAR(20) NOT NULL,
  `bio` VARCHAR(255) NOT NULL,
  `photo` VARCHAR(255), 
  PRIMARY KEY(`userId`)
);

DROP TABLE IF EXISTS 'posts';

CREATE TABLE `posts`(
  `postId` INT AUTOINCREMENT,
  `userId` INT,
  `username` VARCHAR(20) NOT NULL,
  `location` VARCHAR(50),
  `picture` VARCHAR(255),
  PRIMARY KEY (`postId`)
  FOREIGN KEY (`authorId`) REFERENCES `users`(`userId`)
);

DROP TABLE IF EXISTS `relationships`;

CREATE TABLE `relationships`(
  `id` INT AUTOINCREMENT,
  `followerId` INT,
  `followingId` INT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`followerId`) REFERENCES `users`(`userId`),
  FOREIGN KEY (`followingId`) REFERENCES `users`(`userId`)
);

DROP TABLE IF EXISTS `likes`;

CREATE TABLE `likes`(
  `id` INT AUTOINCREMENT,
  `userId` INT,
  `postId` INT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`userId`),
  FOREIGN KEY (`postId`) REFERENCES `users`(`userId`)
);

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags`(
  `id` INT AUTOINCREMENT,
  `userId` INT,
  `postId` INT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`userId`),
  FOREIGN KEY (`postId`) REFERENCES `posts`(`postId`)
);

CREATE TABLE `comments` (
  `commentId` INT AUTOINCREMENT,
  `userId` INT,
  `postId` INT,
  `parentId` INT,
  `text` VARCHAR(255),
  PRIMARY KEY (`commentId`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`userId`),
  FOREIGN KEY (`postId`) REFERENCES `posts`(`postId`),
  FOREIGN KEY (`parentId`) REFERENCES `comments`(`commentId`)
);