import React, { useState, useEffect } from 'react';
import styles from './EmailForm.module.css';


function EmailForm({ onClientAdded, emailTemplate }) {
    const [email, setEmail] = useState('');
    const [driveLink, setDriveLink] = useState('');
    const [uniqueCode, setUniqueCode] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (email) {
            setUniqueCode(generateUniqueCode());
        } else {
            setUniqueCode('');
        }
    }, [email]);

    const generateUniqueCode = () => {
        return Math.random().toString(36).substring(2, 15);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setIsLoading(true); // Mostrar indicador de carga

        // Validación básica del correo electrónico (puedes mejorar esta validación)
        if (!validateEmail(email)) {
            setError('Por favor, ingresa un correo electrónico válido.');
            setIsLoading(false);
            return;
        }

        const clientData = {
            email,
            driveLink,
            uniqueCode,
            date: new Date().toLocaleDateString('es-CR'),
            emailTemplate,
        };
        console.log(clientData)
        try {
            console.log('Llegamos aqui')
            const response = await fetch('/api/enviar-correo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clientData),
            }); console.log(response.body)

            if (response.ok) {
                const newClient = await response.json();
                onClientAdded(newClient);
                console.log("todo salio bien")

                // Limpiar campos del formulario
                setEmail('');
                setDriveLink('');
                setUniqueCode('');
                alert('Correo enviado correctamente');
            } else {
                try {
                    const errorData = await response.json();
                    setError(errorData.error || 'Error desconocido en el servidor');
                    console.log('Llegamos ya tenemos un error que no conozco')
                } catch (error) {
                    console.error('Error al analizar la respuesta de error:', error);
                    setError('Error desconocido en el servidor');
                }
            }
        } catch (error) {
            console.error('Error de red al crear el cliente:', error);
            setError('Error de red. Por favor, verifica tu conexión a internet.');
        } finally {
            setIsLoading(false); // Ocultar indicador de carga
        }
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(uniqueCode);
        alert('Código único copiado al portapapeles');
    };


    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h3 className={styles.title}>Ingresar Cliente</h3>

                {error && <div className={styles.error}>{error}</div>} {/* Mostrar mensaje de error */}

                {/* ... (campos de correo, enlace de Drive y código único) ... */}

                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="driveLink" className={styles.label}>
                        Enlace de Drive
                    </label>
                    <input
                        type="url"
                        id="driveLink"
                        className={styles.input}
                        value={driveLink}
                        onChange={(e) => setDriveLink(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="uniqueCode" className={styles.label}>
                        Código único
                    </label>
                    <div className={styles.inputWithButton}>
                        <input
                            type="text"
                            id="uniqueCode"
                            className={styles.input}
                            value={uniqueCode}
                            readOnly
                        />
                        <button type="button" onClick={handleCopyCode} className={styles.copyButton}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={styles.copyIcon}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <button type="submit" className={styles.button}>
                    Guardar y enviar correo
                </button>
            </form>
        </div>
    );
}

function validateEmail(email) {
    // Puedes usar una expresión regular más robusta para validar el correo
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default EmailForm;
