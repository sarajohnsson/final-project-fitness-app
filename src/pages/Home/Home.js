import { NavLink } from 'react-router-dom';
import Card from '../../components/ui/Card';
import './Home.scss';
import backgroundImage from '../../assets/images/hero-section-bg.jpg';
import cardImg1 from '../../assets/images/hero-card-1.jpg';
import cardImg2 from '../../assets/images/hero-card-2.jpg';
import cardImg3 from '../../assets/images/hero-card-3.jpg';
import { Container, useMediaQuery, useTheme, Box } from '@mui/material';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { auth } from '../../firebase/config';

export default function Home() {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

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
                    <>
                        {/* SWIPER */}
                        <Swiper
                            className="my-swiper"
                            modules={[Pagination]}
                            loop={true}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                            }}
                            scrollbar={{ draggable: true }}
                            speed={800}
                            slidesPerView={1}
                            spaceBetween={20}
                            breakpoints={{
                                400: { slidesPerView: 1, spaceBetween: 20 },
                                600: { slidesPerView: 2, spaceBetween: 30 },
                                900: { slidesPerView: 3, spaceBetween: 40 },
                            }}
                            onSlideChange={() => console.log('slide change')}>
                            <SwiperSlide>
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
                                    to="/exercisedatabase"
                                />
                            </SwiperSlide>
                            <SwiperSlide>
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
                                    to="/progress"
                                />
                            </SwiperSlide>
                            <SwiperSlide>
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
                                    to="/favourites"
                                />
                            </SwiperSlide>
                        </Swiper>
                    </>
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
