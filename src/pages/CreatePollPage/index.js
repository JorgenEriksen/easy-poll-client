import { useState } from "react";
import { NavLink } from "react-router-dom";
import PaperWithIcon from "../../components/PaperWithIcon";
import QuestionsForm from "./components/QuestionsForm";

// mui
import { TextField, Button } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const CreatePollPage = () => {
  const [adminIsParticipating, setAdminIsParticipating] = useState(true);
  const [displayNameInput, setDisplayNameInput] = useState("");
  const [questions, setQuestions] = useState([]);

  return (
    <PaperWithIcon>
      <NavLink
        to={{
          pathname: "/",
        }}
      >
        Back
      </NavLink>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={adminIsParticipating}
              onChange={(e) => setAdminIsParticipating(e.target.checked)}
            />
          }
          label="I will also vote"
        />
      </FormGroup>
      {adminIsParticipating && <TextField label="DisplayName" />}
      <QuestionsForm questions={questions} setQuestions={setQuestions} />
    </PaperWithIcon>
  );
};

export default CreatePollPage;
