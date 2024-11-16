const pool = require('../config/db');

// Obtener todos los despachos y eventos de agenda_diaria
exports.getAllDispatches = async (req, res) => {
  try {
    const query = `
      SELECT a.id as agenda_id, a.fecha, a.hora, a.detalles, 
             d.id as despacho_id, d.cantidad, d.nombreChofer, d.rutChofer, d.patenteCamion, d.patenteRampla, d.numeroSellos
      FROM agenda_diaria a
      LEFT JOIN despacho_nacional d ON a.id = d.agenda_diaria_id
    `;
    const [results] = await pool.query(query);
    res.json(results);
  } catch (err) {
    console.error('Error al obtener los despachos:', err);
    return res.status(500).send(err);
  }
};

// Obtener un despacho por ID
exports.getDispatchById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await pool.query('SELECT * FROM despacho_nacional WHERE id = ?', [id]);
        res.json(results[0]);
    } catch (err) {
        return res.status(500).send(err);
    }
};


// Crear un nuevo despacho
exports.createDispatch = async (req, res) => {
    const { cantidad, nombreChofer, rutChofer, patenteCamion, patenteRampla, numeroSellos, agenda_diaria_id } = req.body;
    
    // Verificar los datos recibidos
    console.log('Datos recibidos:', req.body);

    // Verificar que los datos necesarios no sean null o undefined
    if (!cantidad || !nombreChofer || !rutChofer || !patenteCamion || !patenteRampla || !numeroSellos || !agenda_diaria_id) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try {
        const [results] = await pool.query(
            'INSERT INTO despacho_nacional (cantidad, nombreChofer, rutChofer, patenteCamion, patenteRampla, numeroSellos, agenda_diaria_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [cantidad, nombreChofer, rutChofer, patenteCamion, patenteRampla, numeroSellos, agenda_diaria_id]
        );
        
        res.status(201).json({ id: results.insertId, cantidad, nombreChofer, rutChofer, patenteCamion, patenteRampla, numeroSellos, agenda_diaria_id });
    } catch (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).send(err);
    }
};

// Actualizar un despacho existente
exports.updateDispatch = async (req, res) => {
    const { id } = req.params;
    const { cantidad, nombreChofer, rutChofer, patenteCamion, patenteRampla, numeroSellos, agenda_diaria_id } = req.body;
    try {
        await pool.query('UPDATE despacho_nacional SET cantidad = ?, nombreChofer = ?, rutChofer = ?, patenteCamion = ?, patenteRampla = ?, numeroSellos = ?, agenda_diaria_id = ? WHERE id = ?', [cantidad, nombreChofer, rutChofer, patenteCamion, patenteRampla, numeroSellos, agenda_diaria_id, id]);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Eliminar un despacho
exports.deleteDispatch = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM despacho_nacional WHERE id = ?', [id]);
        res.status(204).send();
    } catch (err) {
        return res.status(500).send(err);
    }
};
