import React, { useState, useEffect } from 'react';
import styles from './ClientList.module.css';

function ClientList({ clients, onEditClient, onDeleteClient, setClients }) {
    const [selectedClients, setSelectedClients] = useState([]);

    useEffect(() => {
        setSelectedClients([]);
    }, [clients]);

    const handleCheckboxChange = (clientId) => {
        setSelectedClients((prevSelected) => {
            if (prevSelected.includes(clientId)) {
                return prevSelected.filter((id) => id !== clientId);
            } else {
                return [...prevSelected, clientId];
            }
        });
    };

    const handleEditClick = (client) => {
        onEditClient(client);
    };

    const handleDownloadTxt = (event) => {
        event.preventDefault();

        // Filtrar los clientes seleccionados
        const selectedClientData = clients.filter(client => selectedClients.includes(client.uniqueCode));

        // Verificar si hay clientes seleccionados
        if (selectedClientData.length === 0) {
            alert('No hay clientes seleccionados para descargar.');
            return;
        }

        const txtContent = selectedClientData.map(client => `${client.email}, ${client.uniqueCode}, ${client.driveLink}`).join('\n');
        const element = document.createElement("a");
        const file = new Blob([txtContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "clientes_seleccionados.txt";
        document.body.appendChild(element);
        element.click();
    };

    const handleDeleteSelected = (event) => {
        event.preventDefault();
        if (window.confirm('¿Estás seguro de que quieres eliminar los clientes seleccionados?')) {
            const updatedClients = clients.filter(client => !selectedClients.includes(client.uniqueCode));
            setClients(updatedClients); // Usar la prop setClients para actualizar el estado en AdminPanel
            localStorage.setItem('clients', JSON.stringify(updatedClients));
        }
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Clientes</h3>

            <ul className={styles.list}>
                {clients.map((client) => (
                    <li key={client.uniqueCode} className={styles.listItem}>
                        <input
                            type="checkbox"
                            checked={selectedClients.includes(client.uniqueCode)}
                            onChange={() => handleCheckboxChange(client.uniqueCode)}
                        />
                        <span>{client.email}</span>
                        <span>{client.uniqueCode}</span>
                        <span>40 días hábiles</span>
                        <button onClick={() => handleEditClick(client)} className={styles.editButton}>
                            {/* Icono de editar */}
                        </button>

                    </li>
                ))}
            </ul>

            <div className={styles.actions}>
                <form onSubmit={handleDownloadTxt}>
                    <button type="submit" className={styles.actionButton}>
                        Descargar .txt
                    </button>
                </form>

                <form onSubmit={handleDeleteSelected}>
                    <button type="submit" className={styles.actionButton}>
                        Borrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ClientList;
