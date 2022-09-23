import React from "react";

// mui
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

const ConfirmModal = ({
  dialogTitle,
  dialogText,
  openConfirmDialog,
  setOpenConfirmDialog,
  confirmFunction,
}) => {
  const handleClose = () => {
    setOpenConfirmDialog(false);
  };

  const confirmButton = () => {
    handleClose();
    confirmFunction();
  };

  return (
    <>
      <Dialog open={openConfirmDialog} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            No
          </Button>
          <Button onClick={confirmButton} variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmModal;
