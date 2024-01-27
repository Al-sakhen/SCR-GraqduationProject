import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    role: null,
    id: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.jwtToken;
            state.role = action.payload.roles[0];
            state.id = action.payload.stdId;
        },
        logout: (state) => {
            state.token = null;
            state.role = null;
            state.id = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
