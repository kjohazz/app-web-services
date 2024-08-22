import React, { useState, useEffect } from 'react';
import styles from './UniqueCodeForm.module.css';

function UniqueCodeForm() {
  const [uniqueCode, setUniqueCode] = useState('');
  const [client, setClient] = useState(null); // Almacena el cliente encontrado

  useEffect(() => {
    // No necesitamos cargar clientes desde localStorage aquí
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Consulta a la base de datos para buscar el cliente por código único
      const response = await fetch(`https://backend-hg.onrender.com/clients/code/${uniqueCode}`); // Endpoint para buscar por uniqueCode
      if (response.ok) {
        const clientData = await response.json();
        setClient(clientData); // Almacena el cliente encontrado
        // Abre el enlace de Drive en una nueva pestaña
        window.open(clientData.driveLink, '_blank');
      } else {
        setClient(null); // Si no se encuentra, limpia el cliente
        alert('Código único inválido. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setClient(null); // En caso de error, limpia el cliente
      alert('Error al buscar el código único.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Memories of your</h2>
      <h2>unforgettable trip</h2>

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
