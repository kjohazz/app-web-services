const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Cliente = require('../models/Cliente');
const Joi = require('joi');

// Esquema de validación para el cliente (puedes ajustar esto según tus necesidades)
const clienteSchema = Joi.object({
    email: Joi.string().email().required(),
    driveLink: Joi.string().uri().required(),
    uniqueCode: Joi.string().required(),
    date: Joi.string().required(),
});

// Configuración del transporte SMTP
const transporter = nodemailer.createTransport({
    host: 'mail.guachipelin.com',
    port: 587,
    secure: false,
    auth: {
        user: 'yourpics@guachipelin.com',
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Ruta para enviar el correo y guardar el cliente
router.post('/', async (req, res) => {
    try {
        const { email, uniqueCode, driveLink, emailTemplate } = req.body;

        // Validar los datos del cliente
        const { error } = clienteSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const emailToSend = emailTemplate.replace('[enlace.com]', driveLink).replace('[xxxxxxxx]', uniqueCode);

        const mailOptions = {
            from: 'yourpics@guachipelin.com',
            to: email,
            subject: 'Tus fotos del Hotel Hacienda Guachipelín',
            html: emailToSend,
        };

        await transporter.sendMail(mailOptions);

        // Guardar el cliente en la base de datos
        const nuevoCliente = new Cliente({ email, driveLink, uniqueCode, date: new Date().toLocaleDateString() });
        await nuevoCliente.save();

        res.json({ message: 'Correo enviado y cliente guardado correctamente' });
    } catch (error) {
        console.error('Error al enviar el correo o guardar el cliente:', error);
        res.status(500).json({ error: 'Error al enviar el correo o guardar el cliente' });
    }
});

module.exports = router;
