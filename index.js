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
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

app.use(express.json()); 
app.use(cors());

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

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/test', (req, res) => {
  res.send('El servidor está funcionando correctamente!');
});

// Configuración del servidor WebSocket
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Nuevo cliente conectado');

  ws.on('message', (message) => {
    console.log('Mensaje recibido del cliente:', message);
    ws.send('Mensaje recibido por el servidor');
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

module.exports = app;
