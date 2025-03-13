import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useEffect, useState } from 'react';
import './WorkoutsPage.scss';
import Button from '../../components/ui/Button';
import ExerciseModal from './ExerciseModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrashCan,
    faBookmark,
    faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';

export default function WorkoutsPage() {
    const [workouts, setWorkouts] = useState([]);
    const [activeWorkoutId, setActiveWorkoutId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getAllWorkouts = async () => {
        const querySnapshot = await getDocs(collection(db, 'workouts'));
        const workoutSnap = querySnapshot.docs.map((workoutProp) => ({
            id: workoutProp.id,
            ...workoutProp.data(),
        }));
        setWorkouts(workoutSnap);
    };

    const refreshWorkouts = async () => {
        await getAllWorkouts();
    };

    // On page load
    useEffect(() => {
        getAllWorkouts();
    }, []);

    return (
        <div className="workout-wrapper">
            <Button
                className="add-workout add-btn success lg"
                title="Add workout">
                <FontAwesomeIcon className="add-icon" icon={faBookmark} />
            </Button>
            <div className="workout-container">
                {workouts.map((workout) => (
                    <div key={workout.id} data-id={workout.id}>
                        <div className="session-container">
                            <h2 className="workout-title">{workout.id}</h2>
                            <div className="session-box">
                                <Button
                                    className="remove-btn danger"
                                    title="Remove workout">
                                    <FontAwesomeIcon
                                        className="remove-icon"
                                        icon={faTrashCan}
                                    />
                                </Button>
                            </div>
                        </div>
                        <div className="custom-exercise-container">
                            {/* Adding new exercise modal */}
                            <Button
                                className="add-exercise add-btn success lg"
                                title="Add Exercise"
                                onClick={() => {
                                    setActiveWorkoutId(workout.id);
                                    setIsModalOpen(true);
                                }}>
                                <FontAwesomeIcon
                                    className="add-icon"
                                    icon={faCirclePlus}
                                />
                            </Button>
                            <ExerciseModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                workoutId={activeWorkoutId}
                                refreshWorkouts={refreshWorkouts}
                            />
                            {/* Render exercises */}
                            {workout.exercises &&
                                workout.exercises.map((exercise, index) => (
                                    <div
                                        key={index}
                                        className="custom-exercise-box">
                                        <div className="custom-exercise-header">
                                            <div className="custom-exercise-title">
                                                {exercise.name}
                                            </div>
                                            <Button
                                                className="remove-btn danger"
                                                title="Remove exercise">
                                                <FontAwesomeIcon
                                                    className="remove-icon"
                                                    icon={faTrashCan}
                                                />
                                            </Button>
                                        </div>
                                        <div className="exercise-table-header">
                                            <ul>
                                                <li className="exercise-header-item">
                                                    Sets
                                                </li>
                                                <li className="exercise-header-item">
                                                    Reps
                                                </li>
                                                <li className="exercise-header-item">
                                                    Weight
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="exercise-table-body">
                                            <ul>
                                                <li className="exercise-body-item">
                                                    {`${exercise.sets} sets`}
                                                </li>
                                                <li className="exercise-body-item">
                                                    {`${exercise.reps} reps`}
                                                </li>
                                                <li className="exercise-body-item">
                                                    {`${exercise.weight} kg`}
                                                </li>
                                            </ul>
                                        </div>
                                        <Button
                                            className="add-btn success sm"
                                            title="Add Set">
                                            <FontAwesomeIcon
                                                className="add-icon"
                                                icon={faCirclePlus}
                                            />
                                        </Button>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
