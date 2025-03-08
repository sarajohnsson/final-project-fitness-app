import { NavLink } from 'react-router-dom';
import Button from './ui/Button';
import logo from '../assets/gym-logo.png';
import './Navbar.scss';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`nav-wrapper ${scrolled ? 'scrolled' : ''}`}>
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

                <NavLink className="nav-btn" to="/">
                    Join here
                </NavLink>
            </nav>
        </div>
    );
}
