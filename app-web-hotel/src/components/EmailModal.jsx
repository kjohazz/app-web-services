import React, { useState, useEffect } from 'react';
import styles from './EmailModal.module.css';

function EmailModal({ isOpen, onClose, onSaveTemplate, emailTemplate }) {
    const [localTemplate, setLocalTemplate] = useState(emailTemplate); // Estado local para editar

    useEffect(() => {
        setLocalTemplate(emailTemplate); // Sincronizar con la plantilla del padre al abrir
    }, [isOpen, emailTemplate]); // Dependencias para actualizar al abrir o cambiar la plantilla

    const handleSave = () => {
        onSaveTemplate(localTemplate); // Guardar la plantilla editada en el backend
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
                        value={localTemplate} // Usar el estado local para editar
                        onChange={(e) => setLocalTemplate(e.target.value)}
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
