import React, { useEffect, useState } from 'react';
import UseFetch from '../../hooks/UseFetch';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import './ExerciseList.scss';
import Modal, { useModal } from '../../components/ui/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons/faDumbbell';

export default function ExerciseList() {
    const url = '/data/exercises.json';
    const [searchInput, setSearchInput] = useState('');
    const { isOpen, content, openModal, closeModal } = useModal();
    const [limit, setLimit] = useState(10);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [randomExercises, setRandomExercises] = useState([]);
    const { data, loading, error } = UseFetch(url);

    // Function get random exercises
    function getRandomExercise(exercises, count) {
        const shuffled = [...exercises].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }

    useEffect(() => {
        if (data.length > 0) {
            const random = getRandomExercise(data, 10);
            setRandomExercises(random);
            setFilteredExercises(random);
        }
    }, [data]);

    const handleButtonClick = (exercise) => {
        openModal(exercise);
        console.log('Button clicked, exercise:', exercise);
    };

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }

    const handleSearch = () => {
        if (searchInput.trim() === '') {
            setFilteredExercises(randomExercises);
        } else {
            const filtered = data.filter((exercise) =>
                exercise.name
                    .toLowerCase()
                    .includes(searchInput.toLocaleLowerCase())
            );
            setFilteredExercises(filtered);
        }
    };

    return (
        <>
            <div className="exercise-wrapper">
                <div className="exercise-input-group">
                    <Input
                        type="text"
                        className="exercise-input"
                        placeholder="Search exercise"
                        value={searchInput}
                        onChangeFunction={setSearchInput}
                    />
                    <Button
                        className="exercise-input-btn"
                        title="Search"
                        onClick={handleSearch}>
                        <FontAwesomeIcon
                            className="db-icon"
                            icon={faDumbbell}
                        />
                    </Button>
                </div>

                {loading && <p>Loading...</p>}
                <div className="exercise-container">
                    {filteredExercises.slice(0, limit).map((exercise) => (
                        <Card
                            cardClass="exercise-card"
                            key={exercise.id}
                            title={exercise.name}
                            description={exercise.primaryMuscles}
                            image={`/assets/exercises/${exercise.images[0]}`}
                            useBackgroundImage={true}
                            overlayClass="card-gradient"
                            contentClass="exercise-content"
                            cardTitle="exercise-title"
                            cardText="exercise-desc"
                            cardBtnClass="exercise-btn"
                            buttonText="More info"
                            onButtonClick={() => handleButtonClick(exercise)}>
                            <div className="tag-container">
                                <p className="tag-text">{exercise.category}</p>
                                <p className="tag-text">{exercise.level}</p>
                            </div>
                        </Card>
                    ))}
                </div>

                <Button
                    className="load-exercise-btn"
                    title="Load more"
                    onClick={() => setLimit(limit + 5)}
                    disabled={loading}
                />

                {isOpen && content && (
                    <Modal
                        title={content.name}
                        description={`${content.instructions.join(' ')}`}
                        image={`/assets/exercises/${content.images[0]}`}
                        onClose={closeModal}
                    />
                )}
            </div>
        </>
    );
}
