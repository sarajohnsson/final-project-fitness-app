import { NavLink } from 'react-router-dom';
import Card from '../../components/ui/Card';

import './Home.scss';
import backgroundImage from '../../assets/images/hero-section-bg.jpg';
import cardImg1 from '../../assets/images/hero-card-1.jpg';
import cardImg2 from '../../assets/images/hero-card-2.jpg';
import cardImg3 from '../../assets/images/hero-card-3.jpg';

export default function Home() {
    return (
        <>
            <section className="hero-section">
                <div className="hero-container">
                    <article className="hero-info">
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
                        <NavLink className="hero-btn" to="/">
                            Get fit now
                        </NavLink>
                    </article>
                </div>
            </section>
            <section className="banner">
                <div className="banner-container">
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
                    />
                    <Card
                        cardClass="banner-card"
                        title="Custom workouts"
                        description="Build personalized routines that fit your lifestyle and goals."
                        cardTitleClass="banner-title"
                        cardTextClass="banner-desc"
                        image={cardImg2}
                        useBackgroundImage={true}
                        overlayClass="banner-gradient"
                        contentClass="banner-content"
                        buttonText="Start here"
                    />
                    <Card
                        cardClass="banner-card"
                        title="Track your progress"
                        description="Stay on top of your goals with real-time tracking and insights."
                        cardTitleClass="banner-title"
                        cardTextClass="banner-desc"
                        image={cardImg3}
                        useBackgroundImage={true}
                        overlayClass="banner-gradient"
                        contentClass="banner-content"
                        buttonText="Start here"
                    />
                </div>
            </section>
            <section className="subsection">
                <div
                    className="subsection-overlay"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}>
                    <div className="subsection-container">
                        <h2 className="subsection-desc">
                            Take your fitness journey to the next level
                            <span className="subsection-title-filled">
                                {' '}
                                with powerful tools designed to keep you
                                motivated
                            </span>{' '}
                            {''}and on track
                        </h2>
                    </div>
                </div>
            </section>
        </>
    );
}
