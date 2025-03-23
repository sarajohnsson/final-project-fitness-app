import { Container, Grid2, TextField, Alert } from '@mui/material';
import './AboutPage.scss';
import Button from '../../components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

export default function AboutPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setEmailError('');

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        try {
            await addDoc(collection(db, 'contacts'), {
                name: name,
                email: email,
                message: message,
            });
            setSubmissionStatus('success');
        } catch (error) {
            setSubmissionStatus('error');
        }

        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <section className="about-wrapper">
            <h2 className="about-title">About us</h2>
            <Container maxWidth="lg" className="about-container">
                <div className="info-container">
                    <p className="about-desc">
                        Welcome to Iron Hub, your all-in-one fitness companion
                        designed to help you stay on track, set goals, and push
                        your limits—anytime, anywhere. Whether you're a beginner
                        or a seasoned athlete, we provide the tools you need to
                        build the best version of yourself.
                    </p>
                    <h3 className="about-subtitle">What We Offer</h3>
                    <ul className="about-list">
                        <li>
                            <FontAwesomeIcon
                                className="about-icon"
                                icon={faBolt}
                            />
                            Exercise Database - Discover a wide range of
                            exercises to suit any fitness level and goal.
                        </li>
                        <li>
                            <FontAwesomeIcon
                                className="about-icon"
                                icon={faBolt}
                            />
                            Progress Tracking - Stay motivated by creating
                            personalized workout routines that fit your
                            lifestyle.
                        </li>
                        <li>
                            <FontAwesomeIcon
                                className="about-icon"
                                icon={faBolt}
                            />
                            Save Favorites - Keep track of your go-to exercises
                            and workouts for easy access.
                        </li>
                    </ul>
                    <p className="about-desc">
                        At Iron Hub, we believe fitness should be simple,
                        accessible, and empowering. Start your journey today and
                        take control of your health - one workout at a time!
                    </p>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <h3 className="contact-form-title">Contact form</h3>
                    <Grid2 xs={12} sm={6} item>
                        <TextField
                            className="about-field"
                            label="Full name"
                            placeholder="Enter full name"
                            variant="filled"
                            fullWidth
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid2>
                    <Grid2 xs={12} item>
                        <TextField
                            className="about-field"
                            type="email"
                            label="Email"
                            placeholder="Enter email"
                            variant="filled"
                            fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!emailError}
                            helperText={emailError}
                        />
                    </Grid2>
                    <Grid2 xs={12} item>
                        <TextField
                            className="about-field"
                            label="Message"
                            multiline
                            rows={4}
                            placeholder="Enter email"
                            variant="filled"
                            fullWidth
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </Grid2>
                    <Grid2 xs={12} item>
                        <Button type="submit" className="contact-btn">
                            Submit
                        </Button>
                    </Grid2>

                    {submissionStatus === 'success' && (
                        <Alert severity="success">
                            Message has been submitted.
                        </Alert>
                    )}
                    {submissionStatus === 'error' && (
                        <Alert severity="error">An error occured.</Alert>
                    )}
                </form>
            </Container>
        </section>
    );
}
