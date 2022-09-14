import { css, cx, keyframes } from "@emotion/css";

const classes = {
  paperContainer: css`
    background-color: white;
    padding: 20px;
    max-width: 400px;
    border-radius: 10px;
    margin-bottom: 50px;
  `,
};

const PaperBox = ({ style, children }) => {
  return (
    <div style={style} className={classes.paperContainer}>
      {children}
    </div>
  );
};

export default PaperBox;
