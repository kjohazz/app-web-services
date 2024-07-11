import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from './ImageGallery.module.css';

function SmallImageGallery() {
    const images = [
        '/gallery/hacienda-guachipelin-05.webp',
        '/gallery/hacienda-guachipelin-06.webp',
        '/gallery/hacienda-guachipelin-017.jpg',
    ];

    return (
        <Carousel
            showArrows={false} // Ocultar flechas de navegación
            showStatus={false} // Ocultar indicador de estado
            showThumbs={false} // Ocultar miniaturas
            infiniteLoop={true} // Repetir el carrusel infinitamente
            autoPlay={true}     // Iniciar automáticamente
            interval={3000}     // Cambiar de imagen cada 3 segundos
            className={styles.gallery} // Aplicar estilos CSS
        >
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image} alt={`Imagen ${index + 1}`} className={styles.image} />
                </div>
            ))}
        </Carousel>
    );
}

export default SmallImageGallery;
