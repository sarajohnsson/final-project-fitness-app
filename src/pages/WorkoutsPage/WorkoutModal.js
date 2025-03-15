import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBookmark } from '@fortawesome/free-solid-svg-icons';
import './CustomModal.scss';
import { addDoc, serverTimestamp, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Container, TextField } from '@mui/material';

export default function WorkoutsModal({ isOpen, onClose, refreshWorkouts }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
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
            console.log('Workout added successfully!');
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
                        <div className="workout-container">
                            <div className="workout-row">
                                <label className="workout-label">
                                    <TextField
                                        id="filled-size-small"
                                        label="Workout name"
                                        variant="filled"
                                        size="small"
                                        {...register('workoutName', {
                                            required:
                                                'Workout name is required',
                                        })}
                                        type="text"
                                        className="workout-modal-input"
                                    />
                                    {errors.workoutName && (
                                        <span className="error-message">
                                            {errors.workoutName.message}
                                        </span>
                                    )}
                                </label>
                                <button type="submit" className="add-form-btn ">
                                    Save workout
                                    <FontAwesomeIcon
                                        className="save-icon"
                                        icon={faBookmark}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
}
