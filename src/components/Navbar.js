import { NavLink } from 'react-router-dom';
import Button from './ui/Button';
import logo from '../assets/gym-logo.png';
import './Navbar.scss';

export default function Navbar() {
    return (
        <div className="nav-wrapper">
            <nav className="navigation">
                <div className="logo">
                    <NavLink to="/">
                        <img className="logo-img" src={logo} alt="logo" />
                    </NavLink>
                </div>

                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>
                        <NavLink className="nav-link" to="/exerciselist">
                            Exercises
                        </NavLink>
                        <NavLink className="nav-link" to="/">
                            Workouts
                        </NavLink>
                        <NavLink className="nav-link" to="/">
                            Progress
                        </NavLink>
                        <NavLink className="nav-link" to="/">
                            About
                        </NavLink>
                    </li>
                </ul>

                <Button
                    className="nav-btn"
                    title="Join now"
                    onClick={() => console.log('Button clicked')}
                />
            </nav>
        </div>
    );
}
