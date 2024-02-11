import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from './imagesSlice';
export const imagesStore = configureStore({
    reducer: {
        images: imagesReducer
    }
})

export type rootState = ReturnType<typeof imagesStore.getState>
export type AppDispatch = typeof imagesStore.dispatch