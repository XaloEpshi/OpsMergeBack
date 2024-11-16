require("dotenv").config();
const express = require("express");
const cors = require("cors"); 
const { WebSocketServer } = require("ws");
const pool = require("./config/db");
const agendaRoutes = require('./routes/agendaRoutes');
const nacionalRoutes = require("./routes/nacionalRoutes");
const tareasRoutes = require("./routes/tareasRoutes");
const inventarioRoutes = require("./routes/inventarioRoutes");
const exportacionesRoutes = require("./routes/exportacionesRoutes");
const calendarioRoutes = require('./routes/calendarioRoutes'); // Importa las rutas del calendario
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // Para que la aplicación pueda interpretar JSON

// Configuración de CORS
const corsOptions = {
  origin: ['https://your-frontend-domain.firebaseapp.com', 'http://localhost:3000'], // Reemplaza con el dominio de tu frontend y localhost
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions)); // Usamos cors con las opciones definidas

// Probar la conexión a la base de datos
pool.getConnection()
  .then((conn) => {
    console.log("Conexión exitosa a la base de datos");
    conn.release(); // Libera la conexión para que pueda ser usada por otros
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
  });

// RUTAS
app.use('/api/agenda', agendaRoutes); // Usar las rutas de agenda
app.use('/api', nacionalRoutes); // Usar las rutas de despacho nacional
app.use('/api', tareasRoutes);//usar las rutas de tareas diarias
app.use('/api', inventarioRoutes); //usa las rutas para inventario
app.use('/api/exportaciones', exportacionesRoutes);
app.use('/api/calendario', calendarioRoutes); // Usar las rutas del calendario


// Iniciar el servidor HTTP
const server = app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

// Configuración del servidor WebSocket
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Nuevo cliente conectado");

  // Evento cuando se recibe un mensaje del cliente
  ws.on("message", (message) => {
    console.log("Mensaje recibido del cliente:", message);
    ws.send("Mensaje recibido por el servidor");
  });

  // Evento cuando se cierra la conexión
  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});

