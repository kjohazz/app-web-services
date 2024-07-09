import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Credenciales fijas
        const validEmail = 'admin@example.com';
        const validPassword = 'password123';

        if (email === validEmail && password === validPassword) {
            // Redireccionar al panel de administración
            navigate('/admin');
        } else {
            // Manejo de error (puedes mostrar un mensaje de error al usuario)
            console.error('Credenciales incorrectas');
        }
    };


    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>Log In</h2>

                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>USUARIO</label>
                    <input
                        type="email"
                        id="email"
                        className={styles.input}
                        placeholder="correo@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>CONTRASEÑA</label>
                    <input
                        type="password"
                        id="password"
                        className={styles.input}
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className={styles.button}>
                    ACCEDER
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
