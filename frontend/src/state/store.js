import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slicers/authSlicer';
import printerReducer from './slicers/printerSlicer';

const preloadedState = {
    auth: {
        user: null,
        token: localStorage.getItem('token') || null,
        isAuthenticated: !!localStorage.getItem('token'),
    },
    printer: {
        fileToPrint: null,
        slicerSettings: null,
        isPrinting: false,
    }
};

const store = configureStore({
    reducer: {
        auth: authReducer,
        printer: printerReducer,
    },
    preloadedState,
});

export default store;
