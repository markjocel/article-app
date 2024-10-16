// components/Modal.tsx
import React from 'react';
import styles from './modal.module.scss'; // Adjust the path as necessary

interface ModalProps {
    message: string;
    title: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose, title }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>{title}</h2>
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;