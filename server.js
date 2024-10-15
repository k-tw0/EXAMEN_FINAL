const express = require('express');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON y formularios URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración para usar EJS como motor de plantillas 
app.set('view engine', 'ejs');

// Configuración de la sesión
app.use(session({
    secret: 'mi_secreto', // Cambia esto a un secreto seguro en producción
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambia a true si usas HTTPS
}));

// Servir archivos estáticos
app.use(express.static('public')); // Asegúrate de que esta línea esté 

// Importar rutas 
const authRoutes = require('./routes/authRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const medicoRoutes = require('./routes/medicoRoutes');
const consultaRoutes = require('./routes/consultaRoutes'); // Nueva ruta


// Usar rutas 
app.use('/auth', authRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/medicos', medicoRoutes);
app.use('/medicos/consultas', consultaRoutes); // Usar ruta de consultas

// Redirigir la ruta raíz a la página de autenticación
app.get('/', (req, res) => {
    res.redirect('/auth'); // Redirige a /auth
});


// Iniciar el servidor 
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});