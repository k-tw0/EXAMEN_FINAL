const connection = require('../config/db');

// Controlador para obtener todos los médicos y pacientes
exports.getMedicos = (req, res) => {
    connection.query('SELECT * FROM Medicos', (errMedicos, resultsMedicos) => {
        if (errMedicos) return res.status(500).send(errMedicos);

        connection.query('SELECT * FROM Pacientes', (errPacientes, resultsPacientes) => {
            if (errPacientes) return res.status(500).send(errPacientes);
            res.render('medicos', { medicos: resultsMedicos, pacientes: resultsPacientes });
        });
    });
};

// Controlador para editar un paciente
exports.editPaciente = (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM Pacientes WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Paciente no encontrado');
        res.render('editPaciente', { paciente: results[0] });
    });
};

// Controlador para actualizar un paciente
exports.updatePaciente = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, direccion, telefono, email, historia_clinica } = req.body;

    connection.query('UPDATE Pacientes SET nombre = ?, apellido = ?, direccion = ?, telefono = ?, email = ?, historia_clinica = ? WHERE id = ?', 
        [nombre, apellido, direccion, telefono, email, historia_clinica, id], 
        (err) => {
            if (err) return res.status(500).send(err);
            res.redirect('/medicos'); // Redirigir a la lista de médicos después de la actualización
        }
    );
};

// Controlador para eliminar un paciente
exports.deletePaciente = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM Pacientes WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.redirect('/medicos');
    });
};

exports.getConsultas = (req, res) => {
    connection.query('SELECT c.id_consulta, p.nombre AS nombre_paciente, p.apellido AS apellido_paciente, m.nombre AS nombre_medico, m.apellido AS apellido_medico, c.fecha, c.especialidad FROM Consultas c JOIN Pacientes p ON c.id_paciente = p.id JOIN Medicos m ON c.id_medico = m.id', (err, results) => {
        if (err) return res.status(500).send(err);
        res.render('consultas', { consultas: results }); // Renderiza la vista con las consultas
    });
};