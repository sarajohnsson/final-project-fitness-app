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

    const getAllWorkouts = async () => {
        const querySnapshot = await getDocs(collection(db, 'workouts'));
        const workoutSnap = querySnapshot.docs.map((workoutProp) => ({
            id: workoutProp.id,
            ...workoutProp.data(),
        }));

        setWorkouts(workoutSnap);
    };

    // On pageload
    useEffect(() => {
        getAllWorkouts();
    }, []);

    return (
        <div className="workout-wrapper">
            <Button
                className="add-workout add-btn success lg"
                title="Add workout">
                <FontAwesomeIcon className="add-icon" icon={faCirclePlus} />
            </Button>
            <div className="workout-container">
                {workouts.map((workout) => (
                    <div key={workout.id} data-id={workout.id}>
                        <div className="session-container">
                            <h2 className="workout-title">{workout.name}</h2>
                            <div className="session-box">
                                <Button
                                    className="save-btn success"
                                    title="Save workout">
                                    <FontAwesomeIcon
                                        className="save-icon"
                                        icon={faBookmark}
                                    />
                                </Button>
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
                            <ExerciseModal
                                className="add-exercise add-btn success lg"
                                title="Add Exercise">
                                <FontAwesomeIcon
                                    className="add-icon"
                                    icon={faCirclePlus}
                                />
                            </ExerciseModal>
                            <div className="custom-exercise-box">
                                <div className="custom-exercise-title">
                                    {workout.exercise.name}
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
                                    <li className="exercise-bodybody-item">
                                        {`${workout.exercise.set} sets`}
                                    </li>
                                    <li className="exercise-body-item">
                                        {`${workout.exercise.reps} reps`}
                                    </li>
                                    <li className="exercise-body-item">
                                        {`${workout.exercise.weight} kg`}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <Button className="add-btn success sm" title="Add Set">
                            <FontAwesomeIcon
                                className="add-icon"
                                icon={faCirclePlus}
                            />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
