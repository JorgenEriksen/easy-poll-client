import { useState } from "react";
import { NavLink } from "react-router-dom";
import { css } from "@emotion/css";
import PaperBoxWithIcon from "../../components/PaperBoxWithIcon";
import QuestionsForm from "./components/QuestionsForm";
import Divider from "@mui/material/Divider";
import PollIcon from "@mui/icons-material/Poll";
import { createNewPollAPI } from "../../utils/apiRequests";
import { useNavigate } from "react-router-dom";

// mui
import { TextField, Button } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useAuth } from "../../hooks/useAuth";
import LinearProgress from "@mui/material/LinearProgress";
import ButtonWithLoader from "../../components/ButtonWithLoader";

const classes = {
  displayNameInputContainer: css`
    width: 100%;
    margin-top: 20px;
    margin-bottom: 15px;
  `,
  width100: css`
    width: 100%;
  `,

  createPollButtonContainer: css`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  `,
};

const CreatePollPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
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
    setIsLoading(true);
    createNewPollAPI(body)
      .then((userData) => {
        setIsLoading(false);
        login(userData);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <PaperBoxWithIcon>
      <NavLink
        to={{
          pathname: "/",
        }}
      >
        Back
      </NavLink>
      <div className={classes.displayNameInputContainer}>
        <TextField
          label="DisplayName"
          className={classes.width100}
          value={displayNameInput}
          onChange={(e) => setDisplayNameInput(e.target.value)}
        />
      </div>
      <QuestionsForm questions={questions} setQuestions={setQuestions} />
      <Divider />
      <div className={classes.createPollButtonContainer}>
        <ButtonWithLoader
          startIcon={<PollIcon />}
          onClick={createPollGame}
          isLoading={isLoading}
        >
          Create poll
        </ButtonWithLoader>
      </div>
    </PaperBoxWithIcon>
  );
};

export default CreatePollPage;
