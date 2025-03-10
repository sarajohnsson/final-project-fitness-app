import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DefaultLayout from '../src/pages/layouts/DefaultLayout';
import Home from '../src/pages/Home/Home';
import ExerciseList from './pages/ExerciseList/ExerciseList';
import WorkoutsPage from './pages/WorkoutsPage/WorkoutsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { selectUsers } from './store/usersSlice';

function App() {
    const user = useSelector(selectUsers);
    const isLoggedIn = user?.currentUser;

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/loginpage" element={<LoginPage />} />
                    <Route path="/exerciselist" element={<ExerciseList />} />
                    {/* <Route path="aboutpage" element={<AboutPage />} /> */}
                    {isLoggedIn ? (
                        <>
                            <Route
                                path="/workoutspage"
                                element={<WorkoutsPage />}
                            />
                            {/* <Route
                                path="/progresspage"
                                element={<WorkoutsPage />}
                            /> */}
                        </>
                    ) : (
                        <>
                            <Route
                                path="workoutspage"
                                element={<Navigate to="/loginpage" />}
                            />
                            {/* <Route
                                path="progresspage"
                                element={<Navigate to="/loginpage" />}
                            /> */}
                        </>
                    )}
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
