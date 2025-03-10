import { NavLink, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/usersSlice';
import logo from '../assets/gym-logo.png';
import './Navbar.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUsers } from '../store/usersSlice';

export default function Navbar() {
    const dispatch = useDispatch();
    const [scrolled, setScrolled] = useState(false);
    const user = useSelector(selectUsers);
    const isLoggedIn = user?.currentUser;

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

    function handleSignout() {
        if (window.confirm('Are you sure you want to log out')) {
            signOut(auth)
                .then(() => {
                    // Sign-out successful.
                    dispatch(setUser(null));
                })
                .catch((error) => {
                    // An error happened.
                    console.log(error);
                });
        }
    }

    return (
        <div className={`nav-wrapper ${scrolled ? 'scrolled' : ''}`}>
            <nav className="navigation">
                <div className="logo">
                    <Link to="/">
                        <img className="logo-img" src={logo} alt="logo" />
                    </Link>
                </div>

                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>
                        <NavLink className="nav-link" to="/exerciselist">
                            Exercises
                        </NavLink>
                        <NavLink className="nav-link" to="/workoutspage">
                            Workouts
                        </NavLink>
                        <NavLink className="nav-link" to="/progresspage">
                            Progress
                        </NavLink>
                        <NavLink className="nav-link" to="/aboutpage">
                            About
                        </NavLink>
                    </li>
                </ul>
                {isLoggedIn ? (
                    <button
                        onClick={handleSignout}
                        className="logout-btn"
                        to="home">
                        Logout
                    </button>
                ) : (
                    <Link className="nav-btn" to="/loginpage">
                        Join here
                    </Link>
                )}
            </nav>
        </div>
    );
}
