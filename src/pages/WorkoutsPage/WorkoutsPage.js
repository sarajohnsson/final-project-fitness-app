import {
    collection,
    getDocs,
    orderBy,
    query,
    doc,
    getDoc,
    deleteDoc,
    updateDoc,
    arrayUnion,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useEffect, useState } from 'react';
import './WorkoutsPage.scss';
import Button from '../../components/ui/Button';
import WorkoutModal from './WorkoutModal';
import ExerciseModal from './ExerciseModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Container } from '@mui/material';

export default function WorkoutsPage() {
    const [workouts, setWorkouts] = useState([]);
    const [activeWorkoutId, setActiveWorkoutId] = useState(null);
    const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
    const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);

    const deleteWorkouts = async (workout) => {
        const deleteWorkoutsRef = doc(db, 'workouts', workout.id);
        await deleteDoc(deleteWorkoutsRef);
        refreshWorkouts();
    };

    const deleteExercise = async (workoutId, exerciseIndex) => {
        try {
            const deleteExerciseRef = doc(db, 'workouts', workoutId);
            const workoutDoc = await getDoc(deleteExerciseRef);
            const exercises = workoutDoc.data().exercises;

            exercises.splice(exerciseIndex, 1);

            await updateDoc(deleteExerciseRef, {
                exercises,
            });
            refreshWorkouts();
        } catch (error) {
            console.error('Error deleting exercise', error);
        }
    };

    const getAllWorkouts = async () => {
        try {
            const getWorkoutsRef = collection(db, 'workouts');
            const querySorting = query(
                getWorkoutsRef,
                orderBy('createdAt', 'desc')
            );
            const querySnapshot = await getDocs(querySorting);

            const workoutSnap = querySnapshot.docs.map((workoutProp) => ({
                id: workoutProp.id,
                customId: workoutProp.data().customId,
                ...workoutProp.data(),
            }));
            setWorkouts(workoutSnap);
        } catch (error) {
            console.error('Error fetching workout', error);
        }
    };

    const refreshWorkouts = async () => {
        await getAllWorkouts();
    };

    // On page load
    useEffect(() => {
        getAllWorkouts();
    }, []);

    return (
        <Container maxWidth="lg" className="workout-wrapper">
            <h2 className="workout-title">Create custom workouts</h2>
            <Button
                className="add-workout add-btn success lg"
                title="Add workout"
                onClick={() => setIsWorkoutModalOpen(true)}>
                <FontAwesomeIcon className="add-icon" icon={faCirclePlus} />
            </Button>
            <WorkoutModal
                isOpen={isWorkoutModalOpen}
                onClose={() => setIsWorkoutModalOpen(false)}
                refreshWorkouts={refreshWorkouts}
            />
            <section className="workout-container">
                {workouts.map((workout) => (
                    <div
                        className="generated-workout"
                        key={workout.id}
                        data-id={workout.id}>
                        <div className="session-container">
                            <h2 className="workout-title">{workout.name}</h2>
                            <div className="session-box">
                                <Button
                                    onClick={() => deleteWorkouts(workout)}
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
                                    setIsExerciseModalOpen(true);
                                }}>
                                <FontAwesomeIcon
                                    className="add-icon"
                                    icon={faCirclePlus}
                                />
                            </Button>
                            {activeWorkoutId === workout.id && (
                                <ExerciseModal
                                    isOpen={isExerciseModalOpen}
                                    onClose={() =>
                                        setIsExerciseModalOpen(false)
                                    }
                                    workoutId={activeWorkoutId}
                                    refreshWorkouts={refreshWorkouts}
                                />
                            )}
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
                                                onClick={() => {
                                                    deleteExercise(
                                                        workout.id,
                                                        index
                                                    );
                                                }}
                                                className="remove-btn danger"
                                                title="Remove exercise">
                                                <FontAwesomeIcon
                                                    className="remove-icon"
                                                    icon={faTrashCan}
                                                />
                                            </Button>
                                        </div>
                                        {exercise.reps.map((rep, repIndex) => (
                                            <div
                                                key={repIndex}
                                                className="exercise-table-header">
                                                <ul>
                                                    <li className="exercise-header-item">
                                                        Set {repIndex + 1}
                                                    </li>
                                                    <li className="exercise-header-item">
                                                        {' '}
                                                        {rep} reps
                                                    </li>
                                                    <li className="exercise-header-item">
                                                        {
                                                            exercise.weight[
                                                                repIndex
                                                            ]
                                                        }{' '}
                                                        kg
                                                    </li>
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </section>
        </Container>
    );
}
