import { arrayUnion, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useForm, useWatch } from 'react-hook-form';
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
    const { register, handleSubmit, reset, control } = useForm({
        mode: 'onChange',
        defaultValues: { sets: 1, reps: [], weight: [] },
    });

    const setsCount = useWatch({ control, name: 'sets' }) || 1;

    const addExercise = async (data) => {
        if (!workoutId) {
            console.error('No workout ID provided');
            return;
        }

        const newExercise = {
            name: data.exerciseName,
            sets: parseInt(data.sets) || 1,
            reps: data.reps.map((rep) => parseInt(rep) || 0),
            weight: data.weight.map((kg) => parseFloat(kg) || 0),
        };

        try {
            const workoutRef = doc(db, 'workouts', workoutId);
            await updateDoc(workoutRef, {
                exercises: arrayUnion(newExercise),
            });
            refreshWorkouts();
            onClose();
            reset();
        } catch (error) {
            console.error('Error adding exercise: ', error);
        }
    };

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
                                <TextField
                                    error
                                    id="filled-error-helper-text"
                                    label="Exercise name"
                                    helperText="Exercise name is required."
                                    variant="filled"
                                    size="small"
                                    fullWidth
                                    {...register('exerciseName', {
                                        required: 'Exercise name is required',
                                    })}
                                    type="text"
                                    className="add-exercise-modal-input"
                                />
                            </div>
                            <div className="add-exercise-row">
                                <TextField
                                    id="filled-size-small"
                                    label="Sets"
                                    variant="filled"
                                    size="small"
                                    fullWidth
                                    // {...register('sets') }
                                    {...register(`sets`, {
                                        valueAsNumber: true,
                                        min: { value: 0 },
                                    })}
                                    inputProps={{
                                        min: 0,
                                    }}
                                    type="number"
                                    className="add-exercise-modal-input"
                                />
                            </div>
                        </Container>
                        <Container className="dynamic-exercise-module">
                            {[...Array(Number(setsCount) || 1)].map(
                                (_, index) => (
                                    <div
                                        key={index}
                                        className="dynamic-exercise-row">
                                        <TextField
                                            id="filled-size-small"
                                            label={`Reps (Set ${index + 1})`}
                                            variant="filled"
                                            size="small"
                                            fullWidth
                                            {...register(`reps.${index}`, {
                                                valueAsNumber: true,
                                                min: { value: 0 },
                                            })}
                                            inputProps={{
                                                min: 0,
                                            }}
                                            type="number"
                                            className="dynamic-exercise-input"
                                        />

                                        <TextField
                                            id="filled-size-small"
                                            label={`Weight (Set ${index + 1})`}
                                            variant="filled"
                                            size="small"
                                            fullWidth
                                            {...register(`weight.${index}`, {
                                                valueAsNumber: true,
                                                min: { value: 0 },
                                            })}
                                            inputProps={{
                                                min: 0,
                                            }}
                                            type="number"
                                            className="dynamic-exercise-input"
                                        />
                                    </div>
                                )
                            )}
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
