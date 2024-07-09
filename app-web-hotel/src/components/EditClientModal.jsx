import React, { useState, useEffect } from 'react';
import styles from './EditClientModal.module.css';

function EditClientModal({ client, onUpdateClient, onClose }) {
    const [email, setEmail] = useState(client.email);
    const [driveLink, setDriveLink] = useState(client.driveLink);

    useEffect(() => {
        // Actualizar los campos del formulario cuando cambia el cliente a editar
        setEmail(client.email);
        setDriveLink(client.driveLink);
    }, [client]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedClient = {
            ...client,
            email,
            driveLink,
        };
        onUpdateClient(updatedClient);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h3 className={styles.title}>Editar Cliente</h3>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Correo electrónico:
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
                            Enlace de Drive:
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

                    <div className={styles.buttons}>
                        <button type="submit" className={styles.saveButton}>
                            Guardar
                        </button>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditClientModal;
