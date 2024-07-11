import React from 'react';
import styles from './VideoModal.module.css'; // Asegúrate de que la ruta sea correcta

function VideoModal({ onClose, videoUrl }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}> {/* Evita que el clic en el contenido cierre el modal */}
        <button onClick={onClose} className={styles.closeButton}>
          X {/* Puedes reemplazar esto con un icono de cierre */}
        </button>

        <iframe
          width="853"
          height="480"
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={styles.video}
        ></iframe>
      </div>
    </div>
  );
}

export default VideoModal;
