import { arrayUnion, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import './CustomModal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../firebase/config';
import { Container, TextField } from '@mui/material';

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
            weight: parseFloat(data.weight),
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
                        <Container
                            maxWidth="lg"
                            className="add-exercise-container">
                            <div className="add-exercise-row">
                                <label className="add-exercise-label">
                                    <TextField
                                        id="filled-size-small"
                                        label="Exercise name"
                                        variant="filled"
                                        size="small"
                                        {...register('exerciseName', {
                                            required:
                                                'Exercise name is required',
                                        })}
                                        type="text"
                                        className="add-exercise-modal-input"
                                    />
                                </label>
                            </div>
                            <div className="add-exercise-row">
                                <label className="add-exercise-label">
                                    <TextField
                                        id="filled-size-small"
                                        label="Sets"
                                        variant="filled"
                                        size="small"
                                        {...register('sets')}
                                        type="number"
                                        className="add-exercise-modal-input"
                                    />
                                </label>
                            </div>
                            <div className="add-exercise-row">
                                <label className="add-exercise-label">
                                    <TextField
                                        id="filled-size-small"
                                        label="Reps"
                                        variant="filled"
                                        size="small"
                                        {...register('reps')}
                                        type="number"
                                        className="add-exercise-modal-input"
                                    />
                                </label>
                            </div>
                            <div className="add-exercise-row">
                                <label className="add-exercise-label">
                                    <TextField
                                        id="filled-size-small"
                                        label="Weight"
                                        variant="filled"
                                        size="small"
                                        put
                                        {...register('weight')}
                                        type="number"
                                        className="add-exercise-modal-input"
                                    />
                                </label>
                            </div>
                        </Container>
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
