const connection = require('../config/db');

// Controlador para obtener los datos del paciente logueado
exports.getPaciente = (req, res) => {
    const { pacienteId } = req.session; // Accede a pacienteId desde la sesión

    if (!pacienteId) {
        // Redirige al inicio de sesión si no hay pacienteId en la sesión
        return res.status(401).redirect('/auth/login');
    }

    // Realiza la consulta para obtener los datos del paciente
    connection.query('SELECT * FROM Pacientes WHERE id = ?', [pacienteId], (err, results) => {
        if (err) {
            console.error('Error en la consulta SQL:', err);
            return res.status(500).send('Error en el servidor');
        }

        if (results.length === 0) {
            return res.status(404).send('Paciente no encontrado');
        }

        // Renderiza la vista con los datos del paciente
        res.render('pacientes', { paciente: results[0] });
    });
};

// Controlador para mostrar el formulario de edición de datos del paciente
exports.editPaciente = (req, res) => {
    const { pacienteId } = req.session; // Accede a pacienteId desde la sesión

    if (!pacienteId) {
        // Redirige al inicio de sesión si no hay pacienteId en la sesión
        return res.status(401).redirect('/auth/login');
    }

    // Realiza la consulta para obtener los datos del paciente
    connection.query('SELECT * FROM Pacientes WHERE id = ?', [pacienteId], (err, results) => {
        if (err) {
            console.error('Error en la consulta SQL:', err);
            return res.status(500).send('Error en el servidor');
        }

        if (results.length === 0) {
            return res.status(404).send('Paciente no encontrado');
        }

        // Renderiza la vista de edición con los datos del paciente
        res.render('editMisDatos', { paciente: results[0] });
    });
};

// Controlador para actualizar los datos del paciente
exports.updatePaciente = (req, res) => {
    const { pacienteId } = req.session; // Accede a pacienteId desde la sesión
    const { nombre, apellido, direccion, telefono, email, historia_clinica } = req.body;

    if (!pacienteId) {
        // Redirige al inicio de sesión si no hay pacienteId en la sesión
        return res.status(401).redirect('/auth/login');
    }

    // Realiza la consulta de actualización de los datos del paciente
    connection.query(
        'UPDATE Pacientes SET nombre = ?, apellido = ?, direccion = ?, telefono = ?, email = ?, historia_clinica = ? WHERE id = ?',
        [nombre, apellido, direccion, telefono, email, historia_clinica, pacienteId],
        (err) => {
            if (err) {
                console.error('Error en la actualización SQL:', err);
                return res.status(500).send('Error en el servidor');
            }

            // Redirige a la página de perfil del paciente después de la actualización
            res.redirect('/pacientes');
        }
    );
};
