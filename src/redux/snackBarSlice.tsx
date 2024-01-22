import { AlertColor } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

const snackBarSlice = createSlice({
  name: 'globalSnackbar',
  initialState: {
    setopen: false,
    message: '',
    severity: 'info', // or any other default value
    duration: null,
  },
  reducers: {
    showSnackBar: (state, action) => {
      const { setopen, message, severity, duration } = action.payload;
      state.setopen = setopen;
      state.message = message;
      state.severity = severity ;;
      state.duration = duration;
    },
  },
});

export const { showSnackBar } = snackBarSlice.actions;
export default snackBarSlice.reducer;
