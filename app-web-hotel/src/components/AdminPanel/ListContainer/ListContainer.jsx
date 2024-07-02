import React from 'react';
import './ListContainer.css';

function ListContainer({ envios }) {

    const calcularTiempoRestante = (fechaEnvio) => {
        const fechaActual = new Date();
        const diferenciaMs = fechaEnvio - fechaActual + 20 * 24 * 60 * 60 * 1000;

        if (diferenciaMs <= 0) {
            return 'Expirado';
        }

        const dias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
        return dias;
    };

    return (
        <div className="list-container">
            <h3>Registros de Envíos</h3>
            {envios.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Correo Electrónico</th>
                            <th>Enlace de Drive</th>
                            <th>Estado</th>
                            <th>Días hábiles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {envios.map(envio => (
                            <tr key={envio.codigoUnico}>
                                <td>{envio.codigoUnico}</td>
                                <td>{envio.correoElectronico}</td>
                                <td>{envio.enlaceDrive}</td>
                                <td>{envio.estado}</td>
                                <td>{calcularTiempoRestante(new Date(envio.fechaEnvio))}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay envíos registrados.</p>
            )}
        </div>
    );
}

export default ListContainer;
