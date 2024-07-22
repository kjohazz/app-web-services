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
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Cargar clientes desde el backend
        const fetchClients = async () => {
            try {
                const response = await fetch('http://localhost:5000/clients');
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

        // Cargar plantilla de correo desde el backend
        const fetchEmailTemplate = async () => {
            try {
                const response = await fetch('http://localhost:5000/email-template');
                if (response.ok) {
                    const template = await response.json();
                    setEmailTemplate(template.content);
                } else {
                    // Si no hay plantilla, crear una predeterminada y guardarla en MongoDB
                    const defaultTemplate = {
                        content: "Estimado/a cliente,\n\nGracias por elegir..."
                    };
                    const res = await fetch('http://localhost:5000/email-template', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(defaultTemplate),
                    });
                    if (res.ok) {
                        const template = await res.json();
                        setEmailTemplate(template.content);
                    }
                }
            } catch (error) {
                console.error('Error al obtener la plantilla de correo:', error);
            }
        };


        fetchClients();
        fetchEmailTemplate();
    }, []);

    const handleAddClient = async (newClient) => {
        try {
            const response = await fetch('http://localhost:5000/add-client', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newClient),
            });

            if (response.ok) {
                // Obtener la lista actualizada de clientes desde el backend
                const updatedClientsResponse = await fetch('http://localhost:5000/clients');
                if (updatedClientsResponse.ok) {
                    const updatedClients = await updatedClientsResponse.json();
                    setClients(updatedClients);
                } else {
                    console.error('Error al obtener clientes actualizados:', updatedClientsResponse.statusText);
                }
            } else {
                console.error('Error al agregar el cliente:', response.statusText);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    const handleUpdateClient = async (updatedClient) => {
        try {
            const response = await fetch(`http://localhost:5000/clients/${updatedClient._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedClient),
            });

            if (response.ok) {
                // Obtener la lista actualizada de clientes desde el backend
                const updatedClientsResponse = await fetch('http://localhost:5000/clients');
                if (updatedClientsResponse.ok) {
                    const updatedClients = await updatedClientsResponse.json();
                    setClients(updatedClients);
                } else {
                    console.error('Error al obtener clientes actualizados:', updatedClientsResponse.statusText);
                }
            } else {
                console.error('Error al actualizar el cliente:', response.statusText);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
        setEditingClient(null); // Cierra el modal después de actualizar
    };

    const handleDeleteClient = async (clientId) => {
        try {
            const response = await fetch(`http://localhost:5000/clients/${clientId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Obtener la lista actualizada de clientes desde el backend
                const updatedClientsResponse = await fetch('http://localhost:5000/clients');
                if (updatedClientsResponse.ok) {
                    const updatedClients = await updatedClientsResponse.json();
                    setClients(updatedClients);
                } else {
                    console.error('Error al obtener clientes actualizados:', updatedClientsResponse.statusText);
                }
            } else {
                console.error('Error al eliminar el cliente:', response.statusText);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    const handleEditClient = (client) => {
        setEditingClient(client);
    };

    const handleCloseModal = () => {
        setEditingClient(null);
    };

    const handleSaveTemplate = async (newTemplate) => {
        try {
            const response = await fetch('http://localhost:5000/email-template', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newTemplate }),
            });

            if (response.ok) {
                const updatedTemplate = await response.json();
                setEmailTemplate(updatedTemplate.content); // Actualizar el estado local
            } else {
                console.error('Error al guardar la plantilla:', response.statusText);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

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
                emailTemplate={emailTemplate} // Pasar la plantilla como prop
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
                        setClients={setClients} // Pasa la función setClients
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
