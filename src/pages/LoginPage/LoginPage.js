import { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import './LoginPage.scss';

export default function LoginPage() {
    const [loginType, setLoginType] = useState('login');

    return (
        <div className="login-container">
            <section>
                <h1 className="login-title">Welcome to the Fitness App</h1>
                <p className="login-text">
                    Login or create an account to continue
                </p>
                <div className="login-type">
                    <Button
                        className={`account-btn ${
                            loginType === 'login' ? 'selected' : ''
                        }`}
                        title="Login"
                        onClick={() => setLoginType('login')}
                    />
                    <Button
                        className={`account-btn ${
                            loginType === 'signup' ? 'selected' : ''
                        }`}
                        title="Signup"
                        onClick={() => setLoginType('signup')}
                    />
                </div>
                <form className="add-form login">
                    <div className="form-control">
                        <label>Email*</label>
                        <Input
                            className="account-input"
                            name="email"
                            type="text"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-control">
                        <label>Password*</label>
                        <Input
                            className="account-input"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                        />
                    </div>

                    {loginType === 'login' ? (
                        <button className="active btn btn-block">Login</button>
                    ) : (
                        <button className="active btn btn-block">
                            Sign Up
                        </button>
                    )}
                </form>
            </section>
        </div>
    );
}
