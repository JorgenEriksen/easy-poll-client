import { useState } from "react";

// mui
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddEditQuestionForm from "./AddEditQuestionForm";

const QuestionsForm = () => {
  const [openModel, setOpenModel] = useState(true);

  return (
    <div>
      <Button variant="contained" startIcon={<AddIcon />}>
        Add
      </Button>

      <Dialog onClose={() => setOpenModel(false)} open={openModel}>
        <DialogContent>
          <AddEditQuestionForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuestionsForm;
