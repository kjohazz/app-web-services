import React from 'react';
import './FormContainer.css';

function FormContainer({ email, setEmail, driveLink, setDriveLink, handleSubmit }) {
    return (
        <div className="form-container">
            <h2>Panel de Administrador</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Correo Electrónico del Cliente:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="driveLink">Enlace de Drive:</label>
                    <input
                        type="text"
                        id="driveLink"
                        value={driveLink}
                        onChange={(e) => setDriveLink(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Generar y Enviar Código</button>
            </form>
        </div>
    );
}

export default FormContainer;
