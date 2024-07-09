// src/components/LandingPage/LandingPage.jsx
import React from 'react';
import Header from './Header'; 
import UniqueCodeForm from './UniqueCodeForm';
import ImageGallery from './ImageGallery'; // Asegúrate de crear este componente
import styles from './LandingPage.module.css';

function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <Header />
      <div className={styles.content}>
        <div className={styles.galleryContainer}>
          <ImageGallery />
        </div>
        <div className={styles.formContainer}>
          <UniqueCodeForm />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
