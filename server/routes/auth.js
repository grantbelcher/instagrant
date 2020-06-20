const express = require('express');
const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const { createUserQuery } = require('../../db/queries/users');
const db = require('../../db/index');

Promise.promisifyAll(db);
const router = express.Router();

// test router
router.get('/', (req, res) => {
  db.queryAsync('SELECT * FROM users')
    .then((data) => res.send(data))
    .catch((err) => console.error(err.message));
});

// router.get('/profile', auth, async (req, res) => {
//   try {
//     const { user: id } = req;
//     const user = await User.findById(id).select('-password');
//     if (!user) return res.status(404).json({ message: 'cannot find user' });
//     return res.json({ user });
//   } catch (error) {
//     console.error(error.message);
//     return res.status(500).json({ message: 'server error' });
//   }
// });


router.post(
  '/SignUp',
  [
    check('username').isLength({ min: 5 }),
    check('fullName').isLength({ min: 1 }),
    check('password').isLength({ min: 5 }),
  ],
  (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { username, fullName, password } = req.body;
    db.queryAsync(`SELECT username FROM users WHERE username = "${username}"`)
      .then((matches) => {
        if (matches.length) {
          return res.status(401).json({ message: 'username already exists' });
        }
        const queryString = createUserQuery({ username, fullName, password });
        db.queryAsync(queryString)
          .then((data) => {
            db.queryAsync(`SELECT (userId) from users WHERE userId = "${data.insertId}"`)
              .then((result) => {
                console.log(result[0], 'dssd');
                const { userId } = result[0];
                const token = jwt.sign({ userId }, 'secret', { expiresIn: '1h' });
                return res.json({ token });
              });
          })
          .catch((err) => {
            console.error(err.message);
            res.status(500).json({ message: 'server error' });
          });
      })
      .catch((err) => {
        console.error(err, 'ERRRRRRRRR');
        return res.status(500).json({ message: 'server error' });
      });
    // const userExists = await User.findOne({ name });
    // if (userExists) return res.status(401).json({ message: 'user already exists' });
    // const salt = await bcrypt.genSalt(10);
    // const hashedPass = await bcrypt.hash(password, salt);

    // const { id } = newUser;
    // const secret = config.get('secret_key');
    // const token = jwt.sign({ id }, secret, { expiresIn: '1h' });
    // return res.json({ token });
    // console.error(err.message);
    // return res.status(500).json({ message: 'server error' });
  },
);

// router.post(
//   '/SignIn',
//   [
//     check('name').exists(),
//     check('password').exists(),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }
//     try {
//       const { name, password } = req.body;
//       const user = await User.findOne({ name });
//       const match = await bcrypt.compare(password, user.password);
//       if (!match || !user) return res.status(404).json({ message: 'invalid credentials' });
//       const { id } = user;
//       const secret = config.get('secret_key');
//       const token = jwt.sign({ id }, secret, { expiresIn: '1h' });
//       return res.json({ token });
//     } catch (err) {
//       console.error(err.message);
//       return res.status(500).json({ message: 'server error' });
//     }
//   },
// );


module.exports = router;
