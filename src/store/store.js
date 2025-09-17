import { configureStore } from '@reduxjs/toolkit';
import redZoneReducer from './redZoneSlice';

export const store = configureStore({
  reducer: {
    redZone: redZoneReducer,
  },
});