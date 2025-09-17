import { createSlice } from '@reduxjs/toolkit';

const redZoneSlice = createSlice({
  name: 'redZone',
  initialState: {
    isInRedZone: false, // default value
    isWarningDisplayed: false,
  },
  reducers: {
    setIsInRedZone(state, action) {
      state.isInRedZone = action.payload; // true or false
    },
    setWarningDisplayed(state, action) {
      state.isWarningDisplayed = action.payload; // true or false
    },
  },
});

export const { setIsInRedZone, setWarningDisplayed } = redZoneSlice.actions;
export default redZoneSlice.reducer;