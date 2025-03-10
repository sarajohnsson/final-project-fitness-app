import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;
        },
        logoutUser: (state) => {
            state.currentUser = null;
        },
    },
});

export const { setUser, logoutUser } = usersSlice.actions;

export const selectUsers = (state) => state.users; // Ensure this is correctly named

export default usersSlice.reducer;
