import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import globalSnackbarReducer from './snackBarSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    globalSnackbar: globalSnackbarReducer,
  },
});
