const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000', // Permitir solo solicitudes desde este origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));// Habilita CORS para permitir solicitudes desde el frontend
app.use(express.json()); // Middleware para analizar datos JSON en el cuerpo de las solicitudes

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
    .catch(err => console.error('Error de conexión a MongoDB Atlas:', err));

// Definición del modelo Cliente
const clienteSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    driveLink: { type: String, required: true },
    uniqueCode: { type: String, required: true, unique: true },
    date: { type: String, required: true },
});

const Cliente = mongoose.model('Cliente', clienteSchema);

// Rutas API

// Obtener todos los clientes
app.get('/api/clientes', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
});

// Crear un nuevo cliente
app.post('/api/clientes', async (req, res) => {
    try {
        const nuevoCliente = await Cliente.create(req.body);
        res.status(201).json(nuevoCliente);
    } catch (error) {
        if (error.code === 11000) { // Error de duplicidad
            return res.status(400).json({ error: 'El correo electrónico o el código único ya existen' });
        }
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
});

// Actualizar un cliente existente
app.put('/api/clientes/:id', async (req, res) => {
    try {
        const clienteActualizado = await Cliente.findOneAndUpdate(
            { uniqueCode: req.params.id },
            req.body,
            { new: true }
        );
        if (!clienteActualizado) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(clienteActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
});

// Eliminar un cliente
app.delete('/api/clientes/:id', async (req, res) => {
    try {
        const clienteEliminado = await Cliente.findOneAndDelete({ uniqueCode: req.params.id });
        if (!clienteEliminado) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal!' });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
