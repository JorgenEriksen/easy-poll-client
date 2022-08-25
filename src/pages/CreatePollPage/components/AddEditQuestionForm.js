import { useState } from "react";
import { css, cx, keyframes } from "@emotion/css";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const classes = {
  marginTop: css`
    margin-top: 20px;
  `,
};

const AddEditQuestionForm = () => {
  const [alternatives, setAlternatives] = useState(["hey", "asd"]);

  const addAlternative = () => {
    const alternativesPlaceholder = [...alternatives];
    alternativesPlaceholder.push("");
    setAlternatives(alternativesPlaceholder);
  };

  return (
    <>
      <TextField label="Question" />
      <div className={classes.alternativeTextField}>
        {alternatives.map((alternative, index) => (
          <div key={index} className={classes.marginTop}>
            <TextField
              label={"alternative " + (index + 1)}
              value={alternative}
            />
          </div>
        ))}
      </div>
      <div className={classes.marginTop}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addAlternative}
        >
          Add Alternative
        </Button>
      </div>
    </>
  );
};

export default AddEditQuestionForm;
