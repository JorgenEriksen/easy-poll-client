import { useState, useEffect } from "react";
import { css, cx, keyframes } from "@emotion/css";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";

import { TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const classes = {
  alternativeContainer: css`
    margin-top: 20px;
    display: flex;
    align-items: center;
  `,
  addAlternativeButtonContainer: css`
    width: 100%;
    display: flex;
    justify-content: center;
  `,
  marginTop: css`
    margin-top: 20px;
  `,
};

const AddEditQuestionDialog = ({
  openDialog,
  setOpenDialog,
  questions,
  setQuestions,
  editQuestionIndex,
}) => {
  const [questionText, setQuestionText] = useState("");
  const [alternatives, setAlternatives] = useState([]);

  useEffect(() => {
    if (!openDialog) return;

    if (editQuestionIndex >= 0) {
      const question = { ...questions[editQuestionIndex] };
      setQuestionText(question.questionText);
      setAlternatives(question.alternatives);
      return;
    }
    setQuestionText("");
    setAlternatives(["", ""]);
  }, [openDialog, editQuestionIndex]);

  const addAlternative = () => {
    const alternativesPlaceholder = [...alternatives];
    alternativesPlaceholder.push("");
    setAlternatives(alternativesPlaceholder);
  };

  const removeAlternative = (index) => {
    const alternativesPlaceholder = [...alternatives];
    alternativesPlaceholder.splice(index, 1);
    setAlternatives(alternativesPlaceholder);
  };

  const submit = () => {
    const questionsPlaceholder = [...questions];
    let newQuestionData = {
      questionText: questionText,
      alternatives: alternatives,
    };
    if (editQuestionIndex >= 0) {
      questionsPlaceholder[editQuestionIndex] = newQuestionData;
    } else {
      questionsPlaceholder.push(newQuestionData);
    }

    setQuestions(questionsPlaceholder);
    setOpenDialog(false);
  };

  const changeAlternative = (index, value) => {
    let alternativesPlaceholder = [...alternatives];
    alternativesPlaceholder[index] = value;
    setAlternatives(alternativesPlaceholder);
  };

  return (
    <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
      <DialogTitle>
        {editQuestionIndex >= 0 ? "Edit question" : "Create new question"}
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <div className={classes.alternativeTextField}>
          {alternatives.map((alternative, index) => (
            <div key={index} className={classes.alternativeContainer}>
              <TextField
                label={"Alternative " + (index + 1)}
                value={alternative}
                onChange={(e) => changeAlternative(index, e.target.value)}
              />
              <IconButton
                aria-label="delete"
                onClick={() => removeAlternative(index)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
        <div className={classes.marginTop}>
          <div className={classes.addAlternativeButtonContainer}>
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              onClick={addAlternative}
            >
              <AddIcon />
            </Fab>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={submit}>
          {editQuestionIndex >= 0 ? "Save changes" : "Add question"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditQuestionDialog;
