const connection = require('../config/db');

// Controlador para iniciar sesión
// Controlador para iniciar sesión
exports.login = (req, res) => {
    const { email, password } = req.body;

    // Verificar si el usuario es un médico
    connection.query('SELECT * FROM Medicos WHERE email = ? AND passwrod = ?', [email, password], (err, results) => {
        if (err) return res.status(500).send(err);

        // Si se encuentra un médico
        if (results.length > 0) {
            return res.redirect('/medicos'); // Redirigir a la página de médicos
        }

        // Verificar si el usuario es un paciente
        connection.query('SELECT * FROM Pacientes WHERE email = ? AND passwrod = ?', [email, password], (err, results) => {
            if (err) return res.status(500).send(err);

            // Si se encuentra un paciente
            if (results.length > 0) {
                req.session.pacienteId = results[0].id; // Cambiado a `pacienteId`
                console.log('ID del paciente almacenado en la sesión:', req.session.pacienteId); // Log para depuración
                return res.redirect('/pacientes'); // Redirigir a la página de pacientes
            }

            // Si no se encuentra el usuario en ninguna tabla
            res.status(401).send('Credenciales inválidas'); // O redirigir a una página de error
        });
    });
};
