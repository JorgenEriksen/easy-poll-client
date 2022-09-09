import { createContext, useContext, useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export const SnackbarContext = createContext({});

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

// severity must be: error, warning, info, success
export const SnackbarProvider = ({ children }) => {
  const [snack, setSnack] = useState({
    message: "",
    color: "",
    open: false,
  });

  const closeSnack = () =>
    setSnack({
      message: "",
      severity: "",
      open: false,
    });

  const openSnack = (message = "", severity = "info") =>
    setSnack({
      message: message,
      severity: severity,
      open: true,
    });

  const Alert = forwardRef((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <SnackbarContext.Provider
      value={{
        closeSnack,
        openSnack,
      }}
    >
      {children}
      <Snackbar open={snack.open} autoHideDuration={6000} onClose={closeSnack}>
        <Alert
          onClose={closeSnack}
          severity={snack.severity}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
