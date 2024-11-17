const mysql = require('mysql2/promise');
require('dotenv').config();

// Log variables de entorno para verificación
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

const pool = mysql.createPool({
  host: process.env.DB_HOST || '34.70.156.149', // Host correcto
  user: process.env.DB_USER || 'root',
  port: process.env.DB_PORT || '3306', // Variable de entorno DB_PORT corregida
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'OpsMerge',
  waitForConnections: true, 
  connectionLimit: 10, 
  queueLimit: 0, 
  connectTimeout: 60000 // 60 segundos
});

module.exports = pool;
