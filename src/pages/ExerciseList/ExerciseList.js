import React, { useState } from 'react';
import UseFetch from '../../hooks/UseFetch';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function ExerciseList() {
    const url = '/data/exercises.json';
    const [limit, setLimit] = useState(10);

    const { data, loading, error } = UseFetch(url);

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
        <div>
            <h1 className="title">Exercise List</h1>
            {loading && <p>Loading...</p>}
            <div className="exercise-container">
                {data.slice(0, limit).map((exercise) => (
                    <Card
                        key={exercise.id}
                        title={exercise.name}
                        description={exercise.primaryMuscles}
                        image={`/assets/exercises/${exercise.image}`}
                    />
                ))}
            </div>

            <Button
                className="load-btn"
                title="Load more"
                onClick={() => setLimit(limit + 5)}
                disabled={loading}
            />
        </div>
    );
}
