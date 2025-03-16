import { NavLink } from 'react-router-dom';
import Card from '../../components/ui/Card';
import './Home.scss';
import backgroundImage from '../../assets/images/hero-section-bg.jpg';
import cardImg1 from '../../assets/images/hero-card-1.jpg';
import cardImg2 from '../../assets/images/hero-card-2.jpg';
import cardImg3 from '../../assets/images/hero-card-3.jpg';
import {
    Container,
    useMediaQuery,
    useTheme,
    Box,
    IconButton,
} from '@mui/material';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleChevronRight,
    faCircleChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
export default function Home() {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [activeCard, setActiveCard] = useState(0);

    const cards = [
        {
            cardId: 1,
            title: 'Extensive database',
            description:
                'Access a vast collection of workouts tailored to your needs.',
            image: cardImg1,
            to: '/exercisedatabase',
        },
        {
            cardId: 2,
            title: 'Custom workouts',
            description:
                'Build personalized routines that fit your lifestyle and goals.',
            image: cardImg2,
            to: '/progress',
        },
        {
            cardId: 3,
            title: 'Build your routine',
            description:
                'Save and organize your go-to exercises for easy access.',
            image: cardImg3,
            to: '/favourites',
        },
    ];

    const handleNext = () => {
        setActiveCard((prevIndex) => (prevIndex + 1) % cards.length);
    };

    const handlePrevious = () => {
        setActiveCard((prevIndex) =>
            prevIndex === 0 ? cards.length - 1 : prevIndex - 1
        );
    };

    return (
        <>
            <section className="hero-section">
                <Container maxWidth="lg" className="hero-container">
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems={isMediumScreen ? 'center' : 'flex-start'}
                        textAlign={isMediumScreen ? 'center' : 'left'}
                        className="hero-info">
                        <h1 className="hero-title">
                            Transform
                            <span className="hero-title-filled">
                                {' '}
                                your fitness journey
                            </span>
                        </h1>
                        <p className="hero-desc">
                            Track workouts, set goals, and stay motivated -
                            anytime, anywhere. Start today and build the best
                            version of yourself!
                        </p>
                        <NavLink className="hero-btn" to="/login">
                            Get fit now
                        </NavLink>
                    </Box>
                </Container>
            </section>
            <section className="banner">
                <Container maxWidth="lg" className="banner-container">
                    {isMediumScreen ? (
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            gap={2}>
                            <IconButton
                                onClick={handlePrevious}
                                className="carousel-btn">
                                <FontAwesomeIcon icon={faCircleChevronLeft} />
                            </IconButton>
                            <Card
                                cardClass="banner-card"
                                title={cards[activeCard].title}
                                description={cards[activeCard].description}
                                cardTitleClass="banner-title"
                                cardTextClass="banner-desc"
                                image={cards[activeCard].image}
                                useBackgroundImage={true}
                                overlayClass="banner-gradient"
                                contentClass="banner-content"
                                buttonText="Start here"
                                to={cards[activeCard].to}
                            />
                            <IconButton
                                onClick={handleNext}
                                className="carousel-btn">
                                <FontAwesomeIcon icon={faCircleChevronRight} />
                            </IconButton>
                        </Box>
                    ) : (
                        <>
                            <Card
                                cardClass="banner-card"
                                title="Extensive database"
                                description="Access a vast collection of workouts tailored to your needs."
                                cardTitleClass="banner-title"
                                cardTextClass="banner-desc"
                                image={cardImg1}
                                useBackgroundImage={true}
                                overlayClass="banner-gradient"
                                contentClass="banner-content"
                                buttonText="Start here"
                                to="/exercisedatabase"
                            />
                            <Card
                                cardClass="banner-card"
                                title="Track your progress"
                                description="Build personalized routines that fit your lifestyle and goals."
                                cardTitleClass="banner-title"
                                cardTextClass="banner-desc"
                                image={cardImg2}
                                useBackgroundImage={true}
                                overlayClass="banner-gradient"
                                contentClass="banner-content"
                                buttonText="Start here"
                                to="/progress"
                            />
                            <Card
                                cardClass="banner-card"
                                title="Build your routine"
                                description="Save and organize your go-to exercises for easy access."
                                cardTitleClass="banner-title"
                                cardTextClass="banner-desc"
                                image={cardImg3}
                                useBackgroundImage={true}
                                overlayClass="banner-gradient"
                                contentClass="banner-content"
                                buttonText="Start here"
                                to="/favourites"
                            />
                        </>
                    )}
                </Container>
            </section>
            <section
                className="subsection subsection-overlay"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}>
                <Container maxWidth="lg" className="subsection-container">
                    <h2 className="subsection-desc">
                        Take your fitness journey to the next level
                        <span className="subsection-title-filled">
                            {' '}
                            with powerful tools designed to keep you motivated
                        </span>{' '}
                        {''}and on track
                    </h2>
                </Container>
            </section>
        </>
    );
}
