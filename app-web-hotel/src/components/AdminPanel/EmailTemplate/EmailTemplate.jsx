import React, { useState, useEffect } from 'react';

function EmailTemplate({ codigoUnico, emailTemplateContent, setEmailTemplateContent }) {
    const [content, setContent] = useState(emailTemplateContent);

    useEffect(() => {
        const storedContent = localStorage.getItem('emailTemplateContent') ||
            '<p>Estimado cliente,</p><p>Gracias por utilizar nuestros servicios fotográficos. Aquí está su código único para acceder a sus fotos:</p><h2 style={{ textAlign: "center" }}>{codigoUnico}</h2><p>Por favor, ingrese este código en nuestra página web para ver y descargar sus fotos.</p><p>¡Esperamos que disfrute de sus recuerdos!</p><p>Atentamente,</p><p>El equipo de [Nombre del Hotel]</p>';
        setContent(storedContent);
    }, []);

    const handleChange = (event) => {
        const newContent = event.target.value;
        setContent(newContent);
        setEmailTemplateContent(newContent);
        localStorage.setItem('emailTemplateContent', newContent);
    };

    return (
        <textarea
            value={content.replace('{codigoUnico}', codigoUnico)}
            onChange={handleChange}
            rows={10} // Ajusta el número de filas según tus necesidades
            cols={50} // Ajusta el número de columnas según tus necesidades
        />
    );
}

export default EmailTemplate;
