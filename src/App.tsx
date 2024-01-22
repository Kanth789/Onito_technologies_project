import React from "react";
import Home from "./components";
import ErrorSnackBar from "./components/snackBar";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "./redux/snackBarSlice";
import store from "./redux/store";
import './App.css'

const App: React.FC = () => {
  type RootState = ReturnType<typeof store.getState>;
  const dispatch = useDispatch()
  const snackBarShow = useSelector((state:RootState) => state.globalSnackbar);
  const handleClose = (event, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(
      showSnackBar({
        setopen: false,
        message: '',
        severity: '',
      })
    );
  };
  
  return (
    <>
      <Home />
      <ErrorSnackBar opensnackbar={snackBarShow} handleClose={handleClose} />
    </>
  );
};

export default App;
