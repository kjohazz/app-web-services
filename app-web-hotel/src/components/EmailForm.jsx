import React, { useState, useEffect } from 'react';
import styles from './EmailForm.module.css';

function EmailForm({ onClientAdded, emailTemplate }) {
    const [email, setEmail] = useState('');
    const [driveLink, setDriveLink] = useState('');
    const [uniqueCode, setUniqueCode] = useState('');

    // Generar código único al cambiar el correo electrónico
    useEffect(() => {
        if (email) {
            const code = generateUniqueCode();
            setUniqueCode(code);
        } else {
            setUniqueCode('');
        }
    }, [email]);

    const generateUniqueCode = () => {
        const code = Math.random().toString(36).substring(2, 15);
        return code;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const code = generateUniqueCode(); // Generamos el código único aquí
        setUniqueCode(code);

        const clientData = {
            email,
            driveLink,
            uniqueCode: code,
            date: new Date().toLocaleDateString('es-CR'),
        };

        try {
            const response = await fetch('/server/Clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clientData),
            });

            if (response.ok) {
                const newClient = await response.json();
                onClientAdded(newClient); // Notificar al padre (AdminPanel) para actualizar la lista

                // Enviar plantilla de correo con el código único
                const emailToSend = emailTemplate.replace('[xxxxxxxx]', code);
                console.log("Correo a enviar:", emailToSend);
                // Aquí deberías implementar la lógica real para enviar el correo

                // Limpiar campos del formulario (solo si el envío fue exitoso)
                setEmail('');
                setDriveLink('');
                setUniqueCode('');
            } else {
                console.error('Error al crear el cliente en el backend:', response.statusText);
                // Manejo de errores (mostrar mensaje al usuario)
            }
        } catch (error) {
            console.error('Error de red al crear el cliente:', error);
            // Manejo de errores (mostrar mensaje al usuario)
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

export default EmailForm;
