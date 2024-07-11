import React, { useState, useEffect } from 'react';
import styles from './UniqueCodeForm.module.css';

function UniqueCodeForm() {
  const [uniqueCode, setUniqueCode] = useState('');
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const storedClients = JSON.parse(localStorage.getItem('clients')) || [];
    setClients(storedClients);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const client = clients.find(c => c.uniqueCode === uniqueCode);

    if (client) {
      // Abrir el enlace de Drive en una nueva pestaña
      window.open(client.driveLink, '_blank');
    } else {
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
