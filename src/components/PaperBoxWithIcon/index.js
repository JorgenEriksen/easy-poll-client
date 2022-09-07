import { css, cx, keyframes } from "@emotion/css";
import PaperBox from "../PaperBox";

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
};

const PaperBoxWithIcon = ({ children }) => {
  return (
    <div className={classes.landingContainer}>
      <img
        src="/EasyPollLogo.png"
        alt="EasyPoll logo"
        className={classes.logo}
      />
      <PaperBox>{children}</PaperBox>
    </div>
  );
};

export default PaperBoxWithIcon;
