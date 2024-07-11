import React from 'react';
import styles from './DiscountBox.module.css';

function DiscountBox() {
    return (
        <div className={styles.discountBox}>
            <p className={styles.discountText}>15% off</p>
            <p className={styles.discountSubtext}>in your next adventure</p>
        </div>
    );
}

export default DiscountBox;
