import { NavLink } from 'react-router-dom';
import Button from './ui/Button';

export default function Navbar() {
    return (
        <nav className="navigation">
            <div className="logo">
                <NavLink to="/">Logo</NavLink>
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
                title="Join here"
                onClick={() => console.log('Button clicked')}
            />
        </nav>
    );
}
