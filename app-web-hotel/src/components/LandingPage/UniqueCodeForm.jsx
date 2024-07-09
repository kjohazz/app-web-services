import React, { useState, useEffect } from 'react';
import styles from './UniqueCodeForm.module.css';
import { useNavigate } from 'react-router-dom';

function UniqueCodeForm() {
  const [uniqueCode, setUniqueCode] = useState('');
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar clientes desde localStorage al montar el componente
    const storedClients = JSON.parse(localStorage.getItem('clients')) || []; // Corregido a 'clients' en plural
    setClients(storedClients);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Buscar el cliente correspondiente al código único
    const client = clients.find(c => c.uniqueCode === uniqueCode);

    if (client) {
      // Redirigir al enlace de Drive del cliente
      window.location.href = client.driveLink;
    } else {
      // Mostrar un mensaje de error si el código no es válido
      alert('Código único inválido. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Memories of your unforgettable trip</h2>
      

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Photo Code"
          value={uniqueCode}
          onChange={(e) => setUniqueCode(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Apply
        </button>
      </form>
    </div>
  );
}

export default UniqueCodeForm;
