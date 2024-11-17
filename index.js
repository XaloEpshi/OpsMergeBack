require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { WebSocketServer } = require('ws');
const pool = require('./config/db');
const agendaRoutes = require('./routes/agendaRoutes');
const nacionalRoutes = require('./routes/nacionalRoutes');
const tareasRoutes = require('./routes/tareasRoutes');
const inventarioRoutes = require('./routes/inventarioRoutes');
const exportacionesRoutes = require('./routes/exportacionesRoutes');
const calendarioRoutes = require('./routes/calendarioRoutes'); // Importa las rutas del calendario

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // Para que la aplicación pueda interpretar JSON

// Configuración de CORS
const allowedOrigins = [
  'http://localhost:3000',
  'https://opsmerge-9458c.web.app'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

// Probar la conexión a la base de datos
pool.getConnection()
  .then((conn) => {
    console.log("Conexión exitosa a la base de datos");
    conn.release(); // Libera la conexión para que pueda ser usada por otros
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", {
      message: err.message,
      stack: err.stack,
      code: err.code,
      fatal: err.fatal,
      errno: err.errno,
      syscall: err.syscall,
      address: err.address,
      port: err.port
    });
    process.exit(1); // Termina el proceso si no puede conectarse a la base de datos
  });

// RUTAS
app.use('/api/agenda', agendaRoutes); // Usar las rutas de agenda
app.use('/api', nacionalRoutes); // Usar las rutas de despacho nacional
app.use('/api', tareasRoutes); // Usar las rutas de tareas diarias
app.use('/api', inventarioRoutes); // Usar las rutas para inventario
app.use('/api/exportaciones', exportacionesRoutes);
app.use('/api/calendario', calendarioRoutes); // Usar las rutas del calendario

// Iniciar el servidor HTTP solo si la conexión a la base de datos es exitosa
const server = app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

// Configuración del servidor WebSocket
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Nuevo cliente conectado');

  // Evento cuando se recibe un mensaje del cliente
  ws.on('message', (message) => {
    console.log('Mensaje recibido del cliente:', message);
    ws.send('Mensaje recibido por el servidor');
  });

  // Evento cuando se cierra la conexión
  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});
