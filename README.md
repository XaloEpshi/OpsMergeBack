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
