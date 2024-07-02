// Countdown.jsx
import React, { useState, useEffect } from 'react';

function Countdown({ fechaEnvio }) {
    const [tiempoRestante, setTiempoRestante] = useState(calcularTiempoRestante(fechaEnvio));

    useEffect(() => {
        const interval = setInterval(() => {
            const nuevoTiempoRestante = calcularTiempoRestante(fechaEnvio);
            setTiempoRestante(nuevoTiempoRestante);

            if (nuevoTiempoRestante <= 0) {
                eliminarEnvioExpirado(fechaEnvio);
            }
        }, 24 * 60 * 60 * 1000); // Actualizar cada 24 horas

        return () => clearInterval(interval);
    }, [fechaEnvio]); // <-- Agregar fechaEnvio como dependencia

    function eliminarEnvioExpirado(fechaEnvio) {
        // ... (lógica para eliminar el envío expirado)
    }

    function calcularTiempoRestante(fechaEnvio) {
        const fechaActual = new Date();
        const diferenciaMs = fechaEnvio - fechaActual; // <-- Corregir el cálculo
        const diasRestantes = Math.max(0, Math.ceil((20 * 24 * 60 * 60 * 1000 - diferenciaMs) / (1000 * 60 * 60 * 24))); // <-- Corregir el cálculo
        return diasRestantes;
    }

    return <span>{tiempoRestante > 0 ? tiempoRestante + ' días' : 'Expirado'}</span>;
}

export default Countdown;
