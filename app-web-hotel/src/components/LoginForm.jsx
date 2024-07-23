import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false); // Nuevo estado
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const endpoint = isRegistering ? '/auth/register' : '/auth/login'; // Cambia el endpoint según el modo
            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                if (isRegistering) {
                    setError(''); // Limpia el mensaje de error después de registrarse
                    setIsRegistering(false); // Vuelve al modo de inicio de sesión
                } else {

                    sessionStorage.setItem('isLoggedIn', 'true'); // Guarda el estado de sesión
                    navigate('/admin'); // Redireccionar al panel de admin
                }
            } else {
                const errorData = await response.json();
                setError(errorData.error);
            }
        } catch (error) {
            console.error('Error de red:', error);
            setError('Error de red al intentar iniciar sesión/registrarse');
        }
    };

    const toggleMode = () => {
        setIsRegistering(!isRegistering);
        setError(''); // Limpia el mensaje de error al cambiar de modo
    };


    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>INICIO DE SESIÓN</h2>

                {error && <p className={styles.error}>{error}</p>} {/* Mostrar mensaje de error */}

                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Usuario</label>
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
                    <label htmlFor="password" className={styles.label}>Contraseña</label>
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
                    {isRegistering ? 'Registrarse' : 'Acceder'}
                </button>

                <button type="button" onClick={toggleMode} className={styles.toggleButton}>
                    {isRegistering ? 'Volver al inicio de sesión' : 'Crear una cuenta'}
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
