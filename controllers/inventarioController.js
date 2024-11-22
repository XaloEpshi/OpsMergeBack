const pool = require('../config/db');

// Obtener todas las bodegas
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

    try {
        const [results] = await pool.query(
            'INSERT INTO InventarioBodegas (nombre_bodega, fecha_inventario, detalle_inventario, responsable) VALUES (?, ?, ?, ?)', 
            [nombre_bodega, fecha_inventario, detalle_inventario, responsable]
        );
        res.status(201).json({ id: results.insertId, nombre_bodega, fecha_inventario, detalle_inventario, responsable });
    } catch (err) {
        console.error('Error al crear una nueva bodega:', err);
        res.status(500).send(err);
    }
};

// Obtener una bodega por ID
exports.getBodegaById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await pool.query('SELECT * FROM InventarioBodegas WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).send('Bodega no encontrada');
        }
        console.log(`Bodega obtenida con ID ${id}:`, results[0]);
        res.json(results[0]);
    } catch (err) {
        console.error(`Error al obtener la bodega con ID ${id}:`, err);
        return res.status(500).send(err);
    }
};

// Actualizar una bodega
exports.updateBodega = async (req, res) => {
    const { id } = req.params;
    const { nombre_bodega, fecha_inventario, detalle_inventario, responsable } = req.body;
  
    try {
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

// Eliminar una bodega
exports.deleteBodega = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM InventarioBodegas WHERE id = ?', [id]);
        res.status(204).send();
    } catch (err) {
        console.error(`Error al eliminar la bodega con ID ${id}:`, err);
        res.status(500).send(err);
    }
};
