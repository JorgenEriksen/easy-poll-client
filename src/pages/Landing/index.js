import "./index.css";
import { css, cx } from '@emotion/css'
import { TextField, Button } from "@mui/material";

const classes = {
  landingContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#d4f7ff",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: 'column',
    paddingTop: '200px',
  },
  landingEnterButton : {
    width: '100%',
    marginTop: '20px',
  },
  landingFrontbox: {
    backgroundColor: "white",
    padding: "20px",
    width: "400px",
  },
};

const Landing = () => {
  return (
    <div className={css(classes.landingContainer)}>
      <h1 className={css(classes.landingHeader)}>EasyPoll</h1>
      <div className={css(classes.landingFrontbox)}>
        <TextField label="InviteToken" style={{ width: "100%" }} />
        <Button variant="contained" style={classes.landingEnterButton}>
          Enter
        </Button>
      </div>
    </div>
  );
};

export default Landing;
