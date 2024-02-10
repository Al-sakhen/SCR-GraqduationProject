import { configureStore } from "@reduxjs/toolkit";
import { aspAPI } from "../services/aspiAPI";
import authSlice from "../features/auth/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import categoriesSlice from "../features/categories/categoriesSlice";

const persistAuth = {
    key: "auth",
    storage,
};

const persistedAuthReducer = persistReducer(persistAuth, authSlice);
export const store = configureStore({
    reducer: {
        // auth: authSlice,
        auth: persistedAuthReducer,

        // apis
        aspAPI: aspAPI.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            aspAPI.middleware
        ),
});

export const persistor = persistStore(store);
