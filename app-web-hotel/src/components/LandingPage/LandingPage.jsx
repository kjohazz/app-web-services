import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import UniqueCodeForm from './UniqueCodeForm';
import DiscountBox from './DiscountBox';
import styles from './LandingPage.module.css';
import ImageGallery from './ImageGallery';



function LandingPage({ clients }) {
  const containerRefs = [
    useRef(null), useRef(null), useRef(null), useRef(null),
    useRef(null), useRef(null), useRef(null)
  ];

  const [imagesIndex, setImagesIndex] = useState(Array(7).fill(0));

  const handleImageIndexChange = (galleryIndex, newIndex) => {
    setImagesIndex(prevIndexes => {
      const newIndexes = [...prevIndexes];
      newIndexes[galleryIndex] = newIndex;
      return newIndexes;
    });
  };

  // Asegúrate de tener las rutas correctas a tus imágenes en la carpeta public
  const allImages = [
    '/gallery/hacienda-guachipelin-01.jpg',
    '/gallery/hacienda-guachipelin-02.jpg',
    '/gallery/hacienda-guachipelin-03.jpg',
    '/gallery/hacienda-guachipelin-04.jpg',
    '/gallery/hacienda-guachipelin-05.webp',
    '/gallery/hacienda-guachipelin-06.webp',
    '/gallery/hacienda-guachipelin-07.jpg',
    '/gallery/hacienda-guachipelin-08.jpg',
  ];

  const gallery01 = allImages.slice(0, 3);
  const gallery02 = allImages.slice(4, 6);
  const gallery03 = allImages.slice(2, 6);
  const gallery04 = allImages.slice(2, 4);
  const gallery05 = allImages.slice(4, 7);
  const gallery06 = allImages.slice(3, 6);
  const gallery07 = allImages.slice(1, 5);

  return (
    <div className={styles.landingPage}>
      <Header />
      <div className={styles.content}>
        <div className={styles.leftSection}>
          <UniqueCodeForm clients={clients} />
          <div className={styles.gallerySmall}>
            <ImageGallery images={gallery01} imagesIndex={imagesIndex[0]} updateImageIndex={(newIndex) => handleImageIndexChange(0, newIndex)} />
            <ImageGallery images={gallery02} imagesIndex={imagesIndex[2]} updateImageIndex={(newIndex) => handleImageIndexChange(2, newIndex)} />
            <ImageGallery images={gallery03} imagesIndex={imagesIndex[4]} updateImageIndex={(newIndex) => handleImageIndexChange(4, newIndex)} />
          </div>
        </div>
        <div className={styles.rightSection}>
          <div>
            <div className={styles.topBox}>
              <DiscountBox />
              <div className={styles.galleryTop}>
                <ImageGallery images={gallery07} imagesIndex={imagesIndex[3]} updateImageIndex={(newIndex) => handleImageIndexChange(3, newIndex)} />
                <ImageGallery images={gallery05} imagesIndex={imagesIndex[7]} updateImageIndex={(newIndex) => handleImageIndexChange(7, newIndex)} />
                <ImageGallery images={gallery06} imagesIndex={imagesIndex[7]} updateImageIndex={(newIndex) => handleImageIndexChange(7, newIndex)} />
              </div>

            </div>
          </div>

          <div className={styles.galleryBottom}>
            <ImageGallery images={gallery04} imagesIndex={imagesIndex[7]} updateImageIndex={(newIndex) => handleImageIndexChange(7, newIndex)} />
          </div>
        </div>

      </div>
    </div>
  );

}

export default LandingPage;
