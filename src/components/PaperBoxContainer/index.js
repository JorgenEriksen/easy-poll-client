import { css } from "@emotion/css";

const classes = {
  container: css`
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
};

const PaperBoxContainer = ({ children }) => (
  <div className={classes.container}>{children}</div>
);

export default PaperBoxContainer;
