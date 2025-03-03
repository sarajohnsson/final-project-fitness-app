import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from '../src/pages/layouts/DefaultLayout';
import Home from '../src/pages/Home/Home';
import Exercises from './pages/Exercises/Exercises';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="exercises" element={<Exercises />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
