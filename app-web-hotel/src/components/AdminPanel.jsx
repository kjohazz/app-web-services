import React, { useState, useEffect } from 'react';
import Header from './Header';
import EmailForm from './EmailForm';
import ClientList from './ClientList';
import EditClientModal from './EditClientModal';
import styles from './AdminPanel.module.css';

function AdminPanel() {
    const [clients, setClients] = useState([]);
    const [editingClient, setEditingClient] = useState(null);

    useEffect(() => {
        // Cargar clientes desde localStorage al montar el componente
        const storedClients = JSON.parse(localStorage.getItem('clients')) || [];
        setClients(storedClients);

        // Agregar un event listener para detectar cambios en localStorage
        const handleStorageChange = () => {
            const updatedClients = JSON.parse(localStorage.getItem('clients')) || [];
            setClients(updatedClients);
        };
        window.addEventListener('storage', handleStorageChange);

        // Limpiar el event listener al desmontar el componente
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleAddClient = (newClient) => {
        setClients(prevClients => {
            const updatedClients = [...prevClients, newClient];
            localStorage.setItem('clients', JSON.stringify(updatedClients));
            return updatedClients;
        });
    };

    const handleEditClient = (client) => {
        setEditingClient(client);
    };

    const handleUpdateClient = (updatedClient) => {
        setClients(prevClients => {
            const updatedClients = prevClients.map(client =>
                client.uniqueCode === updatedClient.uniqueCode ? updatedClient : client
            );
            localStorage.setItem('clients', JSON.stringify(updatedClients));
            return updatedClients;
        });
        setEditingClient(null);
    };

    const handleDeleteClient = (clientId) => {
        setClients(prevClients => {
            const updatedClients = prevClients.filter(client => client.uniqueCode !== clientId);
            localStorage.setItem('clients', JSON.stringify(updatedClients));
            return updatedClients;
        });
    };

    const handleCloseModal = () => {
        setEditingClient(null);
    };

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <div className={styles.column}>
                    <EmailForm onClientAdded={handleAddClient} />
                </div>
                <div className={styles.column}>
                    <ClientList
                        clients={clients}
                        onEditClient={handleEditClient}
                        onDeleteClient={handleDeleteClient}
                        setClients={setClients} // Pasar setClients como prop
                    />
                </div>
            </div>

            {editingClient && (
                <EditClientModal
                    client={editingClient}
                    onUpdateClient={handleUpdateClient}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default AdminPanel;
