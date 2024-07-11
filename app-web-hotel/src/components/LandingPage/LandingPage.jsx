import React from 'react';
import Header from './Header';
import UniqueCodeForm from './UniqueCodeForm';
import SmallImageGallery from './SmallImageGallery'; // Importa el nuevo componente
import RightImageGallery from './RightImageGallery';    // Importa el nuevo componente
import BottomImageGallery from './BottomImageGallery';
import DiscountBox from './DiscountBox';
import styles from './LandingPage.module.css';

function LandingPage({ clients }) {
  return (
    <div className={styles.landingPage}>
      <Header />
      <div className={styles.content}>
        <div className={styles.leftSection}>
          <UniqueCodeForm clients={clients} />
          <div className={styles.gallerySmall}>
            <SmallImageGallery />
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.topBox}> {/* Contenedor para DiscountBox y galería superior */}
            <DiscountBox />
            <div className={styles.galleryTop}>
              <RightImageGallery /> {/* Utiliza el nuevo componente */}
            </div>
          </div>
          <div className={styles.galleryBottom}>
            <BottomImageGallery /> {/* Utiliza el nuevo componente */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
