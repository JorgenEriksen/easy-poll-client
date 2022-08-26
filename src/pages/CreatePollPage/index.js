import { useState } from "react";
import { NavLink } from "react-router-dom";
import { css, cx, keyframes } from "@emotion/css";
import PaperWithIcon from "../../components/PaperWithIcon";
import QuestionsForm from "./components/QuestionsForm";
import Divider from "@mui/material/Divider";
import PollIcon from "@mui/icons-material/Poll";
import { createNewPollToAPI } from "../../utils/apiRequests";

// mui
import { TextField, Button } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const classes = {
  width100: css`
    width: 100%;
  `,
  createPollButtonContainer: css`
    width: 100%;
    display: flex;
    justify-content: flex-end;
  `,
};

const CreatePollPage = () => {
  const [adminIsParticipating, setAdminIsParticipating] = useState(true);
  const [displayNameInput, setDisplayNameInput] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "Where to eat?", alternatives: ["one", "two"] },
  ]);

  const createPollGame = () => {
    const body = {
      hasStarted: false,
      adminIsParticipating: adminIsParticipating,
      adminUser: {
        displayName: displayNameInput,
      },
      questions: questions.map((question) => {
        const alternatives = question.alternatives.map((a) => {
          return { alternativeText: a };
        });
        question.alternatives = alternatives;
        return question;
      }),
    };
    console.log(body);
  };

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
      <TextField
        label="DisplayName"
        disabled={!adminIsParticipating}
        className={classes.width100}
      />
      <br />
      <br />
      <QuestionsForm questions={questions} setQuestions={setQuestions} />
      <br />
      <br />
      <Divider />
      <br />
      <div className={classes.createPollButtonContainer}>
        <Button
          variant="contained"
          startIcon={<PollIcon />}
          onClick={createPollGame}
        >
          Create
        </Button>
      </div>
    </PaperWithIcon>
  );
};

export default CreatePollPage;
