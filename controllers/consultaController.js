const connection = require('../config/db');

// Controlador para obtener todas las consultas
exports.getConsultas = (req, res) => {
    connection.query('SELECT c.id_consulta, p.nombre AS nombre_paciente, p.apellido AS apellido_paciente, m.nombre AS nombre_medico, m.apellido AS apellido_medico, c.fecha, c.especialidad FROM Consultas c JOIN Pacientes p ON c.id_paciente = p.id JOIN Medicos m ON c.id_medico = m.id', (err, results) => {
        if (err) return res.status(500).send(err);
        res.render('consultas', { consultas: results }); // Renderiza la vista con las consultas
    });
};

// Controlador para mostrar el formulario de creación de una nueva consulta
exports.createConsultaForm = (req, res) => {
    res.render('createConsulta'); // Renderiza la vista de creación
};

// Controlador para almacenar una nueva consulta
exports.createConsulta = (req, res) => {
    const { id_paciente, id_medico, fecha, especialidad } = req.body;
    connection.query('INSERT INTO Consultas (id_paciente, id_medico, fecha, especialidad) VALUES (?, ?, ?, ?)', 
        [id_paciente, id_medico, fecha, especialidad], 
        (err) => {
            if (err) return res.status(500).send(err);
            res.redirect('/medicos/consultas'); // Redirigir a la lista de consultas después de crear
        }
    );
};

// Controlador para mostrar el formulario de edición de una consulta
exports.editConsultaForm = (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM Consultas WHERE id_consulta = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Consulta no encontrada');
        res.render('editConsulta', { consulta: results[0] }); // Renderiza la vista de edición
    });
};

// Controlador para actualizar una consulta
exports.updateConsulta = (req, res) => {
    const { id } = req.params;
    const { id_paciente, id_medico, fecha, especialidad } = req.body;

    connection.query('UPDATE Consultas SET id_paciente = ?, id_medico = ?, fecha = ?, especialidad = ? WHERE id_consulta = ?', 
        [id_paciente, id_medico, fecha, especialidad, id], 
        (err) => {
            if (err) return res.status(500).send(err);
            res.redirect('/medicos/consultas'); // Redirigir a la lista de consultas después de actualizar
        }
    );
};

// Controlador para eliminar una consulta
exports.deleteConsulta = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM Consultas WHERE id_consulta = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.redirect('/medicos/consultas'); // Redirigir a la lista de consultas después de eliminar
    });
};