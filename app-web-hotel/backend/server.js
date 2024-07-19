const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Importar el middleware CORS
const mongoose = require('mongoose');
const Client = require('./Client');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://HaciendaG258:qyXAHvvQCrYFzcrE@cluster01.3gpscyc.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

const app = express();
const port = process.env.PORT || 5000;

// Middleware para analizar el cuerpo de las solicitudes POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware CORS para permitir solicitudes desde cualquier origen y manejar solicitudes OPTIONS
app.use(cors({
    origin: 'http://localhost:3000',  // Reemplaza con la URL de tu aplicación React
    methods: ['GET', 'POST', 'OPTIONS'], // Agrega 'OPTIONS' a los métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // Dirección del servidor SMTP de tu empresa
    port: process.env.EMAIL_PORT, // Puerto SMTP (generalmente 587 para TLS)
    secure: false, // true para 465, false para otros puertos
    auth: {
        user: process.env.EMAIL_USER, // Tu correo electrónico de empresa
        pass: process.env.EMAIL_PASSWORD // Tu contraseña de correo electrónico
    },
    tls: {
        rejectUnauthorized: false // Si tu servidor tiene un certificado autofirmado
    }
});

// Endpoint para enviar correos electrónicos
app.post('/send-email', (req, res) => {
    const { to, subject, body } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        html: body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
            res.status(500).send('Error al enviar el correo');
        } else {
            console.log('Correo enviado:', info.response);
            res.send('Correo enviado correctamente');
        }
    });
});

// Manejar solicitudes OPTIONS para preflight
app.options('/send-email', cors()); // Habilita CORS para solicitudes OPTIONS a esta ruta

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

app.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find(); // Obtener todos los clientes de MongoDB
        res.json(clients); // Enviar los clientes como respuesta JSON
    } catch (error) {
        console.error('Error al obtener clientes de MongoDB:', error);
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
});


app.post('/clients', async (req, res) => {
    try {
        const newClient = new Client(req.body);
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        console.error('Error al guardar el cliente:', error);
        res.status(500).json({ error: 'Error al guardar el cliente' });
    }
});