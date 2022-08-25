import { useState } from "react";
import { css, cx, keyframes } from '@emotion/css'
import { TextField, Button } from "@mui/material";
import "./index.css";

const bgcolor = keyframes`
0% {
    background-color: #45a3e5
}

30% {
    background-color: #66bf39
}

60% {
    background-color: #eb670f
}

90% {
    background-color: #f35
}

100% {
    background-color: #864cbf
}
`


const classes = {
  landingContainer: css`
  width: 100%;
  height: 100%;
  background-color: #d4f7ff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  -webkit-animation: ${bgcolor} 30s infinite;
  animation: ${bgcolor} 30s infinite;
  padding-top: 80px;
  `,
  logo: css`
  margin-bottom: 40px;
  max-height: 200px;
  width: auto;
  @media (max-width: 480px) {
    max-height: 100px;
  }
  
  `,
  landingEnterButton : {
    width: '100%',
    marginTop: '20px',
  },
  landingFrontbox: css`
    background-color: white;
    padding: 20px;
    width: 80%;
    max-width: 400px;
    border-radius: '10px';
    margin-left: 20px;
    margin-right: 20px;
    `
};



  	

const Landing = () => {
  const [displayNameInput, setDisplayNameInput] = useState("");
  const [inviteCodeInput, setInviteCodeInput] = useState("")

  return (
    <div className={classes.landingContainer}>
      <img src="/EasyPollLogo.png" alt="EasyPoll logo" className={classes.logo} />
      <div className={css(classes.landingFrontbox)}>
      <a href="https://www.w3schools.com/">Create new poll?</a>
        <TextField label="InviteToken" style={{ width: "100%", marginTop: '20px' }} />
        <Button variant="contained" style={classes.landingEnterButton}>
          Enter
        </Button>
        
      </div>
    </div>
  );
};

export default Landing;
