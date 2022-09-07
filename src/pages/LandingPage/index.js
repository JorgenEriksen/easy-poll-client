import { useState } from "react";
import { css, cx, keyframes } from "@emotion/css";
import { TextField, Button } from "@mui/material";
import ColorChangingBackground from "../../components/ColorChangingBackground";
import { NavLink } from "react-router-dom";
import PaperBoxWithIcon from "../../components/PaperBoxWithIcon";
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
  const [displayNameInput, setDisplayNameInput] = useState("");
  const [inviteCodeInput, setInviteCodeInput] = useState("");

  return (
    <PaperBoxWithIcon>
      <NavLink
        to={{
          pathname: "/create-poll",
        }}
      >
        Create new poll?
      </NavLink>
      <TextField
        label="InviteToken"
        style={{ width: "100%", marginTop: "20px" }}
      />
      <Button variant="contained" style={classes.landingEnterButton}>
        Enter
      </Button>
    </PaperBoxWithIcon>
  );
};

export default LandingPage;
