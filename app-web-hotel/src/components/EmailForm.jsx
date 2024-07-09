import React, { useState, useEffect } from 'react';
import styles from './EmailForm.module.css';

function EmailForm({ onClientAdded, emailTemplate }) {
    const [email, setEmail] = useState('');
    const [driveLink, setDriveLink] = useState('');
    const [uniqueCode, setUniqueCode] = useState('');

    const generateUniqueCode = () => {
        const code = Math.random().toString(36).substring(2, 15);
        return code;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const code = generateUniqueCode();
        setUniqueCode(code);

        const clientData = {
            email,
            driveLink,
            uniqueCode: code,
        };

        // Enviar datos del cliente a la base de datos (localStorage)
        onClientAdded(clientData);

        // Enviar plantilla de correo con el código único a la consola
        const emailToSend = emailTemplate.replace('[xxxxxxxx]', code);
        console.log("Correo a enviar:", emailToSend);

        setEmail('');
        setDriveLink('');
        setUniqueCode('');
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h3 className={styles.title}>Nuevo código</h3>

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
                    <input
                        type="text"
                        id="uniqueCode"
                        className={styles.input}
                        value={uniqueCode}
                        readOnly
                    />
                </div>

                <button type="submit" className={styles.button}>
                    Guardar y enviar correo
                </button>
            </form>
        </div>
    );
}

export default EmailForm;
