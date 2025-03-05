import { useState } from 'react';
import './Modal.scss';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null);

    const openModal = (data) => {
        setContent(data);
        setIsOpen(true);
    };

    const closeModal = (content) => {
        setIsOpen(false);
        setContent(null);
    };

    return { isOpen, content, openModal, closeModal };
};

export default function Modal({
    title,
    description,
    image,
    onClose,
    modalClass = 'modal',
    overlayClass = 'modal-overlay',
    modalContentClass = 'modal-content',
    imageClass = 'modal-image',
    modalTitle = 'modal-title',
    modalText = 'modal-text',
    modalBtnClass = 'modal-btn',
}) {
    return (
        <div className={modalClass}>
            <div className={overlayClass} onClick={onClose}></div>
            <div className={modalContentClass}>
                <button className={modalBtnClass} onClick={onClose}>
                    <div className="modal-btn-container">
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </button>
                {image && (
                    <img
                        className={imageClass}
                        src={image}
                        alt={title}
                        loading="lazy"
                    />
                )}
                <h3 className={modalTitle}>{title}</h3>
                <p className={modalText}>{description}</p>
            </div>
        </div>
    );
}

export { useModal };
