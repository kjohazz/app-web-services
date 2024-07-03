import React, { useState } from 'react';
import styles from './Header.module.css';

function Header() {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                {/* Aquí puedes agregar el logo de tu empresa */}
                <img src="/path/to/logo.png" alt="Logo" />
            </div>

            <div className={styles.buttons}>
                <button onClick={handleOpenModal} className={styles.button}>
                    Editar plantilla de correo
                </button>
                <button className={styles.button}>Cerrar sesión</button>
            </div>

            {/* Modal (por ahora solo un contenedor vacío) */}
            {showModal && (
                <div className={styles.modal}>
                    {/* Aquí irá el contenido del modal */}
                </div>
            )}
        </header>
    );
}

export default Header;
