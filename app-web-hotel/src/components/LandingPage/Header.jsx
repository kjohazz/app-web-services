import React, { useState } from 'react';
import styles from './Header.module.css';
import VideoModal from './VideoModal';

function Header() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.menu}> 
        {/* Contenido del menú */}
        <a href="https://www.guachipelin.com/">Inicio</a>

      </nav>

      <div className={styles.banner} onClick={handleOpenModal}>
        <img src="/Volcanic-Mud-and-Springs-at-Hacienda-Guachipelin-photo-credit-valwyss.jpg" alt="Banner" className={styles.bannerImage} />
        <button className={styles.playButton}>
          {/* Icono de Play */}
        </button>
      </div>

      {showModal && (
        <VideoModal onClose={handleCloseModal} videoUrl="URL_DE_TU_VIDEO" />
      )}
    </header>
  );
}

export default Header;
