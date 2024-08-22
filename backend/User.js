const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Puedes agregar otros campos aquí si necesitas más información del usuario (nombre, rol, etc.)
});

// Middleware para hashear la contraseña antes de guardar el usuario
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Si la contraseña no ha cambiado, no la vuelvas a hashear

    try {
        const salt = await bcrypt.genSalt(10); // Genera un salt (10 es un buen valor por defecto)
        this.password = await bcrypt.hash(this.password, salt); // Hashea la contraseña con el salt
        next();
    } catch (error) {
        return next(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
