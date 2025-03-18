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
    descContainer,
    descInfo,
    imageClass = 'modal-image',
    modalTitle = 'modal-title',
    modalText = 'modal-text',
    modalBtnContainerClass = 'modal-btn-container',
    modalBtnClass = 'modal-btn',
}) {
    return (
        <div className={modalClass}>
            <div className={overlayClass} onClick={onClose}></div>
            <div className={modalContentClass}>
                <div className={modalBtnContainerClass}>
                    <button className={modalBtnClass} onClick={onClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <div className={descContainer}>
                    {image && (
                        <img
                            className={imageClass}
                            src={image}
                            alt={title}
                            loading="lazy"
                        />
                    )}
                    <div className={descInfo}>
                        <h3 className={modalTitle}>{title}</h3>
                        <p className={modalText}>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { useModal };
