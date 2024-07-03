import React, { useState, useEffect } from 'react';
import styles from './EmailModal.module.css';

function EmailModal({ isOpen, onClose, onSaveTemplate }) {
    const [emailTemplate, setEmailTemplate] = useState(
        "Estimado/a cliente,\n\n" +
        "Gracias por elegir nuestros servicios fotográficos durante su aventura en el Hotel Guachipelín. ¡Esperamos que haya disfrutado de su estadía!\n\n" +
        "Nos complace compartirle el enlace para acceder a sus fotografías: landingPage.com\n" +
        "Para acceder a la descarga, por favor ingrese el siguiente código único en el campo correspondiente: [xxxxxxxx]\n\n" +
        "Agradecemos su preferencia y esperamos tener el placer de recibirle nuevamente en el futuro.\n\n" +
        "Atentamente,\n" +
        "El equipo del Hotel Guachipelín"
    );

    useEffect(() => {
        // Cargar la plantilla desde localStorage al abrir el modal
        const storedTemplate = localStorage.getItem('emailTemplate');
        if (storedTemplate) {
            setEmailTemplate(storedTemplate);
        }
    }, [isOpen]); // Dependencia isOpen para cargar al abrir

    const handleSave = () => {
        localStorage.setItem('emailTemplate', emailTemplate);
        onSaveTemplate(emailTemplate); // Llamar a la función para actualizar en AdminPanel
        onClose();
    };

    return (
        isOpen && (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <button onClick={onClose} className={styles.closeButton}>
                        X
                    </button>
                    <h3 className={styles.title}>Editar Plantilla de Correo</h3>
                    <textarea
                        className={styles.textarea}
                        value={emailTemplate}
                        onChange={(e) => setEmailTemplate(e.target.value)}
                    />
                    <button onClick={handleSave} className={styles.saveButton}>
                        Guardar
                    </button>
                </div>
            </div>
        )
    );
}

export default EmailModal;
