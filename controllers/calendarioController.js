const pool = require('../config/db');

// Crear evento
exports.createEvent = async (req, res) => {
  const { title, start, end, allDay, userId } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Calendario (title, start, end, allDay, userId) VALUES (?, ?, ?, ?, ?)',
      [title, start, end, allDay, userId]
    );
    console.log(`Evento creado: ${JSON.stringify(req.body)}`);
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error('Error al crear el evento:', error);
    res.status(500).json({ message: 'Error al crear el evento', error });
  }
};

//Obtener todos los eventos
exports.getEvents = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: 'UserId es requerido' });
  }
  try {
    const [rows] = await pool.query('SELECT * FROM Calendario WHERE userId = ?', [userId]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los eventos:', error);
    res.status(500).json({ message: 'Error al obtener los eventos', error });
  }
};


// Obtener evento por ID
exports.getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Calendario WHERE id = ?', [id]);
    if (rows.length === 0) {
      console.log(`Evento no encontrado para id: ${id}`);
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    console.log(`Evento obtenido para id ${id}: ${JSON.stringify(rows[0])}`);
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error al obtener el evento:', error);
    res.status(500).json({ message: 'Error al obtener el evento', error });
  }
};

// Actualizar evento
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, start, end, allDay } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Calendario SET title = ?, start = ?, end = ?, allDay = ? WHERE id = ?',
      [title, start, end, allDay, id]
    );
    if (result.affectedRows === 0) {
      console.log(`Evento no encontrado para actualizar id: ${id}`);
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    console.log(`Evento actualizado id ${id}: ${JSON.stringify(req.body)}`);
    res.status(200).json({ message: 'Evento actualizado correctamente', id });
  } catch (error) {
    console.error('Error al actualizar el evento:', error);
    res.status(500).json({ message: 'Error al actualizar el evento', error });
  }
};

// Eliminar evento
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Calendario WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      console.log(`Evento no encontrado para eliminar id: ${id}`);
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    console.log(`Evento eliminado id ${id}`);
    res.status(200).json({ message: 'Evento eliminado' });
  } catch (error) {
    console.error('Error al eliminar el evento:', error);
    res.status(500).json({ message: 'Error al eliminar el evento', error });
  }
};
