import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../../store/watchlistSlice';
import './WatchlistPage.scss';
import {
    Container,
    Grid2,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActions,
    Collapse,
    IconButton,
    styled,
    CardHeader,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';

// MUI COMPONENT
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

// WATCHLIST
export default function Watchlist() {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.watchlist.favorites);

    const handleRemoveFavorites = (item) => {
        dispatch(removeFromFavorites(item));
    };

    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Container maxWidth="lg" className="watchlist-wrapper">
            <h2>Your favorite exercises</h2>
            {favorites.length === 0 ? (
                <p>No favorites added yet.</p>
            ) : (
                <Grid2 container spacing={2} className="watchlist-grid">
                    {favorites.map((item) => (
                        <Card
                            className="favorite-card"
                            sx={{ maxWidth: 345 }}
                            key={item.id}>
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
                                    onClick={() => handleRemoveFavorites(item)}>
                                    <FontAwesomeIcon icon={faHeartCrack} />
                                </IconButton>
                                <ExpandMore
                                    expand={expanded}
                                    onClick={() => handleExpandClick(item)}
                                    aria-expanded={expanded}
                                    aria-label="show more">
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse
                                in={expanded}
                                timeout="auto"
                                unmountOnExit>
                                <CardContent>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            marginBottom: 2,
                                        }}>
                                        {item.instructions}
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    ))}
                </Grid2>
            )}
        </Container>
    );
}
