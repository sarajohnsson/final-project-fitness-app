import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from '../src/pages/layouts/DefaultLayout';
import Home from '../src/pages/Home/Home';
import ExerciseList from './pages/ExerciseList/ExerciseList';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="exerciselist" element={<ExerciseList />} />
                    <Route path="loginpage" element={<LoginPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
