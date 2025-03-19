import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: null,
    },
    reducers: {
        setUser: (state, action) => {
            if (action.payload) {
                const { uid, email } = action.payload;
                state.currentUser = { uid, email };
            } else {
                state.currentUser = null;
            }
        },
    },
});

export const { setUser } = usersSlice.actions;
export const selectUsers = (state) => state.users;
export default usersSlice.reducer;
