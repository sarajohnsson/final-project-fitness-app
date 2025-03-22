import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBookmark } from '@fortawesome/free-solid-svg-icons';
import './CustomModal.scss';
import { addDoc, serverTimestamp, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { TextField } from '@mui/material';

export default function WorkoutsModal({ isOpen, onClose, refreshWorkouts }) {
    const { register, handleSubmit, reset } = useForm({
        mode: 'onChange',
    });

    const addWorkout = async (data) => {
        const customWorkoutId = data.workoutName
            .toLowerCase()
            .replace(/\s+/g, '-');
        const newWorkout = {
            name: data.workoutName,
            customId: customWorkoutId,
            exercise: [],
            createdAt: serverTimestamp(),
        };
        try {
            const workoutRef = collection(db, 'workouts');
            await addDoc(workoutRef, newWorkout);
            refreshWorkouts();
            onClose();
            reset();
        } catch (error) {
            console.error('Error adding workout', error);
        }
    };

    return (
        <>
            {isOpen && (
                <form
                    className="workout-form"
                    onSubmit={handleSubmit(addWorkout)}>
                    <div className="workout-modal">
                        <button onClick={onClose} className="close-form-btn">
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <div className="add-workout-container">
                            <TextField
                                error
                                id="filled-error-helper-text"
                                label="Workout name"
                                helperText="Workout name is required."
                                variant="filled"
                                size="small"
                                {...register('workoutName', {
                                    required: 'Workout name is required',
                                })}
                                type="text"
                                className="workout-modal-input"
                            />
                            <button type="submit" className="add-form-btn ">
                                Save workout
                                <FontAwesomeIcon
                                    className="save-icon"
                                    icon={faBookmark}
                                />
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
}
