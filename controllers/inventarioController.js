const pool = require('../config/db');

// Obtener todas nuevos inventario
exports.getAllBodegas = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM InventarioBodegas');
        console.log('Todas las bodegas obtenidas:', results);
        res.json(results);
    } catch (err) {
        console.error('Error al obtener todas las bodegas:', err);
        return res.status(500).send(err);
    }
};

// Crear una nueva bodega
exports.createBodega = async (req, res) => {
    const { nombre_bodega, fecha_inventario, detalle_inventario, responsable } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const userId = decodedToken.uid;
  
      const [results] = await pool.query(
        'INSERT INTO InventarioBodegas (nombre_bodega, fecha_inventario, detalle_inventario, responsable, userId) VALUES (?, ?, ?, ?, ?)', 
        [nombre_bodega, fecha_inventario, detalle_inventario, responsable, userId]
      );
      res.status(201).json({ id: results.insertId, nombre_bodega, fecha_inventario, detalle_inventario, responsable, userId });
    } catch (err) {
      console.error('Error al crear una nueva bodega:', err);
      res.status(500).send(err);
    }
  };
  

// Obtener un inventario por ID
exports.getBodegaById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await pool.query('SELECT * FROM InventarioBodegas WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).send('Inventario no encontrado');
        }
        console.log(`Bodega obtenida con ID ${id}:`, results[0]);
        res.json(results[0]);
    } catch (err) {
        console.error(`Error al obtener la bodega con ID ${id}:`, err);
        return res.status(500).send(err);
    }
};

// Actualizar un inventario (con validación de responsable)
exports.updateBodega = async (req, res) => {
    const { id } = req.params;
    const { nombre_bodega, fecha_inventario, detalle_inventario, responsable } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const userId = decodedToken.uid;
  
      const [rows] = await pool.query('SELECT userId FROM InventarioBodegas WHERE id = ?', [id]);
      if (rows.length === 0) return res.status(404).json({ message: 'Bodega no encontrada' });
  
      if (rows[0].userId !== userId) {
        return res.status(403).json({ message: 'No tienes permiso para editar esta bodega' });
      }
  
      await pool.query(
        'UPDATE InventarioBodegas SET nombre_bodega = ?, fecha_inventario = ?, detalle_inventario = ?, responsable = ? WHERE id = ?', 
        [nombre_bodega, fecha_inventario, detalle_inventario, responsable, id]
      );
      res.status(204).send();
    } catch (err) {
      console.error(`Error al actualizar la bodega con ID ${id}:`, err);
      res.status(500).send(err);
    }
  };
  


// Eliminar un inventario (con validación de responsable)
exports.deleteBodega = async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const userId = decodedToken.uid;
  
      const [rows] = await pool.query('SELECT userId FROM InventarioBodegas WHERE id = ?', [id]);
      if (rows.length === 0) return res.status(404).json({ message: 'Bodega no encontrada' });
  
      if (rows[0].userId !== userId) {
        return res.status(403).json({ message: 'No tienes permiso para eliminar esta bodega' });
      }
  
      await pool.query('DELETE FROM InventarioBodegas WHERE id = ?', [id]);
      res.status(204).send();
    } catch (err) {
      console.error(`Error al eliminar la bodega con ID ${id}:`, err);
      res.status(500).send(err);
    }
  };
  



