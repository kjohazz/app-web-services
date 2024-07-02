import React from 'react';
import './Modal.css'; // Crea este archivo para los estilos del modal

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null; // No renderizar si no está abierto

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    &times; {/* Símbolo de cerrar */}
                </button>
                {children} {/* Contenido del modal (EmailTemplate en este caso) */}
            </div>
        </div>
    );
}

export default Modal;
