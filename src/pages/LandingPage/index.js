import { useState } from "react";
import { css } from "@emotion/css";
import { NavLink } from "react-router-dom";
import PaperBoxWithIcon from "../../components/PaperBoxWithIcon";
import {
  authenticateInviteCodeAPI,
  joinPollGameAPI,
} from "../../utils/apiRequests";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import { TextField, Button } from "@mui/material";
import ButtonWithLoader from "../../components/ButtonWithLoader";
import "./index.css";

const classes = {
  landingContainer: css`
    max-width: 100%;
    max-height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    padding-top: 80px;
    padding-left: 20px;
    padding-right: 20px;
  `,
  logo: css`
    margin-bottom: 40px;
    max-height: 200px;
    width: auto;
    @media (max-width: 480px) {
      max-height: 100px;
    }
  `,
  landingEnterButton: {
    width: "100%",
    marginTop: "20px",
  },
  landingFrontbox: css`
    background-color: white;
    padding: 20px;
    max-width: 400px;
    border-radius: "10px";
  `,
};

const LandingPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { openSnack } = useSnackbar();
  const [displayNameInput, setDisplayNameInput] = useState("");
  const [inviteCodeInput, setInviteCodeInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const enterInviteCodeButton = () => {
    if (inviteCodeInput.length < 1) {
      openSnack("Invite code can't be empty", "warning");
      return;
    }
    if (inviteCodeInput.length !== 6) {
      openSnack("Invite code needs to be six characters long", "warning");
      return;
    }

    setIsLoading(true);
    authenticateInviteCodeAPI(inviteCodeInput)
      .then(() => {
        setStep(2);
        setIsLoading(false);
      })
      .catch((error) => {
        openSnack(error.message, "warning");
        setIsLoading(false);
      });
  };

  const enterDisplayNameButton = () => {
    if (displayNameInput.length < 1) {
      openSnack("Display name can't be empty", "warning");
      return;
    }
    setIsLoading(true);
    joinPollGameAPI({
      displayName: displayNameInput,
      inviteCode: inviteCodeInput,
    })
      .then((userData) => {
        setIsLoading(false);
        login(userData);
        navigate("/");
      })
      .catch((error) => {
        openSnack(error.message, "error");
        setIsLoading(false);
      });
  };

  return (
    <PaperBoxWithIcon>
      <NavLink
        to={{
          pathname: "/create-poll",
        }}
      >
        Create new poll?
      </NavLink>
      {step === 1 ? (
        <Collapse in={step === 1}>
          <TextField
            value={inviteCodeInput}
            onChange={(e) => setInviteCodeInput(e.target.value)}
            label="Invite Code"
            style={{ width: "100%", marginTop: "20px" }}
          />
          <ButtonWithLoader
            style={classes.landingEnterButton}
            onClick={enterInviteCodeButton}
            isLoading={isLoading}
          >
            Enter
          </ButtonWithLoader>
        </Collapse>
      ) : (
        <>
          <TextField
            value={displayNameInput}
            onChange={(e) => setDisplayNameInput(e.target.value)}
            label="Display Name"
            style={{ width: "100%", marginTop: "20px" }}
          />
          <ButtonWithLoader
            style={classes.landingEnterButton}
            onClick={enterDisplayNameButton}
            isLoading={isLoading}
          >
            Join Game
          </ButtonWithLoader>
        </>
      )}
    </PaperBoxWithIcon>
  );
};

export default LandingPage;
