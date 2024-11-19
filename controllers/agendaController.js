const pool = require('../config/db');

// Obtener todos los eventos
exports.getAllEvents = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM agenda_diaria');
        if (results.length === 0) {
            return res.status(404).json({ message: "No hay eventos en la agenda." });
        }
        res.json({ message: "Eventos obtenidos con éxito.", data: results });
    } catch (err) {
        return res.status(500).json({ message: "Hubo un error al obtener los eventos.", error: err.message });
    }
};

// Obtener un solo evento por ID
exports.getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await pool.query('SELECT * FROM agenda_diaria WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: `Evento con ID ${id} no encontrado.` });
        }
        res.json({ message: "Evento encontrado con éxito.", data: results[0] });
    } catch (err) {
        return res.status(500).json({ message: "Hubo un error al obtener el evento.", error: err.message });
    }
};

// Crear un nuevo evento
exports.createEvent = async (req, res) => {
    const { fecha, hora, detalles } = req.body;
    try {
        const [results] = await pool.query('INSERT INTO agenda_diaria (fecha, hora, detalles) VALUES (?, ?, ?)', [fecha, hora, detalles]);
        res.status(201).json({
            message: "Evento creado con éxito.",
            data: { id: results.insertId, fecha, hora, detalles }
        });
    } catch (err) {
        return res.status(500).json({ message: "Hubo un error al crear el evento.", error: err.message });
    }
};

// Actualizar un evento existente
exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const { fecha, hora, detalles } = req.body;
    try {
        const [result] = await pool.query('UPDATE agenda_diaria SET fecha = ?, hora = ?, detalles = ? WHERE id = ?', [fecha, hora, detalles, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Evento con ID ${id} no encontrado para actualizar.` });
        }
        res.status(200).json({ message: "Evento actualizado con éxito." });
    } catch (err) {
        return res.status(500).json({ message: "Hubo un error al actualizar el evento.", error: err.message });
    }
};


// Eliminar un evento
exports.deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM agenda_diaria WHERE id = ?', [id]);

        // Verificar si se eliminó alguna fila
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Evento con ID ${id} no encontrado.` });
        }

        res.status(204).json({ message: "Evento eliminado con éxito." });
    } catch (err) {
        return res.status(500).json({ message: "Hubo un error al eliminar el evento.", error: err.message });
    }
};


