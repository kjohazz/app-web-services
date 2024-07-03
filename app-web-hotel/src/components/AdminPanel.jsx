import React, { useState, useEffect } from 'react';
import Header from './Header';
import EmailForm from './EmailForm';
import ClientList from './ClientList';
import EditClientModal from './EditClientModal';
import styles from './AdminPanel.module.css';
import EmailModal from './EmailModal';

function AdminPanel() {
    const [clients, setClients] = useState([]);
    const [editingClient, setEditingClient] = useState(null);
    const [emailTemplate, setEmailTemplate] = useState('');

    useEffect(() => {
        // Cargar clientes desde localStorage
        const storedClients = JSON.parse(localStorage.getItem('clients')) || [];
        setClients(storedClients);

        // Cargar plantilla de correo desde localStorage
        const storedTemplate = localStorage.getItem('emailTemplate');
        if (storedTemplate) {
            setEmailTemplate(storedTemplate);
        } else {
            setEmailTemplate(
                "Estimado/a cliente,\n\n" +
                "Gracias por elegir nuestros servicios fotográficos durante su aventura en el Hotel Guachipelín. ¡Esperamos que haya disfrutado de su estadía!\n\n" +
                "Nos complace compartirle el enlace para acceder a sus fotografías: landingPage.com\n" +
                "Para acceder a la descarga, por favor ingrese el siguiente código único en el campo correspondiente: [xxxxxxxx]\n\n" +
                "Agradecemos su preferencia y esperamos tener el placer de recibirle nuevamente en el futuro.\n\n" +
                "Atentamente,\n" +
                "El equipo del Hotel Guachipelín"
            );
        }

        const handleStorageChange = () => {
            const updatedClients = JSON.parse(localStorage.getItem('clients')) || [];
            setClients(updatedClients);
        };
        window.addEventListener('storage', handleStorageChange);

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


    const handleSaveTemplate = (newTemplate) => {
        setEmailTemplate(newTemplate);
        localStorage.setItem('emailTemplate', newTemplate);
    };
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <Header
                onSaveTemplate={handleSaveTemplate}
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <EmailModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSaveTemplate={handleSaveTemplate}
            />
            <div className={styles.container}>
                <div className={`${styles.column} ${styles.columnForm}`}>
                    <EmailForm onClientAdded={handleAddClient} emailTemplate={emailTemplate} />
                </div>
                <div className={`${styles.column} ${styles.columnList}`}>
                    <ClientList
                        clients={clients}
                        onEditClient={handleEditClient}
                        onDeleteClient={handleDeleteClient}
                        setClients={setClients}
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
