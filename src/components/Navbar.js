import { NavLink, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectUsers } from '../store/usersSlice';
import logo from '../assets/gym-logo.png';
import './Navbar.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightFromBracket,
    faFireFlameCurved,
    faHouse,
    faHeart,
    faDumbbell,
    faChartLine,
    faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import {
    BottomNavigation,
    BottomNavigationAction,
    Container,
    useMediaQuery,
    useTheme,
} from '@mui/material';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    // User credentials
    const dispatch = useDispatch();
    const user = useSelector(selectUsers);
    const isLoggedIn = user?.currentUser;
    // Responsive navigation
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const userData = {
                    uid: user.uid,
                    email: user.email,
                };
                dispatch(setUser(userData));
            } else {
                dispatch(setUser(null));
            }
        });

        if (!isMediumScreen) {
            const handleScroll = () => {
                if (window.scrollY > 50) {
                    setScrolled(true);
                } else {
                    setScrolled(false);
                }
            };

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }

        return () => unsubscribe();
    }, [isMediumScreen, dispatch]);

    function handleSignout() {
        if (window.confirm('Are you sure you want to log out')) {
            signOut(auth)
                .then(() => {
                    // Sign-out successful.
                    dispatch(setUser(null));
                })
                .catch((error) => {
                    // An error happened.
                    console.error('Could not sign out', error);
                });
        }
    }

    return (
        <div
            className={`nav-wrapper ${
                scrolled && !isMediumScreen ? 'scrolled' : ''
            }`}>
            <Container maxWidth="lg">
                {isMediumScreen && (
                    <Container maxWidth="m" className="logo-container">
                        <Link size="small" to="/">
                            <img className="logo-img" src={logo} alt="logo" />
                        </Link>
                        {isLoggedIn ? (
                            <button
                                onClick={handleSignout}
                                className="logout-btn"
                                to="home">
                                <span className="action">Logout</span>
                                <FontAwesomeIcon
                                    className="logout-icon"
                                    icon={faArrowRightFromBracket}
                                />
                            </button>
                        ) : (
                            <Link className="nav-btn" to="/login">
                                <span className="action">Join here</span>
                                <FontAwesomeIcon
                                    className="join-icon"
                                    icon={faFireFlameCurved}
                                />
                            </Link>
                        )}
                    </Container>
                )}
                {!isMediumScreen ? (
                    <nav className="navigation">
                        <Link size="small" to="/">
                            <img className="logo-img" src={logo} alt="logo" />
                        </Link>

                        <ul className="nav-list">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Home
                                </NavLink>
                                <NavLink
                                    className="nav-link"
                                    to="/exercisedatabase">
                                    Exercises
                                </NavLink>
                                <NavLink className="nav-link" to="/progress">
                                    Progress
                                </NavLink>
                                <NavLink className="nav-link" to="/favorites">
                                    Favourites
                                </NavLink>
                                <NavLink className="nav-link" to="/about">
                                    About
                                </NavLink>
                            </li>
                        </ul>
                        {isLoggedIn ? (
                            <button
                                onClick={handleSignout}
                                className="logout-btn"
                                to="home">
                                <span className="action">Logout</span>
                                <FontAwesomeIcon
                                    className="logout-icon"
                                    icon={faArrowRightFromBracket}
                                />
                            </button>
                        ) : (
                            <Link className="nav-btn" to="/login">
                                <span className="action">Join here</span>
                                <FontAwesomeIcon
                                    className="join-icon"
                                    icon={faFireFlameCurved}
                                />
                            </Link>
                        )}
                    </nav>
                ) : (
                    <div className="bottom-container">
                        <BottomNavigation
                            showLabels
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            className="bottom-nav">
                            <BottomNavigationAction
                                label="Home"
                                icon=<FontAwesomeIcon icon={faHouse} />
                                component={Link}
                                to="/"
                                value="/"
                                sx={{
                                    '&:not(.Mui-selected)': {
                                        color: '#dee2e6',
                                    },
                                    '&.Mui-selected': {
                                        color: '#fa6f19',
                                    },
                                    minWidth: 'auto',
                                }}
                            />
                            <BottomNavigationAction
                                label="Exercises"
                                icon=<FontAwesomeIcon icon={faDumbbell} />
                                component={Link}
                                to="/exercisedatabase"
                                value="/exercisedatabase"
                                sx={{
                                    '&:not(.Mui-selected)': {
                                        color: '#dee2e6',
                                    },
                                    '&.Mui-selected': {
                                        color: '#fa6f19',
                                    },
                                    minWidth: 'auto',
                                }}
                            />
                            <BottomNavigationAction
                                label="Progress"
                                icon=<FontAwesomeIcon icon={faChartLine} />
                                component={Link}
                                to="/progress"
                                value="/progress"
                                sx={{
                                    '&:not(.Mui-selected)': {
                                        color: '#dee2e6',
                                    },
                                    '&.Mui-selected': {
                                        color: '#fa6f19',
                                    },
                                    minWidth: 'auto',
                                }}
                            />
                            <BottomNavigationAction
                                label="Favorites"
                                icon=<FontAwesomeIcon icon={faHeart} />
                                component={Link}
                                to="/favorites"
                                value="/favorites"
                                sx={{
                                    '&:not(.Mui-selected)': {
                                        color: '#dee2e6',
                                    },
                                    '&.Mui-selected': {
                                        color: '#fa6f19',
                                    },
                                    minWidth: 'auto',
                                }}
                            />
                            <BottomNavigationAction
                                label="About"
                                icon=<FontAwesomeIcon icon={faCircleInfo} />
                                component={Link}
                                to="/about"
                                value="/about"
                                sx={{
                                    '&:not(.Mui-selected)': {
                                        color: '#dee2e6',
                                    },
                                    '&.Mui-selected': {
                                        color: '#fa6f19',
                                    },
                                    minWidth: 'auto',
                                }}
                            />
                        </BottomNavigation>
                    </div>
                )}
            </Container>
        </div>
    );
}
