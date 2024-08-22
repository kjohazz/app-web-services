const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./User'); // Asegúrate de tener tu modelo de usuario definido

const router = express.Router(); // Crea un router de Express

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log("Usuario encontrado:", user); // Agrega este log

        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas: Usuario no encontrado' });
            // Mensaje de error más específico
        }

        const validPassword = await bcrypt.compare(password, user.password);
        console.log("Contraseña válida:", validPassword); // Agrega este log

        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciales inválidas: Contraseña incorrecta' }); // Mensaje de error más específico
        }

        res.json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});


module.exports = router; // Exporta el router
