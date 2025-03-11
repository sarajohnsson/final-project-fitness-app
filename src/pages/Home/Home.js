import { NavLink } from 'react-router-dom';
import Card from '../../components/ui/Card';

import './Home.scss';
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
                <div className="banner">
                    <Card />
                    <Card />
                    <Card />
                </div>
            </section>
            <section className="banner"></section>
        </>
    );
}
