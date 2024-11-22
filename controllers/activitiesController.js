const pool = require('../config/db');

// Obtener todos los registros de actividades, excluyendo "Agenda Diaria" y "Calendario"
exports.getAllActivities = async (req, res) => {
    try {
        const [despachoNacional] = await pool.query('SELECT "Despacho Nacional" AS origen, NOW() AS fecha_hora, CONCAT(cantidad, " unidades despachadas") AS actividad, CONCAT("Chofer: ", nombreChofer, ", Patente Camión: ", patenteCamion) AS descripcion, responsable AS user_id FROM despacho_nacional');
        const [tareas] = await pool.query('SELECT "Tareas" AS origen, fecha_inicio AS fecha_hora, nombre_tarea AS actividad, descripcion AS descripcion, responsable AS user_id FROM tareas');
        const [inventarioBodegas] = await pool.query('SELECT "Inventario Bodegas" AS origen, fecha_inventario AS fecha_hora, nombre_bodega AS actividad, detalle_inventario AS descripcion, "" AS user_id FROM InventarioBodegas');
        const [exportaciones] = await pool.query('SELECT "Exportaciones" AS origen, fechaCarga AS fecha_hora, CONCAT(material, " exportado a ", mercado) AS actividad, observacion AS descripcion, "" AS user_id FROM exportaciones');

        const activities = [
            ...despachoNacional,
            ...tareas,
            ...inventarioBodegas,
            ...exportaciones
        ];

        res.json(activities);
    } catch (err) {
        return res.status(500).send(err);
    }
};
