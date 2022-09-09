import { useState } from "react";
import { css } from "@emotion/css";

// mui
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Fab from "@mui/material/Fab";
import AddEditQuestionDialog from "./AddEditQuestionDialog";
import Typography from "@mui/material/Typography";

const QuestionsForm = ({ questions, setQuestions }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editQuestionIndex, setEditQuestionIndex] = useState(-1);

  const questionClick = (index) => {
    setEditQuestionIndex(index);
    setOpenDialog(true);
  };

  const addQuestionClick = () => {
    setEditQuestionIndex(-1);
    setOpenDialog(true);
  };

  const classes = {
    addQuestionContainer: css`
      width: 100%;
      display: flex;
      justify-content: center;
    `,
    createPollButtonContainer: css`
      width: 100%;
      display: flex;
      justify-content: flex-end;
    `,
  };

  return (
    <div style={{ minWidth: "350px" }}>
      <Typography variant="h6" component="h2">
        Questions
      </Typography>
      <List>
        {questions.map((question, index) => (
          <ListItem
            key={index}
            onClick={() => questionClick(index)}
            disablePadding
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton key={index}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>

              <ListItemText primary={question.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <div className={classes.addQuestionContainer}>
        <Fab
          size="small"
          color="primary"
          aria-label="add"
          onClick={addQuestionClick}
        >
          <AddIcon />
        </Fab>
      </div>

      <AddEditQuestionDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        setQuestions={setQuestions}
        questions={questions}
        editQuestionIndex={editQuestionIndex}
      />
    </div>
  );
};

export default QuestionsForm;
