import { useEffect, useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import './LoginPage.scss';
import { auth } from '../../firebase/config.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/usersSlice.js';
import { useNavigate } from 'react-router-dom';
import { Alert, Container } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function LoginPage() {
    const dispatch = useDispatch();
    const [activeButton, setActiveButton] = useState(null);
    const [loginType, setLoginType] = useState('login');
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(
                    setUser({
                        id: user.uid,
                        email: user.email,
                    })
                );
            } else {
                dispatch(setUser(null));
            }
        });
        return () => unsubscribe();
    }, [dispatch]);

    function toggleButton(buttonName) {
        if (activeButton !== buttonName) {
            setActiveButton(buttonName);
        }
    }

    function selectLogin() {
        setLoginType('login');
        toggleButton('login');
    }

    function selectSignup() {
        setLoginType('signup');
        toggleButton('signup');
    }

    function handleCredentials(name, value) {
        setUserCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSignup(e) {
        e.preventDefault();
        setError('');
        createUserWithEmailAndPassword(
            auth,
            userCredentials.email,
            userCredentials.password
        )
            .then((userCredential) => {
                if (true) {
                    setSuccess(true);
                }
            })
            .catch((error) => {
                setError(error.message);
                setSuccess(false);
            });
    }

    function handleLogin(e) {
        e.preventDefault();
        setError('');
        signInWithEmailAndPassword(
            auth,
            userCredentials.email,
            userCredentials.password
        )
            .then((userCredential) => {
                if (true) {
                    setSuccess(true);
                }
            })
            .catch((error) => {
                setError(error.message);
                setSuccess(false);
            });
    }

    useEffect(() => {
        let timer;
        if (success) {
            timer = setTimeout(() => {
                navigate('/');
            }, 1000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [success, navigate]);

    return (
        <>
            <section className="login-wrapper">
                <Container maxWidth="lg" className="login-container">
                    <h2 className="login-title">Welcome to the Fitness App</h2>
                    <p className="login-text">
                        Login or create an account to continue
                    </p>
                    <div className="login-type">
                        <Button
                            className={`login-btn ${
                                activeButton === 'login'
                                    ? 'active selected'
                                    : ''
                            }`}
                            title="Login"
                            onClick={selectLogin}
                        />
                        <Button
                            className={`login-btn ${
                                activeButton === 'signup'
                                    ? 'active selected'
                                    : ''
                            }`}
                            title="Signup"
                            onClick={selectSignup}
                        />
                    </div>
                    <form className="add-form login">
                        <div className="login-form-control">
                            <label className="form-label">Email*</label>
                            <Input
                                onChangeFunction={(value) =>
                                    handleCredentials('email', value)
                                }
                                className="login-credentials"
                                name="email"
                                type="text"
                                placeholder="Enter your email"
                                value={userCredentials.email}
                            />
                            <label className="form-label">Password*</label>
                            <Input
                                onChangeFunction={(value) =>
                                    handleCredentials('password', value)
                                }
                                className="signup-credentials"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={userCredentials.password}
                            />
                        </div>

                        {loginType === 'login' ? (
                            <button
                                onClick={(e) => {
                                    handleLogin(e);
                                }}
                                className="submit-btn-active submit-btn login-btn-block">
                                Login
                            </button>
                        ) : (
                            <button
                                onClick={(e) => {
                                    handleSignup(e);
                                }}
                                className="submit-btn-active submit-btn login-btn-block">
                                Sign Up
                            </button>
                        )}

                        {error && <div className="error">{error}</div>}
                        {success && (
                            <Alert
                                icon={<FontAwesomeIcon icon={faCheck} />}
                                severity="success">
                                {loginType === 'login'
                                    ? 'Login successful!'
                                    : 'Signup successful!'}
                            </Alert>
                        )}
                    </form>
                </Container>
            </section>
        </>
    );
}
