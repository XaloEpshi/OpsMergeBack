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

// Obtener una sola bodega por ID
exports.getBodegaById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await pool.query('SELECT * FROM InventarioBodegas WHERE id = ?', [id]);
        console.log(`Bodega obtenida con ID ${id}:`, results[0]);
        res.json(results[0]);
    } catch (err) {
        console.error(`Error al obtener la bodega con ID ${id}:`, err);
        return res.status(500).send(err);
    }
};

// Crear una nueva bodega
exports.createBodega = async (req, res) => {
    const { nombre_bodega, fecha_inventario, detalle_inventario, responsable } = req.body; // Incluye responsable
    try {
        const [results] = await pool.query(
            'INSERT INTO InventarioBodegas (nombre_bodega, fecha_inventario, detalle_inventario, responsable) VALUES (?, ?, ?, ?)', 
            [nombre_bodega, fecha_inventario, detalle_inventario, responsable] // Asegúrate de pasar responsable
        );
        console.log('Nueva bodega creada:', { id: results.insertId, nombre_bodega, fecha_inventario, detalle_inventario, responsable });
        res.status(201).json({ id: results.insertId, nombre_bodega, fecha_inventario, detalle_inventario, responsable });
    } catch (err) {
        console.error('Error al crear una nueva bodega:', err);
        return res.status(500).send(err);
    }
};

// Actualizar una bodega existente
exports.updateBodega = async (req, res) => {
    const { id } = req.params;
    const { nombre_bodega, fecha_inventario, detalle_inventario, responsable } = req.body; // Incluye responsable
    try {
        await pool.query(
            'UPDATE InventarioBodegas SET nombre_bodega = ?, fecha_inventario = ?, detalle_inventario = ?, responsable = ? WHERE id = ?', 
            [nombre_bodega, fecha_inventario, detalle_inventario, responsable, id] // Asegúrate de pasar responsable
        );
        console.log(`Bodega con ID ${id} actualizada:`, { nombre_bodega, fecha_inventario, detalle_inventario, responsable });
        res.status(204).send();
    } catch (err) {
        console.error(`Error al actualizar la bodega con ID ${id}:`, err);
        return res.status(500).send(err);
    }
};

// Eliminar una bodega
exports.deleteBodega = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM InventarioBodegas WHERE id = ?', [id]);
        console.log(`Bodega con ID ${id} eliminada`);
        res.status(204).send();
    } catch (err) {
        console.error(`Error al eliminar la bodega con ID ${id}:`, err);
        return res.status(500).send(err);
    }
};
