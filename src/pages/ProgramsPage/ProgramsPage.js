import {
    Box,
    Chip,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import { useState } from 'react';
import UseFetch from '../../hooks/UseFetch';
import './ProgramsPage.scss';

export default function ProgramsPage() {
    const url = '/data/workoutplans.json';
    const { data } = UseFetch(url);

    const [selectedWorkout, setSelectedWorkout] = useState('');

    const handleWorkoutChange = (e) => {
        setSelectedWorkout(e.target.value);
    };

    const workoutOptions = data
        ? Object.keys(data).map((key) => ({
              value: key,
              label: key,
          }))
        : [];

    workoutOptions.unshift({
        value: '',
        label: 'Select a Workout Plan',
    });

    return (
        <section className="programs-wrapper">
            <h2 className="programs-title">Pre-existing Programs</h2>
            <Container maxWidth="lg" className="programs-container">
                <FormControl>
                    <InputLabel
                        className="programs-label"
                        id="workout-select-label">
                        Workout Plans
                    </InputLabel>
                    <Select
                        sx={{ minWidth: 150 }}
                        className="workout-dropdown"
                        labelId="workout-select-label"
                        value={selectedWorkout}
                        label="Workout Plans"
                        onChange={handleWorkoutChange}>
                        {workoutOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {selectedWorkout && data[selectedWorkout] && (
                    <Box>
                        <Typography
                            className="selected-workout-title"
                            variant="h4"
                            gutterBottom
                            sx={{ mb: 3 }}>
                            {selectedWorkout}
                        </Typography>

                        {Object.entries(data[selectedWorkout]).map(
                            ([day, exercises]) => (
                                <Paper
                                    key={day}
                                    elevation={3}
                                    sx={{ mb: 4, p: 3 }}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        mb={2}>
                                        <Chip
                                            className="program-chip"
                                            label={day.replace(/day/g, 'Day ')}
                                            color="primary"
                                            size="medium"
                                        />
                                        <Typography
                                            variant="subtitle1"
                                            color="text.secondary">
                                            {exercises.length} exercises
                                        </Typography>
                                    </Box>
                                    <List>
                                        {exercises.map((exercise, index) => (
                                            <div key={`${day}-${index}`}>
                                                <ListItem sx={{ py: 1.5 }}>
                                                    <ListItemText
                                                        primary={
                                                            <Typography
                                                                variant="subtitle1"
                                                                fontWeight="medium">
                                                                {exercise.name}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary">
                                                                {exercise.sets}{' '}
                                                                sets ×{' '}
                                                                {exercise.reps}{' '}
                                                                reps
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItem>
                                                {index <
                                                    exercises.length - 1 && (
                                                    <Divider />
                                                )}
                                            </div>
                                        ))}
                                    </List>
                                </Paper>
                            )
                        )}
                    </Box>
                )}
            </Container>
        </section>
    );
}
