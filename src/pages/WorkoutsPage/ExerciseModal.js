import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import './CustomModal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../firebase/config';

export default function ExerciseModal({
    isOpen,
    onClose,
    workoutId,
    refreshWorkouts,
}) {
    const addExercise = async (data) => {
        if (!workoutId) {
            console.error('No workout ID provided');
            return;
        }

        const newExercise = {
            name: data.exerciseName,
            sets: parseInt(data.sets),
            reps: parseInt(data.reps),
            weight: parseInt(data.weight),
        };

        try {
            const workoutRef = doc(db, 'workouts', workoutId);
            await updateDoc(workoutRef, {
                exercises: arrayUnion(newExercise),
            });
            console.log('Exercise added successfully!');
            refreshWorkouts();
            onClose();
            reset();
        } catch (error) {
            console.error('Error adding exercise: ', error);
        }
    };

    const { register, handleSubmit, reset } = useForm({
        mode: 'onChange',
    });

    return (
        <>
            {isOpen && (
                <form
                    className="exercise-form"
                    onSubmit={handleSubmit(addExercise)}>
                    <div className="exercise-modal">
                        <button onClick={onClose} className="close-form-btn">
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <div className="add-exercise-container">
                            <div className="add-exercise-row">
                                <label className="add-exercise-label">
                                    <p className="add-exercise-title">Name: </p>
                                    <input
                                        {...register('exerciseName', {
                                            required:
                                                'Exercise name is required',
                                        })}
                                        type="text"
                                        className="exercise-modal-input"
                                    />
                                </label>
                            </div>
                            <div className="add-exercise-row">
                                <label className="add-eexercise-label">
                                    <p className="add-eexercise-title">
                                        Sets:{' '}
                                    </p>
                                    <input
                                        {...register('sets')}
                                        type="number"
                                        className="exercise-modal-input"
                                    />
                                </label>
                            </div>
                            <div className="add-exercise-row">
                                <label className="add-eexercise-label">
                                    <p className="add-eexercise-title">
                                        Reps:{' '}
                                    </p>
                                    <input
                                        {...register('reps')}
                                        type="number"
                                        className="exercise-modal-input"
                                    />
                                </label>
                            </div>
                            <div className="add-exercise-row">
                                <label className="add-exercise-label">
                                    <p className="add-exercise-title">
                                        Weight:{' '}
                                    </p>
                                    <input
                                        {...register('weight')}
                                        type="number"
                                        className="exercise-modal-input"
                                    />
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="add-form-btn">
                            Save exercise
                            <FontAwesomeIcon
                                className="save-icon"
                                icon={faBookmark}
                            />
                        </button>
                    </div>
                </form>
            )}
        </>
    );
}
