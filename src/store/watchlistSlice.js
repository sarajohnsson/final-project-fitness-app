import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: [],
};

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            state.favorites.push(action.payload);
        },
        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter(
                (item) => item.id !== action.payload.id
            );
        },
    },
});

export const { addToFavorites, removeFromFavorites } = watchlistSlice.actions;
export default watchlistSlice.reducer;
