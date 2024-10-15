const mysql = require('mysql2');

// Crear conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',       // Cambia esto si tu DB está en otro host
    user: 'root',      // Tu usuario de MySQL
    password: '0001', // Tu contraseña de MySQL
    database: 'DB_HOSPITAL_CHILE' // Nombre de la base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL.');
});

module.exports = connection;