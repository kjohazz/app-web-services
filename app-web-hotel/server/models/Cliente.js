// server/models/Cliente.js
const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    driveLink: { type: String, required: true },
    uniqueCode: { type: String, required: true, unique: true },
    date: { type: String, required: true },
});

const Cliente = mongoose.model('Cliente', clienteSchema);
module.exports = Cliente;
