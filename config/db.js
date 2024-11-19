const mysql = require('mysql2/promise');
require('dotenv').config();

// Crear la conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true, 
  connectionLimit: 10, 
  queueLimit: 0, 
  connectTimeout: 60000 // 60 segundos
});



module.exports = pool;
