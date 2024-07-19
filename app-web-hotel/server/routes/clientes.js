const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const Joi = require('joi');

// Esquema de validación para crear o actualizar un cliente
const clienteSchema = Joi.object({
    email: Joi.string().email().required(),
    driveLink: Joi.string().uri().required(),
    uniqueCode: Joi.string().required(),
    date: Joi.string().required(),
});

// Obtener todos los clientes
router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
});

// Crear un nuevo cliente
router.post('/', async (req, res) => {
    try {
        // Validar los datos del cliente
        const { error } = clienteSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const nuevoCliente = await Cliente.create(req.body);
        res.status(201).json(nuevoCliente);
    } catch (error) {
        if (error.code === 11000) { // Error de duplicidad
            return res.status(400).json({ error: 'El correo electrónico o el código único ya existen' });
        }
        console.error('Error al crear el cliente:', error);
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
});

// Actualizar un cliente existente
router.put('/:id', async (req, res) => {
    try {
        // Validar los datos del cliente
        const { error } = clienteSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

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
        console.error('Error al actualizar el cliente:', error);
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
});

// Eliminar un cliente
router.delete('/:id', async (req, res) => {
    try {
        const clienteEliminado = await Cliente.findOneAndDelete({ uniqueCode: req.params.id });
        if (!clienteEliminado) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
});

module.exports = router;
