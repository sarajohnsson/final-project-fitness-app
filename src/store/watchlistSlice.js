import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('favorites');
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.error('Could not load favorites from local storage');
        return [];
    }
};

const saveFavoritesToLocalStorage = (favorites) => {
    try {
        const serializedState = JSON.stringify(favorites);
        localStorage.setItem('favorites', serializedState);
    } catch (e) {
        console.error('Could not save favorites from local storaged');
    }
};

const initialState = {
    favorites: loadFavoritesFromLocalStorage(),
};

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            state.favorites.push(action.payload);
            saveFavoritesToLocalStorage(state.favorites);
        },
        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter(
                (item) => item.id !== action.payload.id
            );
            saveFavoritesToLocalStorage(state.favorites);
        },
    },
});

export const { addToFavorites, removeFromFavorites } = watchlistSlice.actions;
export default watchlistSlice.reducer;
