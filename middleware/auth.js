
const jwt = require('jsonwebtoken');
const config = require('config');


const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.headers;
    console.log(token, 'AUTH MIDDLEWARE');
    if (!token) return res.status(401).json({ message: 'token required' });
    const secret = 'mysecretkey';
    const payload = jwt.decode(token, secret);
    const { id } = payload;
    if (!id) return res.status(401).json({ message: 'token required' });
    req.user = id;
    return next();
  } catch (error) {
    return res.json({ message: 'authorization error, token required.' });
  }
};

module.exports = authMiddleware;
