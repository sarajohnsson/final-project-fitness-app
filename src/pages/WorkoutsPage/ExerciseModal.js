import { useState } from 'react';
import './ExerciseModal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function ExerciseModal({ className, title, children }) {
    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <button onClick={() => setIsActive(true)} className={className}>
                {title}
                {children}
            </button>
            {isActive && (
                <div className="exercise-modal">
                    <button
                        onClick={() => {
                            setIsActive(false);
                        }}
                        className="close-exercise-btn">
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <div className="input-container">
                        <div className="input-row">
                            <label>
                                <p>Name: </p>
                                <input
                                    name="exercise"
                                    type="text"
                                    className="exercise-modal-input"
                                />
                            </label>
                        </div>
                        <div className="input-row">
                            <label>
                                <p>Sets: </p>
                                <input
                                    name="exercise"
                                    type="number"
                                    className="exercise-modal-input"
                                />
                            </label>
                        </div>
                        <div className="input-row">
                            <label>
                                <p>Reps: </p>
                                <input
                                    name="exercise"
                                    type="number"
                                    className="exercise-modal-input"
                                />
                            </label>
                        </div>
                        <div className="input-row">
                            <label>
                                <p>Weight: </p>
                                <input
                                    name="exercise"
                                    type="number"
                                    className="exercise-modal-input"
                                />
                            </label>
                        </div>
                    </div>
                    <button className="add-exercise-btn">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            )}
        </>
    );
}
