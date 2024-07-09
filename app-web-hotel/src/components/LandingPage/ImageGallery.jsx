import React from 'react';
import styles from './ImageGallery.module.css';

function ImageGallery() {
  const images = [
    './gallery/119646619_3446368292081271_6747832472390591636_n.jpg',
    './gallery/Canopy-nuevo-51.jpg',
    './gallery/DSC9616.jpg',
    './gallery/DSC9680.jpg',
    './gallery/Hacienda-Guachipelin-Adventure-Tour-Guanacaste-26.jpg',
    './gallery/hacienda-guachipelin-adventure-tour.jpg',
    './gallery/image-liberia-hacienda-guachipellin-hotel-14.jpg',
    './gallery/Tubing-11.jpg',
  ];

  return (
    <div className={styles.gallery}>
      {images.map((image, index) => (
        <img key={index} src={image} alt={`Imagen ${index + 1}`} className={styles.image} />
      ))}
    </div>
  );
}

export default ImageGallery;
