import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slicers/authSlicer';

const preloadedState = {
    auth: {
        user: null,
        token: localStorage.getItem('token') || null,
        isAuthenticated: !!localStorage.getItem('token'),
    },
};

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    preloadedState,
});

export default store;
