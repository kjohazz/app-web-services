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
      <h2 className={styles.title}>Memories of your</h2> <h2> unforgettable trip</h2>

      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <span className={styles.searchIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </span>
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
          </div>
        </form>

      </div>
    </div>
  );
}

export default UniqueCodeForm;
