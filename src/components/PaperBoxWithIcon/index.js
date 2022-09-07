import { css } from "@emotion/css";
import PaperBox from "../PaperBox";
import PaperBoxContainer from "../PaperBoxContainer";

const classes = {
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
    <PaperBoxContainer>
      <img
        src="/EasyPollLogo.png"
        alt="EasyPoll logo"
        className={classes.logo}
      />
      <PaperBox>{children}</PaperBox>
    </PaperBoxContainer>
  );
};

export default PaperBoxWithIcon;
