import React, { useState, useEffect, useRef } from 'react';
import styles from './DiscountBox.module.css';

function DiscountBox() {
    const discountTexts = [
        "Rio Negro, Tubing Adventure",
        "Volcanic mud bath and hot springs",
        "Horseback riding through the rainforest",
    ];

    const discountPercentages = [
        "15% off",
        "20% off",
        "10% off",
    ];

    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const discountTextsLength = useRef(discountTexts.length); // Usar useRef para almacenar la longitud

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex(prevIndex => (prevIndex + 1) % discountTextsLength.current); // Usar la longitud desde useRef
        }, 10000); // Cambiar cada 10 segundos (10000 ms)

        return () => clearInterval(interval); // Limpiar el intervalo al desmontar
    }, []);

    return (
        <div className={styles.discountBox}>
            <h2 className={styles.discountTitle}>Tour</h2>
            <p className={styles.discountSubtext}>{discountTexts[currentTextIndex]}</p>
            <p className={styles.discountText}>{discountPercentages[currentTextIndex]}</p>
        </div>
    );
}

export default DiscountBox;
