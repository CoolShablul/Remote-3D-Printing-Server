import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fileToPrint: null,
    slicerSettings: null,
    isPrinting: false,
};

const printerSlicer = createSlice({
    name: 'printer',
    initialState,
    reducers:{
        startPrinting: (state, action) => {
            state.fileToPrint = action.payload.fileToPrint
            state.printerConfig = action.payload.slicerSettings
        }
    },
});

export const { startPrinting } = printerSlicer.actions;
export default printerSlicer.reducer;
