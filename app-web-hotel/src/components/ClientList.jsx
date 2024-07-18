import React, { useState, useEffect } from 'react';
import styles from './ClientList.module.css';
import ReactPaginate from 'react-paginate';

function ClientList({ onEditClient }) {
    const [clients, setClients] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedClients, setSelectedClients] = useState([]);
    const itemsPerPage = 8;

    useEffect(() => {
        // Obtener clientes desde el backend al montar el componente
        const fetchClients = async () => {
            try {
                const response = await fetch('/api/clientes');
                if (response.ok) {
                    const data = await response.json();
                    setClients(data);
                } else {
                    console.error('Error al obtener los clientes del backend:', response.statusText);
                }
            } catch (error) {
                console.error('Error de red al obtener los clientes:', error);
            }
        };

        fetchClients();
    }, []);

    useEffect(() => {
        setSelectedClients([]);
    }, [clients]);

    const offset = currentPage * itemsPerPage;
    const currentClients = clients.slice(offset, offset + itemsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

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

    const handleDeleteClick = async (clientId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
            try {
                const response = await fetch(`/api/clientes/${clientId}`, { method: 'DELETE' });
                if (response.ok) {
                    setClients(clients.filter((client) => client.uniqueCode !== clientId));
                } else {
                    console.error('Error al eliminar el cliente:', response.statusText);
                }
            } catch (error) {
                console.error('Error de red al eliminar el cliente:', error);
            }
        }
    };

    const handleDownloadTxt = (event) => {
        event.preventDefault();
        const selectedClientData = clients.filter(client => selectedClients.includes(client.uniqueCode));

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

    const handleDeleteSelected = async (event) => {
        event.preventDefault();
        if (window.confirm('¿Estás seguro de que quieres eliminar los clientes seleccionados?')) {
            try {
                for (const clientId of selectedClients) {
                    const response = await fetch(`/api/clientes/${clientId}`, { method: 'DELETE' });
                    if (!response.ok) {
                        console.error('Error al eliminar el cliente:', response.statusText);
                        // Puedes mostrar un mensaje de error al usuario aquí
                    }
                }

                // Actualiza la lista de clientes después de eliminar los seleccionados
                const updatedClients = clients.filter(client => !selectedClients.includes(client.uniqueCode));
                setClients(updatedClients);
            } catch (error) {
                console.error('Error de red al eliminar los clientes:', error);
                // Puedes mostrar un mensaje de error al usuario aquí
            }
        }
    };
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Clientes</h3>

            <ul className={styles.list}>
                {currentClients.map((client) => (
                    <li key={client.uniqueCode} className={styles.listItem}>
                        <input
                            type="checkbox"
                            checked={selectedClients.includes(client.uniqueCode)}
                            onChange={() => handleCheckboxChange(client.uniqueCode)}
                        />
                        <span className={styles.email}>{client.email}</span>
                        <span className={styles.code}>{client.uniqueCode}</span>
                        <span className={styles.status}>{client.date}</span>
                        <button onClick={() => handleEditClick(client)} className={styles.editButton}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#800000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button onClick={() => handleDeleteClick(client.uniqueCode)} className={styles.deleteButton}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#800000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>

                    </li>
                ))}
            </ul>

            <div className={styles.actions}>
                <ReactPaginate
                    previousLabel={
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" className={styles.paginationIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </span>
                    }
                    nextLabel={
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" className={styles.paginationIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </span>
                    }
                    breakLabel={"..."}
                    pageCount={Math.ceil(clients.length / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange} // Pasamos la función correcta como prop
                    containerClassName={styles.pagination}
                    activeClassName={styles.activePage}
                />
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
