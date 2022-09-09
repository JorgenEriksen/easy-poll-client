import { useState } from "react";
import { css } from "@emotion/css";
import { TextField, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import PaperBoxWithIcon from "../../components/PaperBoxWithIcon";
import { authenticateInviteCodeAPI } from "../../utils/apiRequests";
import { useSnackbar } from "../../hooks/useSnackbar";
import Collapse from "@mui/material/Collapse";

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
  const { openSnack } = useSnackbar();
  const [displayNameInput, setDisplayNameInput] = useState("");
  const [inviteCodeInput, setInviteCodeInput] = useState("");
  const [step, setStep] = useState(1);

  //joinPollGameAPI

  const enterInviteCodeButton = () => {
    authenticateInviteCodeAPI(inviteCodeInput)
      .then(() => {
        setStep(2);
        console.log("works");
      })
      .catch((error) => {
        openSnack(error.message, "warning");
      });
  };

  const enterDisplayNameButton = () => {};

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
            label="Invite Token"
            style={{ width: "100%", marginTop: "20px" }}
          />
          <Button
            variant="contained"
            style={classes.landingEnterButton}
            onClick={enterInviteCodeButton}
          >
            Enter
          </Button>
        </Collapse>
      ) : (
        <>
          <TextField
            value={displayNameInput}
            onChange={(e) => setDisplayNameInput(e.target.value)}
            label="Display Name"
            style={{ width: "100%", marginTop: "20px" }}
          />
          <Button
            variant="contained"
            style={classes.landingEnterButton}
            onClick={enterDisplayNameButton}
          >
            Join Game
          </Button>
        </>
      )}
    </PaperBoxWithIcon>
  );
};

export default LandingPage;
