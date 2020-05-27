const express = require('express');

const router = express.Router();

// test router
router.get('/', (req, res) => res.send('yooo'));

// router.post('/', async(req, res) => {
//   const { name, password } = req.body;
//   try {
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).json({ message: 'server error' });
//   }
// });
module.exports = router;
