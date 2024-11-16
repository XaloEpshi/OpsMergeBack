const pool = require('../config/db'); // Ajusta la ruta según tu estructura de proyecto

// Crear una nueva tarea
exports.createTarea = async (req, res) => {
  const { nombre_tarea, descripcion, responsable, estado_tarea, fecha_inicio, fecha_termino, comentarios } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO tareas (nombre_tarea, descripcion, responsable, estado_tarea, fecha_inicio, fecha_termino, comentarios) VALUES (?, ?, ?, ?, ?, ?, ?)', 
      [nombre_tarea, descripcion, responsable, estado_tarea, fecha_inicio, fecha_termino, comentarios]);
    res.status(201).json({ id: result.insertId, nombre_tarea, descripcion, responsable, estado_tarea, fecha_inicio, fecha_termino, comentarios });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la tarea', error });
  }
};

// Obtener todas las tareas
exports.getTareas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tareas');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas', error });
  }
};

// Obtener una tarea por ID
exports.getTareaById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM tareas WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la tarea', error });
  }
};

// Actualizar tarea
exports.updateTarea = async (req, res) => {
  const { id } = req.params;
  const { nombre_tarea, descripcion, responsable, estado_tarea, fecha_inicio, fecha_termino, comentarios } = req.body;

  console.log('Datos recibidos para actualizar:', { id, nombre_tarea, descripcion, responsable, estado_tarea, fecha_inicio, fecha_termino, comentarios });

  try {
    const [result] = await pool.query(
      'UPDATE tareas SET nombre_tarea = ?, descripcion = ?, responsable = ?, estado_tarea = ?, fecha_inicio = ?, fecha_termino = ?, comentarios = ? WHERE id = ?',
      [nombre_tarea, descripcion, responsable, estado_tarea, fecha_inicio, fecha_termino, comentarios, id]
    );

    console.log('Resultado de la consulta de actualización:', result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(200).json({
      message: 'Tarea actualizada correctamente',
      tarea: { id, nombre_tarea, descripcion, responsable, estado_tarea, fecha_inicio, fecha_termino, comentarios },
    });
  } catch (error) {
    console.error('Error en la actualización de la tarea:', error);
    res.status(500).json({ message: 'Error al actualizar la tarea', error });
  }
};

// Eliminar una tarea
exports.deleteTarea = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM tareas WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.status(200).json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea', error });
  }
};
