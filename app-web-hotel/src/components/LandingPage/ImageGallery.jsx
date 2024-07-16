import React, { useState, useEffect, useRef } from 'react';
import styles from './ImageGallery.module.css';

function ImageGallery({ images, containerRefs }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 7000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className={styles.imageContainer}> {/* Contenedor para la imagen actual */}
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    className={`${styles.image} ${index === currentImageIndex ? styles.active : ''}`}
                    style={{ display: index === currentImageIndex ? 'block' : 'none' }}
                />
            ))}
        </div>
    );
}

export default ImageGallery;
