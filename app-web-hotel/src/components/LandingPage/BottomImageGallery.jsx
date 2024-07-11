import React from 'react';
import styles from './ImageGallery.module.css';

function BottomImageGallery() {
    const image = '/gallery/hacienda-guachipelin-01.jpg'; // Ruta de la imagen inferior izquierda

    return (
        <div className={styles.gallery}>
            <img src={image} alt="Imagen inferior" className={styles.image} />
        </div>
    );
}

export default BottomImageGallery;
