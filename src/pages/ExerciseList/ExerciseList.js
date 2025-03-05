import React, { useState } from 'react';
import UseFetch from '../../hooks/UseFetch';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import './ExerciseList.scss';
import Modal, { useModal } from '../../components/ui/Modal';

export default function ExerciseList() {
    const url = '/data/exercises.json';
    const [limit, setLimit] = useState(10);
    const { isOpen, content, openModal, closeModal } = useModal();

    const { data, loading, error } = UseFetch(url);

    const handleButtonClick = (exercise) => {
        openModal(exercise);
        console.log('Button clicked, exercise:', exercise);
    };

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
                {error.response?.status === 403 && (
                    <p>Access forbidden. Please check your API key.</p>
                )}
                {error.response?.status === 404 && (
                    <p>Resource not found. Please check the API endpoint.</p>
                )}
            </div>
        );
    }

    return (
        <div className="exercise-wrapper">
            <h1 className="title">Exercise List</h1>
            <div>
                <Input />
            </div>
            {loading && <p>Loading...</p>}
            <div className="exercise-container">
                {data.slice(0, limit).map((exercise) => (
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
    );
}
