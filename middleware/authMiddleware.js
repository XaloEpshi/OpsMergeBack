const admin = require('firebase-admin');
const { auth } = require('../config/firebase'); // Si ya tienes tu configuración de Firebase

// Asegúrate de inicializar Firebase Admin SDK en tu archivo de configuración.
admin.initializeApp({
  credential: admin.credential.applicationDefault(), // o usa otro método de autenticación para producción
});

const verifyAuth = (req, res, next) => {
  // Obtén el token de autorización del header de la solicitud
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized: No token provided');
  }

  // Verifica el token con Firebase Admin SDK
  admin.auth().verifyIdToken(token)
    .then((decodedToken) => {
      // Si el token es válido, añade el usuario a la solicitud
      req.user = decodedToken; // o usa decodedToken.uid según tu caso
      next();
    })
    .catch((error) => {
      console.error('Error verifying token:', error);
      res.status(401).send('Unauthorized: Invalid token');
    });
};

module.exports = verifyAuth;
