const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || '34.70.156.149',
  user: process.env.DB_USER || 'root',
  port: '3306',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'OpsMerge' 
});

module.exports = pool;

