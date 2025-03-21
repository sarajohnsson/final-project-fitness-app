import React, { useEffect, useState } from 'react';
import UseFetch from '../../hooks/UseFetch';
import { useDispatch, useSelector } from 'react-redux';
import {
    addToFavorites,
    removeFromFavorites,
} from '../../store/watchlistSlice';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import './ExerciseList.scss';
import Modal, { useModal } from '../../components/ui/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Container, Grid2, TextField, MenuItem } from '@mui/material';

export default function ExerciseList() {
    const url = '/data/exercises.json';
    const [searchInput, setSearchInput] = useState('');
    const { isOpen, content, openModal, closeModal } = useModal();
    const [limit, setLimit] = useState(10);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [randomExercises, setRandomExercises] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState('');
    const { data, loading, error } = UseFetch(url);

    // Favorite exercise function
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.watchlist.favorites);

    const handleAddToFavorites = (item) => {
        dispatch(addToFavorites(item));
    };

    const handleRemoveFavorites = (item) => {
        dispatch(removeFromFavorites(item));
    };

    const isFavorite = (item) => {
        return favorites.some((favorite) => favorite.id === item.id);
    };

    // Function get random exercises
    function getRandomExercise(exercises, count) {
        const shuffled = [...exercises].sort(() => Math.random() - 0.5);
        return shuffled
            .slice(0, count)
            .filter((exercise) => exercise.name && exercise.equipment);
    }

    // Filter
    const equipmentOptions = [
        { value: '', label: 'All Equipment' },
        { value: 'dumbbell', label: 'Dumbbell' },
        { value: 'barbell', label: 'Barbell' },
        { value: 'kettlebells', label: 'Kettlebells' },
        { value: 'machine', label: 'Machine' },
        { value: 'cable', label: 'Cable' },
        { value: 'body only', label: 'Body Only' },
        { value: 'bands', label: 'Bands' },
    ];

    const handleButtonClick = (exercise) => {
        openModal(exercise);
    };

    const handleSearch = () => {
        if (searchInput.trim() === '') {
            setFilteredExercises(randomExercises);
        } else {
            const filtered = data.filter(
                (exercise) =>
                    exercise.name &&
                    exercise.name
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
            );
            setFilteredExercises(filtered);
        }
    };

    const handleEquipmentChange = (value) => {
        setSelectedEquipment(value);

        let filtered = data;

        if (searchInput.trim() !== '') {
            filtered = filtered.filter(
                (exercise) =>
                    exercise.name &&
                    exercise.name
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
            );
        }

        if (value) {
            filtered = filtered.filter(
                (exercise) =>
                    exercise.equipment && exercise.equipment.includes(value)
            );
        }

        setFilteredExercises(filtered);
    };

    useEffect(() => {
        if (data.length > 0) {
            const random = getRandomExercise(data, 10);
            setRandomExercises(random);
            setFilteredExercises(random);
        }
    }, [data]);

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }

    return (
        <>
            <Container maxWidth="lg" className="exercise-wrapper">
                <h2 className="exercise-list-title">Search the database</h2>
                <label className="exercise-input-group">
                    <TextField
                        id="filled-size-small"
                        variant="filled"
                        label="Search exercise"
                        type="text"
                        className="exercise-input"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
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
                </label>

                <div className="filter-container">
                    <TextField
                        className="equipment-dropdown"
                        id="outlined-select-equipment"
                        select
                        label="Select Equipment"
                        variant="outlined"
                        value={selectedEquipment}
                        onChange={(e) => handleEquipmentChange(e.target.value)}
                        helperText="Please select equipment">
                        {equipmentOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>

                {loading && <p>Loading...</p>}
                <Grid2 container spacing={3} className="exercise-container">
                    {filteredExercises.slice(0, limit).map((exercise) => (
                        // EXERCISE CARDS
                        <Card
                            cardClass="exercise-card"
                            key={exercise.id}
                            title={exercise.name}
                            description={exercise.primaryMuscles}
                            image={`/assets/exercises/${exercise.images[0]}`}
                            useBackgroundImage={true}
                            overlayClass="card-gradient"
                            contentClass="exercise-content"
                            cardTitleClass="exercise-title"
                            cardTextClass="exercise-desc"
                            cardBtnClass="exercise-btn"
                            buttonText="More info"
                            useTilt={true}
                            onButtonClick={() => handleButtonClick(exercise)}>
                            <div className="control">
                                <div className="tag-container">
                                    <p className="tag-text">
                                        {exercise.category}
                                    </p>
                                    <p className="tag-text">{exercise.level}</p>
                                </div>
                                <button
                                    className="fav-btn"
                                    onClick={() =>
                                        isFavorite(exercise)
                                            ? handleRemoveFavorites(exercise)
                                            : handleAddToFavorites(exercise)
                                    }>
                                    <FontAwesomeIcon
                                        icon={faHeart}
                                        style={{
                                            color: isFavorite(exercise)
                                                ? 'red'
                                                : 'white',
                                        }}
                                    />
                                </button>
                            </div>
                        </Card>
                    ))}
                </Grid2>

                {filteredExercises.length <= 0 ? (
                    <p className="error-message">
                        No exercises found by that name!
                    </p>
                ) : (
                    <Button
                        className="load-exercise-btn"
                        title="Load more"
                        onClick={() => setLimit(limit + 5)}
                        disabled={loading}
                    />
                )}

                {isOpen && content && (
                    <Modal
                        title={content.name}
                        description={content.instructions.map(
                            (sentence, index) => (
                                <React.Fragment key={index}>
                                    {sentence}
                                    {index <
                                        content.instructions.length - 1 && (
                                        <br />
                                    )}
                                </React.Fragment>
                            )
                        )}
                        image={`/assets/exercises/${content.images[0]}`}
                        modalClass="ex-modal"
                        overlayClass="ex-modal-overlay"
                        modalContentClass="ex-modal-content"
                        descContainer="ex-modal-desc-container"
                        descInfo="ex-modal-desc-info"
                        imageClass="ex-modal-image"
                        modalTitle="ex-modal-title"
                        modalText="ex-modal-text"
                        modalBtnContainerClass="ex-modal-btn-container"
                        modalBtnClass="ex-modal-btn"
                        onClose={closeModal}
                    />
                )}
            </Container>
        </>
    );
}
