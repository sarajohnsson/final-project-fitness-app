import { NavLink } from 'react-router-dom';
import Card from '../../components/ui/Card';
import './Home.scss';
import heroImg from '../../assets/images/hero-img.jpg';
import subsectionImg from '../../assets/images/hero-section-bg.jpg';
import cardImg1 from '../../assets/images/hero-card-1.jpg';
import cardImg2 from '../../assets/images/hero-card-2.jpg';
import cardImg3 from '../../assets/images/hero-card-3.jpg';
import { Container, useMediaQuery, useTheme, Box } from '@mui/material';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { auth } from '../../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectUsers } from '../../store/usersSlice';
import { useEffect } from 'react';

export default function Home() {
    // User credentials
    const dispatch = useDispatch();
    const user = useSelector(selectUsers);
    const isLoggedIn = user?.currentUser;

    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(
                    setUser({
                        uid: user.uid,
                        email: user.email,
                    })
                );
            } else {
                dispatch(setUser(null));
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    return (
        <>
            <section
                className="hero-section hero-overlay"
                style={{
                    backgroundColor: '#000',
                    backgroundImage: `url(${heroImg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: '100%',
                }}>
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
                        {isLoggedIn ? (
                            <NavLink
                                className="hero-btn"
                                to="/exercisedatabase">
                                Get fit now
                            </NavLink>
                        ) : (
                            <NavLink className="hero-btn" to="/login">
                                Get fit now
                            </NavLink>
                        )}
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
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                            }}
                            scrollbar={{ draggable: true }}
                            speed={800}
                            slidesPerView={1}
                            spaceBetween={20}
                            lazy={true}
                            breakpoints={{
                                400: { slidesPerView: 1, spaceBetween: 20 },
                                600: { slidesPerView: 2, spaceBetween: 30 },
                                900: { slidesPerView: 3, spaceBetween: 40 },
                            }}>
                            <SwiperSlide>
                                <Card
                                    cardClass="banner-card"
                                    title="Extensive database"
                                    description="Access a vast collection of workouts tailored to your needs."
                                    cardTitleClass="banner-title"
                                    cardTextClass="banner-desc"
                                    image={cardImg1}
                                    useBackgroundImage={true}
                                    useTilt={false}
                                    overlayClass="banner-gradient"
                                    contentClass="banner-content"
                                    to="/exercisedatabase"
                                    loading="lazy"
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
                                    useTilt={false}
                                    overlayClass="banner-gradient"
                                    contentClass="banner-content"
                                    to="/progress"
                                    loading="lazy"
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
                                    useTilt={false}
                                    overlayClass="banner-gradient"
                                    contentClass="banner-content"
                                    to="/favourites"
                                    loading="lazy"
                                />
                            </SwiperSlide>
                        </Swiper>
                    </>
                </Container>
            </section>
            <section
                className="subsection subsection-overlay"
                style={{
                    backgroundImage: `url(${subsectionImg})`,
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
