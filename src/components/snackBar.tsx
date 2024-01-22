import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {
  AlertProps as MuiAlertProps,
} from '@mui/material/Alert';

interface Props {
  opensnackbar: {
    setopen: boolean;
    message: string;
    severity: any;
    duration: null;
  };
  handleClose: any;
}

const Alert = React.forwardRef<HTMLDivElement, MuiAlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

function ErrorSnackBar(props: Props) {
  const { opensnackbar, handleClose } = props;
  return (
    <div>
      {!!opensnackbar && !!opensnackbar.message && (
        <Snackbar
          open={opensnackbar.setopen}
          autoHideDuration={
            opensnackbar.duration ? opensnackbar.duration : 4000
          }
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Alert
            onClose={handleClose}
            severity={opensnackbar.severity}
            sx={{ width: '100%' }}
          >
            {opensnackbar.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

export default ErrorSnackBar;
