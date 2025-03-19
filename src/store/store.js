import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import watchlistReducer from './watchlistSlice';

export default configureStore({
    reducer: {
        users: usersReducer,
        watchlist: watchlistReducer,
    },
});
