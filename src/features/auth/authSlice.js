import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    role: null,
    id: null,
    name: null,
    eduInst: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.jwtToken;
            state.role = action.payload.roles[0];
            state.id = action.payload.stdId;
            state.name = action.payload.name;
            state.eduInst = action.payload.eduInst ?? null;
        },
        logout: (state) => {
            state.token = null;
            state.role = null;
            state.id = null;
            state.name = null;
            state.eduInst = null;
        },
        updateProfile: (state, action) => {
            state.name = action.payload.name;
            state.eduInst = action.payload.eduInst;
        },
    },
});

// Action creators are generated for each case reducer function
export const { login, logout, updateProfile } = authSlice.actions;

export default authSlice.reducer;
