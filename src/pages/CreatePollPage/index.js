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
import { useAuth } from "../../hooks/auth";

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
  const auth = useAuth();
  const [adminIsParticipating, setAdminIsParticipating] = useState(true);
  const [displayNameInput, setDisplayNameInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([
    {
      title: "Where to eat?",
      questionAlternatives: ["Peppes", "Dominos"],
    },
    { title: "How many pizzas?", questionAlternatives: ["1", "2", "3"] },
    {
      title: "What to drink?",
      questionAlternatives: ["Pepsi", "Solo", "Sprite", "7up"],
    },
  ]);

  const createPollGame = () => {
    const body = {
      adminIsParticipating: adminIsParticipating,
      hasStarted: false,
      adminUser: {
        displayName: displayNameInput,
      },
      questions: questions.map((question) => {
        const alternatives = question.questionAlternatives.map((a) => {
          return { alternativeText: a };
        });
        question.questionAlternatives = alternatives;
        return question;
      }),
    };
    console.log(body);
    setIsLoading(true);
    createNewPollToAPI(body)
      .then((e) => {
        console.log(e.accessToken);
        setIsLoading(false);
        auth.login(e.accessToken, true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
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
        value={displayNameInput}
        onChange={(e) => setDisplayNameInput(e.target.value)}
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
          disabled={isLoading}
        >
          Create
        </Button>
      </div>
    </PaperWithIcon>
  );
};

export default CreatePollPage;
