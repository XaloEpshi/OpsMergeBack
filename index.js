require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const cors = require('cors');
const { WebSocketServer } = require('ws');
const pool = require('./config/db'); // Configuración de la base de datos
const agendaRoutes = require('./routes/agendaRoutes');
const nacionalRoutes = require('./routes/nacionalRoutes');
const tareasRoutes = require('./routes/tareasRoutes');
const inventarioRoutes = require('./routes/inventarioRoutes');
const exportacionesRoutes = require('./routes/exportacionesRoutes');
const calendarioRoutes = require('./routes/calendarioRoutes');
const activitiesRoutes = require('./routes/activitiesRoutes');

const app = express();
const port = process.env.PORT || 3001; // Usar variable de entorno o puerto por defecto

// Middleware para parsear JSON
app.use(express.json()); 

// Configuración de CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(','); // Leer de las variables de entorno
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
    console.error("Error al conectar a la base de datos:", err.message);
    process.exit(1); // Termina el proceso si no puede conectarse a la base de datos
  });

// Rutas
app.use('/api/agenda', agendaRoutes); 
app.use('/api', nacionalRoutes); 
app.use('/api', tareasRoutes); 
app.use('/api', inventarioRoutes); 
app.use('/api/exportaciones', exportacionesRoutes);
app.use('/api/calendario', calendarioRoutes); 
app.use('/api/activities', activitiesRoutes);

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