import { useState } from 'react';
import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import './ExerciseModal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../firebase/config';

export default function ExerciseModal({
    className,
    title,
    children,
    getExerciseData,
    exerciseToEdit,
    setExerciseToEdit,
    exerciseArray,
    workoutId,
}) {
    const [isActive, setIsActive] = useState(false);

    const { register, handleSubmit, formState, reset } = useForm({
        mode: 'onChange',
    });

    const onSubmit = async (data) => {
        if (exerciseToEdit) {
            // edit exercise
        } else {
            // add exercise
        }
    };

    return (
        <>
            <button onClick={() => setIsActive(true)} className={className}>
                {title}
                {children}
            </button>
            {isActive && (
                <form
                    className="exercise-form"
                    onSubmit={handleSubmit(onSubmit)}>
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
                                        {...register('name')}
                                        name="name"
                                        type="text"
                                        className="exercise-modal-input"
                                    />
                                </label>
                            </div>
                            <div className="input-row">
                                <label>
                                    <p>Sets: </p>
                                    <input
                                        {...register('sets')}
                                        name="sets"
                                        type="number"
                                        className="exercise-modal-input"
                                    />
                                </label>
                            </div>
                            <div className="input-row">
                                <label>
                                    <p>Reps: </p>
                                    <input
                                        {...register('reps')}
                                        name="reps"
                                        type="number"
                                        className="exercise-modal-input"
                                    />
                                </label>
                            </div>
                            <div className="input-row">
                                <label>
                                    <p>Weight: </p>
                                    <input
                                        {...register('weight')}
                                        name="weight"
                                        type="number"
                                        className="exercise-modal-input"
                                    />
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="add-exercise-btn">
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </form>
            )}
        </>
    );
}
