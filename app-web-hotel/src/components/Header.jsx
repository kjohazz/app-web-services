import React, { useState } from 'react';
import styles from './Header.module.css';
import EmailModal from './EmailModal';
import { useNavigate } from 'react-router-dom';

function Header({ showModal, setShowModal, onSaveTemplate }) {
    const navigate = useNavigate();

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('isLoggedIn'); // Limpiar el estado de sesión
        navigate('/');
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                {/* Aquí puedes agregar el logo de tu empresa */}
                <img src="/hotel-hacienda-guachipelin-logo.png" alt="Logo" />
            </div>

            <div className={styles.buttons}>
                <button onClick={handleOpenModal} className={styles.button}>
                    Editar plantilla de correo
                </button>
                <button onClick={handleLogout} className={styles.button}>
                    Cerrar sesión
                </button>
            </div>

            <EmailModal
                isOpen={showModal}
                onClose={handleCloseModal}
                onSaveTemplate={onSaveTemplate}
            />
        </header>
    );
}

export default Header;
