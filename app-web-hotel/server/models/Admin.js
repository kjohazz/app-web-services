// server/models/Admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    usuario: { type: String, required: true, unique: true },
    contrasena: { type: String, required: true },
});

// Middleware pre-save para hashear la contraseña
adminSchema.pre('save', async function (next) {
    if (!this.isModified('contrasena')) return next(); // Si la contraseña no ha cambiado, no hacer nada

    try {
        const salt = await bcrypt.genSalt(10); // Generar un salt
        this.contrasena = await bcrypt.hash(this.contrasena, salt); // Hashear la contraseña
        next();
    } catch (error) {
        return next(error); // Pasar el error al siguiente middleware
    }
});

// Método para comparar contraseñas (para autenticación)
adminSchema.methods.compararContrasena = async function (contrasenaIngresada) {
    try {
        return await bcrypt.compare(contrasenaIngresada, this.contrasena);
    } catch (error) {
        throw new Error('Error al comparar contraseñas');
    }
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
