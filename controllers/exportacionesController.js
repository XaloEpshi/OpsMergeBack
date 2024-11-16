const pool = require('../config/db');

// Crear una nueva exportación
exports.createExportacion = async (req, res) => {
  const {
    mercado, material, descripcion, fechaCarga, observacion, pallet, cajas, poExportacion, conductor, rut, telefono,
    contenedor, selloNaviero, status, transporte, tipoContenedor, centroCarga, nave, pol, naviera, operador, turno,
    patenteRampla, patenteCamion, destino, selloEmpresa, delivery, poLocal, numeroInterno
  } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO exportaciones (mercado, material, descripcion, fechaCarga, observacion, pallet, cajas, poExportacion,
      conductor, rut, telefono, contenedor, selloNaviero, status, transporte, tipoContenedor, centroCarga, nave, pol,
      naviera, operador, turno, patenteRampla, patenteCamion, destino, selloEmpresa, delivery, poLocal, numeroInterno)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [mercado, material, descripcion, fechaCarga, observacion, pallet, cajas, poExportacion, conductor, rut, telefono,
       contenedor, selloNaviero, status, transporte, tipoContenedor, centroCarga, nave, pol, naviera, operador, turno,
       patenteRampla, patenteCamion, destino, selloEmpresa, delivery, poLocal, numeroInterno]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la exportación', error });
  }
};

// Obtener todas las exportaciones
exports.getExportaciones = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM exportaciones');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las exportaciones', error });
  }
};

// Obtener una exportación por ID
exports.getExportacionById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM exportaciones WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Exportación no encontrada' });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la exportación', error });
  }
};


// Actualizar una exportación
exports.updateExportacion = async (req, res) => {
  const { id } = req.params;
  const {
    mercado, material, descripcion, fechaCarga, observacion, pallet, cajas, poExportacion, conductor, rut, telefono,
    contenedor, selloNaviero, status, transporte, tipoContenedor, centroCarga, nave, pol, naviera, operador, turno,
    patenteRampla, patenteCamion, destino, selloEmpresa, delivery, poLocal, numeroInterno
  } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE exportaciones SET mercado = ?, material = ?, descripcion = ?, fechaCarga = ?, observacion = ?, pallet = ?,
      cajas = ?, poExportacion = ?, conductor = ?, rut = ?, telefono = ?, contenedor = ?, selloNaviero = ?, status = ?,
      transporte = ?, tipoContenedor = ?, centroCarga = ?, nave = ?, pol = ?, naviera = ?, operador = ?, turno = ?,
      patenteRampla = ?, patenteCamion = ?, destino = ?, selloEmpresa = ?, delivery = ?, poLocal = ?, numeroInterno = ?
      WHERE id = ?`,
      [mercado, material, descripcion, fechaCarga, observacion, pallet, cajas, poExportacion, conductor, rut, telefono,
       contenedor, selloNaviero, status, transporte, tipoContenedor, centroCarga, nave, pol, naviera, operador, turno,
       patenteRampla, patenteCamion, destino, selloEmpresa, delivery, poLocal, numeroInterno, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Exportación no encontrada' });
    }

    res.status(200).json({ message: 'Exportación actualizada correctamente', id });
  } catch (error) {
    console.error('Error al actualizar la exportación:', error);
    res.status(500).json({ message: 'Error al actualizar la exportación', error });
  }
};


// Eliminar una exportación
exports.deleteExportacion = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM exportaciones WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Exportación no encontrada' });
    res.status(200).json({ message: 'Exportación eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la exportación', error });
  }
};


// Controlador para actualizar el estado de una exportación
exports.updateExportacionStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE exportaciones SET status = ? WHERE id = ?`,
      [status, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Exportación no encontrada' });

    res.status(200).json({ message: 'Estado de la exportación actualizado correctamente', id });
  } catch (error) {
    console.error('Error al actualizar el estado de la exportación:', error);
    res.status(500).json({ message: 'Error al actualizar el estado de la exportación', error });
  }
};

