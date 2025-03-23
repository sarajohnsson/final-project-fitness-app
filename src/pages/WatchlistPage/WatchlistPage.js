import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../../store/watchlistSlice';
import './WatchlistPage.scss';
import {
    Container,
    Grid2,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    IconButton,
    CardHeader,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';

// WATCHLIST
export default function Watchlist() {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.watchlist.favorites);

    const handleRemoveFavorites = (item) => {
        dispatch(removeFromFavorites(item));
    };

    return (
        <section className="watchlist-wrapper">
            <Container maxWidth="lg" className="watchlist-container">
                <h2 className="watchlist-title">Your favorite exercises</h2>
                {favorites.length === 0 ? (
                    <p className="watchlist-text">No favorites added yet.</p>
                ) : (
                    <Grid2 container spacing={3} className="watchlist-grid">
                        {favorites.map((item) => (
                            <Card className="favorite-card" key={item.id}>
                                <CardMedia
                                    sx={{ height: 194 }}
                                    image={`/assets/exercises/${item.images[0]}`}
                                />
                                <CardContent>
                                    <CardHeader title={item.name} />
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton
                                        size="small"
                                        onClick={() =>
                                            handleRemoveFavorites(item)
                                        }>
                                        <FontAwesomeIcon icon={faHeartCrack} />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        ))}
                    </Grid2>
                )}
            </Container>
        </section>
    );
}
