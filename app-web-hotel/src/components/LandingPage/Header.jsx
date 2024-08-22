import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import VideoModal from './VideoModal';

function Header() {
  const [showModal, setShowModal] = useState(false); // Estado para el modal del video
  const [showLinkModal, setShowLinkModal] = useState(false); // Estado para el modal del enlace

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenLinkModal = () => {
    setShowLinkModal(true);
  };

  const handleCloseLinkModal = () => {
    setShowLinkModal(false);
  };

  useEffect(() => {
    // Agregar un event listener para cerrar el modal al hacer clic fuera de él
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains(styles.modalOverlay)) {
        handleCloseLinkModal();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    // Limpiar el event listener al desmontar el componente
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <div className={styles.promoHeader} onClick={handleOpenLinkModal}>
        <p>Complimentary access to 7 waterfalls and Rio Negro hot springs for Hotel Hacienda Guachipelin guests</p>
      </div>

      <header className={styles.header}>
        <div>
          <a href="https://www.guachipelin.com/"> <img className={styles.logo} src="/hotel-hacienda-guachipelin-logo.png" alt="Logo" /></a>
        </div>
        <nav className={styles.menu}>
          <a href="https://www.guachipelin.com/">Home</a>
        </nav>

        {/* Modal del video */}
        {showModal && (
          <VideoModal onClose={handleCloseModal} videoUrl="URL_DE_TU_VIDEO" />
        )}
      </header>

      <div className={styles.banner} >
        <img src="/Volcanic-Mud-and-Springs-at-Hacienda-Guachipelin-photo-credit-valwyss.jpg" alt="Banner" className={styles.bannerImage} />
        
      </div>

      {/* Modal del enlace */}
      {showLinkModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <iframe
              src="https://fareharbor.com/embeds/book/guachipelin/?ref=https%3A%2F%2Fwww.guachipelin.com&language=en-us&u=350a1d98-c7c3-4294-b2c2-75ea86cd518f&from-ssl=yes&ga=UA-72993211-1%2C537403514.1720040421%3BUA-9112106-5%2C537403514.1720040421%3BUA-148587058-1%2C537403514.1720040421%3B&ga4t=G-2CHJ9R6QSF%2C537403514.1720040421__1721145751%3BAW-946633414%2Cundefined__undefined%3BG-WHDVXR5DJE%2C537403514.1720040421__1721145751%3BG-WE1JEXX12M%2C537403514.1720040421__1721145751%3BG-4BXG4V72LC%2C537403514.1720040421__1721145751%3BG-JPMFM2DE1K%2C537403514.1720040421__1721145751%3B&g4=yes&cp=no&csp=no&back=https%3A%2F%2Fwww.guachipelin.com%2F"
              title="Enlace externo"
              className={styles.iframe}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
