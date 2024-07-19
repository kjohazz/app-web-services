import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/login', { // Asegúrate de que la ruta sea correcta
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario, contrasena }),
            });

            if (response.ok) {
                // Autenticación exitosa
                navigate('/admin');
            } else {
                const errorData = await response.json();
                alert(errorData.error);
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
        }
    };


    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>INICIO DE SESIÓN</h2>

                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Usuario</label>
                    <input
                        type="email"
                        id="email"
                        className={styles.input}
                        placeholder="correo@example.com"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        className={styles.input}
                        placeholder="********"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                </div>

                <button type="submit" className={styles.button}>
                    Acceder
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
