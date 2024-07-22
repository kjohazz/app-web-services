const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mongoose = require('mongoose');
const Client = require('./Client');
const EmailTemplate = require('./EmailTemplate');
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
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
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

// Endpoint para obtener todos los clientes
app.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        console.error('Error al obtener clientes de MongoDB:', error);
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
});


// Nuevo endpoint para agregar un cliente
app.post('/add-client', async (req, res) => {
    const { uniqueCode } = req.body;

    try {
        const existingClient = await Client.findOne({ uniqueCode });
        if (existingClient) {
            return res.status(400).json({ error: 'Ya existe un cliente con este código único' });
        }

        const newClient = new Client(req.body);
        const savedClient = await newClient.save();
        res.status(201).json(savedClient);
    } catch (error) {
        console.error('Error al guardar el cliente:', error);
        res.status(500).json({ error: 'Error al guardar el cliente' });
    }
});

// Endpoint para eliminar un cliente 
app.delete('/clients/:id', async (req, res) => { // Cambiar uniqueCode por id
    const clientId = req.params.id; // Obtener el _id del cliente a eliminar
    try {
        const deletedClient = await Client.findByIdAndDelete(clientId);
        if (!deletedClient) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
});

//Endpoint para editar cliente
app.put('/clients/:id', async (req, res) => {
    try {
        const clientId = req.params.id;
        const updatedClient = await Client.findByIdAndUpdate(clientId, req.body, { new: true });
        if (!updatedClient) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(updatedClient); // Envía el cliente actualizado
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
});

// Endpoint para el EmailTemplate

app.get('/email-template', async (req, res) => {
    try {
        let template = await EmailTemplate.findOne();
        if (!template) {
            // Si no existe, crea una plantilla predeterminada
            const defaultTemplateContent = "Estimado/a cliente,\n\nGracias por elegir nuestros servicios fotográficos durante su aventura en el Hotel Guachipelín. ¡Esperamos que haya disfrutado de su estadía!\n\nNos complace compartirle el enlace para acceder a sus fotografías: landingPage.com\nPara acceder a la descarga, por favor ingrese el siguiente código único en el campo correspondiente: [xxxxxxxx]\n\nAgradecemos su preferencia y esperamos tener el placer de recibirle nuevamente en el futuro.\n\nAtentamente,\nEl equipo del Hotel Guachipelín";
            template = new EmailTemplate({ content: defaultTemplateContent });
            await template.save();
        }
        res.json(template);
    } catch (error) {
        console.error('Error al obtener la plantilla de correo:', error);
        res.status(500).json({ error: 'Error al obtener la plantilla de correo' });
    }
});

// Endpoint para actualizar la plantilla de correo electrónico
app.put('/email-template', async (req, res) => {
    try {
        const updatedTemplate = await EmailTemplate.findOneAndUpdate({}, req.body, { new: true, upsert: true }); // upsert: true crea si no existe
        res.json(updatedTemplate);
    } catch (error) {
        console.error('Error al actualizar la plantilla de correo:', error);
        res.status(500).json({ error: 'Error al actualizar la plantilla de correo' });
    }
});