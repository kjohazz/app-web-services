import React, { useState, useEffect } from 'react';
import './ListContainer.css';

function ListContainer({ envios, setEnvios }) {
    const [enviosActualizados, setEnviosActualizados] = useState(envios);
    const [showMenuIndex, setShowMenuIndex] = useState(null);
    const [editingEnvio, setEditingEnvio] = useState(null);

    useEffect(() => {
        // Cargar envíos desde localStorage al montar el componente
        const storedEnvios = JSON.parse(localStorage.getItem('envios')) || [];
        setEnviosActualizados(storedEnvios);
        setEnvios(storedEnvios); // Actualizar el estado en AdminPanel
    }, []); // Solo se ejecuta una vez al cargar el componente

    const calcularTiempoRestante = (fechaEnvio) => {
        const fechaActual = new Date();
        const diferenciaMs = fechaEnvio - fechaActual + 20 * 24 * 60 * 60 * 1000;
        return Math.max(0, Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24)));
    };

    useEffect(() => {
        // Guardar envíos en localStorage cada vez que se actualizan
        localStorage.setItem('envios', JSON.stringify(envios));
    }, [envios]); // Dependencia para volver a ejecutar al cambiar `envios`

    const handleDelete = (index) => {
        const nuevosEnvios = [...envios];
        nuevosEnvios.splice(index, 1);
        setEnvios(nuevosEnvios);
        localStorage.setItem('envios', JSON.stringify(nuevosEnvios));
        setShowMenuIndex(null);
    };

    const handleEdit = (index) => {
        setEditingEnvio(envios[index]);
        setShowMenuIndex(null);
    };

    const handleResend = (envio) => {
        console.log('Reenviando correo a:', envio.correoElectronico);
        // Aquí debes implementar la lógica para reenviar el correo
        setShowMenuIndex(null);
    };

    const handleSaveEdit = () => {
        const updatedEnvios = envios.map(envio =>
            envio.codigoUnico === editingEnvio.codigoUnico ? editingEnvio : envio
        );
        setEnvios(updatedEnvios);
        localStorage.setItem('envios', JSON.stringify(updatedEnvios));
        setEditingEnvio(null);
    };

    const handleEditChange = (e) => {
        setEditingEnvio({ ...editingEnvio, [e.target.name]: e.target.value });
    };

    const handleMenuClick = (index) => {
        if (showMenuIndex === index) {
            setShowMenuIndex(null); // Cerrar el menú si ya estaba abierto
        } else {
            setShowMenuIndex(index); // Abrir el menú
        }
    };

    return (
        <div className="list-container">
            <h3>Registros de Envíos</h3>
            {enviosActualizados.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Correo Electrónico</th>
                            <th>Enlace de Drive</th>
                            <th>Estado</th>
                            <th>Tiempo Restante (días)</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enviosActualizados.map((envio, index) => (
                            <React.Fragment key={envio.codigoUnico}>
                                <tr>
                                    <td>{envio.codigoUnico}</td>
                                    <td>{envio.correoElectronico}</td>
                                    <td>{envio.enlaceDrive}</td>
                                    <td>{envio.estado}</td>
                                    <td>{calcularTiempoRestante(new Date(envio.fechaEnvio))}</td>
                                    <td>
                                        <button onClick={() => handleMenuClick(index)}>...</button> {/* Cambiamos el onClick */}
                                        {showMenuIndex === index && (
                                            <ul className="options-menu">
                                                <li onClick={() => handleDelete(index)}>Eliminar</li>
                                                <li onClick={() => handleEdit(index)}>Editar</li>
                                                <li onClick={() => handleResend(envio)}>Reenviar Correo</li>
                                            </ul>
                                        )}
                                    </td>
                                </tr>
                                {editingEnvio && editingEnvio.codigoUnico === envio.codigoUnico && (
                                    <tr>
                                        <td colSpan="6">
                                            <form>
                                                <input type="email" name="correoElectronico" value={editingEnvio.correoElectronico} onChange={handleEditChange} />
                                                <input type="text" name="enlaceDrive" value={editingEnvio.enlaceDrive} onChange={handleEditChange} />
                                                <button type="button" onClick={handleSaveEdit}>Guardar</button>
                                            </form>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
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
