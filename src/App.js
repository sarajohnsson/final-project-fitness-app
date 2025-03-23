import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DefaultLayout from '../src/pages/layouts/DefaultLayout';
import Home from '../src/pages/Home/Home';
import ExerciseList from './pages/ExerciseList/ExerciseList';
import WorkoutsPage from './pages/WorkoutsPage/WorkoutsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import WatchlistPage from './pages/WatchlistPage/WatchlistPage';
import { selectUsers } from './store/usersSlice';
import AboutPage from './pages/AboutPage/AboutPage';

function App() {
    const user = useSelector(selectUsers);
    const isLoggedIn = user?.currentUser;

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/exercisedatabase"
                        element={<ExerciseList />}
                    />
                    <Route path="/about" element={<AboutPage />} />
                    {isLoggedIn ? (
                        <>
                            <Route
                                path="/progress"
                                element={<WorkoutsPage />}
                            />
                            <Route
                                path="/favorites"
                                element={<WatchlistPage />}
                            />
                        </>
                    ) : (
                        <>
                            <Route
                                path="progress"
                                element={<Navigate to="/login" />}
                            />
                            <Route
                                path="/favorites"
                                element={<Navigate to="/login" />}
                            />
                        </>
                    )}
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
