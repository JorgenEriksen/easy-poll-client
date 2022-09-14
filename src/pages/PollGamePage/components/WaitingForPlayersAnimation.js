import { css } from "@emotion/css";
import { CircularProgress } from "@mui/material";

const classes = {
  container: css`
    display: flex;
    align-items: center;
    margin-top: 10px;
  `,
  progressBar: css`
    margin-right: 10px;
  `,
};

const WaitingForPlayersAnimation = () => {
  return (
    <div className={classes.container}>
      <CircularProgress className={classes.progressBar} />{" "}
      <span>Waiting for other players to answer</span>
    </div>
  );
};

export default WaitingForPlayersAnimation;
