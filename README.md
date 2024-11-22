# Proyecto de Gestión de Usuarios y Roles

## Descripción

Este proyecto es una API construida con Node.js, Express y MySQL que permite la gestión de usuarios y roles. Los usuarios pueden tener diferentes roles, como `Facturadores` y `Jefes`, y se pueden crear, actualizar, leer y eliminar tanto usuarios como roles. Esta API es útil para aplicaciones que requieren autenticación y autorización basada en roles.

### Características:
- Crear, leer, actualizar y eliminar usuarios.
- Gestión de roles, permitiendo asignar roles a los usuarios.
- Validación de datos para usuarios y roles.
- Hashing de contraseñas utilizando `bcryptjs`.
- Conexión a una base de datos MySQL usando `mysql2/promise`.

---

## Instalación

Para instalar las dependencias del proyecto
npm install

## Configuracion de las variables de entorno del archivo .env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_base_datos
PORT=3000


## Endpoints

Usuarios

Método	Ruta	Descripción
POST	/api/usuarios	Crear un nuevo usuario
GET	/api/usuarios	Obtener todos los usuarios
GET	/api/usuarios/:id	Obtener un usuario por ID o nombre
PUT	/api/usuarios/:id	Actualizar un usuario por ID
DELETE	/api/usuarios/:id	Eliminar un usuario por ID

Roles

Método	Ruta	Descripción
POST	/api/roles	Crear un nuevo rol
GET	/api/roles	Obtener todos los roles
GET	/api/roles/:id	Obtener un rol por ID
PUT	/api/roles/:id	Actualizar un rol por ID
DELETE	/api/roles/:id	Eliminar un rol por ID



## Estructura del proyeto

proyecto/Back
│
├── config/
│   └── db.js               # Configuración de la base de datos
│
├── controllers/
│   ├── exportacionController.js    # Controlador para la gestión de exportaciones
│   └── inventoryController.js   # Controlador para la gestión de inventario
│   └── roleController.js   # Controlador para la gestión de roles
│   └── tareaController.js   # Controlador para la gestión de tareas
│   └── userController.js   # Controlador para la gestión de usuarios
│
├── middleware/
│   ├── authMiddleware.js    # Middleware para verifcar si el usuario esta autenticado
│
├── routes/
│   ├── exportacionRoutes.js        # Rutas para la gestión de exportacion
│   └── rolesRoutes.js       # Rutas para la gestión de roles
│   └── inventoryRoutes.js       # Rutas para la gestión de inventario
│   └── tareasRoutes.js       # Rutas para la gestión de tareas
│   └── userRoutes.js       # Rutas para la gestión de usuarios
│
├── scripts/
│   └── create_tables.sql    # Script SQL para crear las tablas de la base de datos
│
├── .env                     # Variables de entorno (no incluído en el repositorio)
├── index.js                 # Punto de entrada de la aplicación
├── package.json             # Archivo de configuración de npm
└── README.md                # Este archivo
│
├── front/



codigo front 


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
const port = process.env.PORT || 3001;
app.use(express.json()); 

// Configura CORS para permitir solicitudes desde tu dominio de front-end
const corsOptions = {
  origin: 'https://opsmerge-9458c.web.app', 
  optionsSuccessStatus: 200 // Para compatibilidad con navegadores legacy
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

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/test', (req, res) => {
  res.send('El servidor está funcionando correctamente!');
});

// Configuración del servidor WebSocket utilizando el servidor ya existente
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
