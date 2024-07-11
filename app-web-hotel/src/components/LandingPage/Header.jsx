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
    <div>
      <header className={styles.header}>
        <div>
          <img className={styles.logo} src="/hotel-hacienda-guachipelin-logo.png" alt="Logo" />
        </div>
        <nav className={styles.menu}>
          {/* Contenido del menú */}
          <a href="https://www.guachipelin.com/">Inicio</a>

        </nav>


        {showModal && (
          <VideoModal onClose={handleCloseModal} videoUrl="URL_DE_TU_VIDEO" />
        )}
      </header>
      <div className={styles.banner} onClick={handleOpenModal}>
        <img src="/Volcanic-Mud-and-Springs-at-Hacienda-Guachipelin-photo-credit-valwyss.jpg" alt="Banner" className={styles.bannerImage} />
        <button className={styles.playButton}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-play">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Header;
