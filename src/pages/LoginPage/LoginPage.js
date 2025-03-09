import { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import './LoginPage.scss';

import { auth } from '../../firebase/config.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';

export default function LoginPage() {
    const [activeButton, setActiveButton] = useState(null);
    const [loginType, setLoginType] = useState('login');
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
    });

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
        console.log(userCredentials);
    }

    function handleSignup(e) {
        e.preventDefault();
        createUserWithEmailAndPassword(
            auth,
            userCredentials.email,
            userCredentials.password
        )
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    function handleLogin(e) {
        e.preventDefault();
        signInWithEmailAndPassword(
            auth,
            userCredentials.email,
            userCredentials.password
        )
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    return (
        <div className="login-container">
            <section>
                <h2 className="login-title">Welcome to the Fitness App</h2>
                <p className="login-text">
                    Login or create an account to continue
                </p>
                <div className="login-type">
                    <Button
                        className={`login-btn ${
                            activeButton === 'login' ? 'active selected' : ''
                        }`}
                        title="Login"
                        onClick={selectLogin}
                    />
                    <Button
                        className={`login-btn ${
                            activeButton === 'signup' ? 'active selected' : ''
                        }`}
                        title="Signup"
                        onClick={selectSignup}
                    />
                </div>
                <form className="add-form login">
                    <div className="form-control">
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
                    </div>
                    <div className="form-control">
                        <label className="form-label">Password*</label>
                        <Input
                            onChangeFunction={(value) =>
                                handleCredentials('password', value)
                            }
                            className="login-credentials"
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
                </form>
            </section>
        </div>
    );
}
