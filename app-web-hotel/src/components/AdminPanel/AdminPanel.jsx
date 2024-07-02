import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
//import Header from './Header/Header'; // Asegúrate de tener el Header creado
import FormContainer from './FormContainer/FormContainer';
import ListContainer from './ListContainer/ListContainer';
//import Modal from './Modal/Modal'; // La ruta puede variar según tu estructura
//import EmailTemplate from '../EmailTemplate/EmailTemplate';

function AdminPanel() {
    const [email, setEmail] = useState('');
    const [driveLink, setDriveLink] = useState('');
    const [envios, setEnvios] = useState([]);
    //  const [showModal, setShowModal] = useState(false);
    // const [emailTemplateContent, setEmailTemplateContent] = useState('');

    useEffect(() => {
        const storedEnvios = JSON.parse(localStorage.getItem('envios')) || [];
        setEnvios(storedEnvios);

        // Cargar el contenido del email template desde localStorage
        const storedEmailTemplate = localStorage.getItem('emailTemplateContent');
        if (storedEmailTemplate) {
            //   setEmailTemplateContent(storedEmailTemplate);
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const codigoUnico = generarCodigoUnico();

        const nuevoEnvio = {
            codigoUnico,
            correoElectronico: email,
            enlaceDrive: driveLink,
            estado: 'enviado',
            fechaEnvio: new Date()
        };

        setEnvios([...envios, nuevoEnvio]);
        localStorage.setItem('envios', JSON.stringify([...envios, nuevoEnvio]));

        console.log('Nuevo envío:', nuevoEnvio);

        setEmail('');
        setDriveLink('');
    };

    return (
        <div className="admin-panel">


            <FormContainer
                email={email}
                setEmail={setEmail}
                driveLink={driveLink}
                setDriveLink={setDriveLink}
                handleSubmit={handleSubmit}
            />

            {envios.length > 0 && <ListContainer envios={envios} />}

            {/*   <button onClick={() => setShowModal(true)}>Email Template</button>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <EmailTemplate
                    codigoUnico="EJEMPLO_CODIGO" // Reemplazar con el código real
                    emailTemplateContent={emailTemplateContent}
                    setEmailTemplateContent={setEmailTemplateContent}
                />
            </Modal> */}
        </div>
    );
}

function generarCodigoUnico() {
    return Math.random().toString(36).substr(2, 9);
}

export default AdminPanel;
