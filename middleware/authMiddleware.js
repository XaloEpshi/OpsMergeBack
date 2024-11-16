const { auth } = require('../config/firebase');
const { onAuthStateChanged } = require('firebase/auth');

const verifyAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  onAuthStateChanged(auth, (user) => {
    if (user && user.uid === token) {
      req.user = user;
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  });
};

module.exports = verifyAuth;
