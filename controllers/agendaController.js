const pool = require('../config/db');

// Obtener todos los eventos
exports.getAllEvents = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM agenda_diaria');
        res.json(results);
    } catch (err) {
        return res.status(500).send(err);
    }
};

// Obtener un solo evento por ID
exports.getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await pool.query('SELECT * FROM agenda_diaria WHERE id = ?', [id]);
        res.json(results[0]);
    } catch (err) {
        return res.status(500).send(err);
    }
};

// Crear un nuevo evento
exports.createEvent = async (req, res) => {
    const { fecha, hora, detalles } = req.body;
    try {
        const [results] = await pool.query('INSERT INTO agenda_diaria (fecha, hora, detalles) VALUES (?, ?, ?)', [fecha, hora, detalles]);
        res.status(201).json({ id: results.insertId, fecha, hora, detalles });
    } catch (err) {
        return res.status(500).send(err);
    }
};

// Actualizar un evento existente
exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const { fecha, hora, detalles } = req.body;
    try {
        await pool.query('UPDATE agenda_diaria SET fecha = ?, hora = ?, detalles = ? WHERE id = ?', [fecha, hora, detalles, id]);
        res.status(204).send();
    } catch (err) {
        return res.status(500).send(err);
    }
};

// Eliminar un evento
exports.deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM agenda_diaria WHERE id = ?', [id]);
        res.status(204).send();
    } catch (err) {
        return res.status(500).send(err);
    }
};
