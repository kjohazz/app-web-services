import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from './ImageGallery.module.css';

function RightImageGallery() {
    const images = [
        '/gallery/hacienda-guachipelin-02.jpg',
        '/gallery/hacienda-guachipelin-03.jpg',
        '/gallery/hacienda-guachipelin-04.jpg',
    ]; // Rutas de las imágenes de la galería derecha

    return (
        <Carousel
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
            className={styles.gallery}
        >
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image} alt={`Imagen ${index + 1}`} className={styles.image} />
                </div>
            ))}
        </Carousel>
    );
}

export default RightImageGallery;
