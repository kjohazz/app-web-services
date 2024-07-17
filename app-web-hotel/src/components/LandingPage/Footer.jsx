import React from 'react';
import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>

                <div className={styles.info}>
                    <h2 className={styles.hotelName}>Hacienda Guachipelín</h2>
                    <p className={styles.phoneNumber}>506-2690-2900</p>
                    <p className={styles.phoneNumber}>1-888-730-3840</p>
                    <a href="https://wa.me/+50683902900" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                        https://wa.me/+50689123477
                    </a>
                    <a href="mailto:info@guachipelin.com" className={styles.contactLink}>
                        info@guachipelin.com
                    </a>
                    <p>Parque Nacional Rincón de la Vieja <br />
                        Liberia, Guanacaste<br />
                        PO Box 208-50101<br />
                        Costa Rica</p>
                </div>
                <div className={styles.award}>
                    <img src="/travelers-choice-2023.png" alt="Traveler's Choice" />
                    <div className={styles.socialIcons}>
                        <a href="https://www.facebook.com/HaciendaGuachipelin/" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.6 11.4h-2.1v7h-3.5v-7h-2.1V9h2.1v-1.8c0-2.1 1.1-3.1 3.1-3.1l2 0v2.2h-1.5c-1 0-1.1.5-1.1 1.1v1.5h2.6l-.5 3z" />
                            </svg>
                        </a>
                        <a href="https://g.page/haciendaguachipelin?share" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="white">
                                <path d="M17.67 28.11H9.5V38h8.17l-.44-9.89zM24 4c6.63 0 12 5.37 12 12s-5.37 12-12 12-12-5.37-12-12 5.37-12 12-12zm0 20c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm8.17 0l-.44-9.89V18H38.5v10.11h-8.17z" />
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/haciendaguachipelin/" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3.5 5.5a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zm-5 0a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zm6.22 7.23a.75.75 0 01-.447.718 3.75 3.75 0 01-2.12 2.122.75.75 0 01-.718.447 5.25 5.25 0 01-3.027-3.027.75.75 0 01.447-.718 3.75 3.75 0 012.12-2.122.75.75 0 01.718-.447 5.25 5.25 0 013.027 3.027zM12 7a5 5 0 100-10 5 5 0 000 10z" clip-rule="evenodd" />
                            </svg>
                        </a>
                        <a href="https://www.tripadvisor.com/Attraction_Review-g321538-d1741458-Reviews-Adventure_Tours_Hacienda_Guachipelin-Rincon_de_La_Vieja_Province_of_Guanacaste.html" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white">
                                <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 48c110.5 0 200 89.5 200 200s-89.5 200-200 200S56 366.5 56 256 145.5 48 256 48zm62.8 326.8c-39.5 39.5-103.6 39.5-143.2 0l-50.4-50.4c-19.7-19.7-30.2-45.9-30.2-73.9 0-28 10.6-54.2 30.2-73.9l50.4-50.4c39.5-39.5 103.6-39.5 143.2 0 39.5 39.5 39.5 103.6 0 143.2l-34 34c-19.7 19.7-45.9 30.2-73.9 30.2-28 0-54.2-10.6-73.9-30.2l-34-34c-39.5-39.5-39.5-103.6 0-143.2 39.5-39.5 103.6-39.5 143.2 0l50.4 50.4c19.7 19.7 30.2 45.9 30.2 73.9 0 28-10.6 54.2-30.2 73.9l-50.4 50.4z"></path>
                            </svg>
                        </a>

                        <a href="https://twitter.com/guachipelincr" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/user/GuachipelinMarketing" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-youtube">
                                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33a2.78 2.78 0 0 0 1.94 2C3.12 17 12 17 12 17s8.88 0 10.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                            </svg>
                        </a>
                    </div>
                </div>

            </div>
            <div className={styles.year}>2024</div>
        </footer>
    );
}

export default Footer;
