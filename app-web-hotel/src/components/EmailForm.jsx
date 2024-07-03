import React, { useState, useEffect } from 'react';
import styles from './EmailForm.module.css';

function EmailForm({ onClientAdded }) { // Agrega la prop onClientAdded
    const [email, setEmail] = useState('');
    const [driveLink, setDriveLink] = useState('');
    const [uniqueCode, setUniqueCode] = useState('');
    const [emailTemplate, setEmailTemplate] = useState('');

    useEffect(() => {
        // Cargar la plantilla de correo desde el modal (o desde localStorage) al montar el componente
        const storedTemplate = localStorage.getItem('emailTemplate');
        setEmailTemplate(storedTemplate || ''); // Usar la plantilla almacenada o una predeterminada
    }, []);

    const generateUniqueCode = () => {
        // Lógica para generar un código único (puedes usar una biblioteca como uuid)
        const code = Math.random().toString(36).substring(2, 15);
        return code;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const code = generateUniqueCode();
        setUniqueCode(code);

        // Datos del cliente
        const clientData = {
            email,
            driveLink,
            uniqueCode: code,
        };

        // Enviar correo electrónico (utilizando una biblioteca como EmailJS o un servicio externo)
        try {
            // ... lógica para enviar el correo con la plantilla y los datos del cliente ...
            console.log('Correo enviado:', clientData);

            // Notificar al componente padre (AdminPanel) para agregar el cliente a la lista
            onClientAdded(clientData);

            // Limpiar campos del formulario
            setEmail('');
            setDriveLink('');
            setUniqueCode('');
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            // Manejo de errores (mostrar mensaje al usuario)
        }
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
