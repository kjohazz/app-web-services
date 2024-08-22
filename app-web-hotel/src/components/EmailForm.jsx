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

        const clientData = {
            email,
            driveLink,
            uniqueCode,
            date: new Date().toLocaleDateString('es-CR'),
        };

        try {
            // 1. Enviar datos del cliente al backend para guardar en MongoDB
            const addClientResponse = await fetch('https://backend-hg.onrender.com/add-client', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clientData),
            });

            if (addClientResponse.ok) {
                console.log('Cliente guardado correctamente');
                const newClient = await addClientResponse.json();
                onClientAdded(newClient);

                // 2. Enviar correo electrónico después de guardar el cliente
                const sendEmailResponse = await fetch('https://backend-hg.onrender.com/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        to: email,
                        subject: 'Tus fotos de Hacienda Guachipelín',
                        body: emailTemplate.replace('[xxxxxxxx]', uniqueCode),
                    }),
                });

                console.log(emailTemplate)

                if (sendEmailResponse.ok) {
                    console.log('Correo enviado correctamente');
                    // Puedes mostrar un mensaje de éxito al usuario aquí
                } else {
                    console.error('Error al enviar el correo:', sendEmailResponse.statusText);
                    // Puedes mostrar un mensaje de error al usuario aquí
                }
            } else {
                console.error('Error al guardar el cliente:', addClientResponse.statusText);
                // Puedes mostrar un mensaje de error al usuario aquí
            }
        } catch (error) {
            console.error('Error de red:', error);
            // Puedes mostrar un mensaje de error al usuario aquí
        }

        setEmail('');
        setDriveLink('');
        setUniqueCode('');
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
