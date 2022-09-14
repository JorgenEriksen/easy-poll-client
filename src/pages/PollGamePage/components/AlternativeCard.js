import { css } from "@emotion/css";
import classNames from "classnames";

const classes = {
  AlternativeCardSpaceContainer: css`
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  AlternativeCard: css`
    background-color: #f1f1f1;
    height: 40px;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
    &:hover {
      height: 50px;
      cursor: pointer;
      border: 2px solid black;
    }
  `,
  SelectedAlternativeCard: css`
    border: 2px solid black;
    box-shadow: 2px 2px 2px 2px #888888;
    font-weight: bold;
  `,
};

const AlternativeCard = ({
  alternative,
  index,
  selected,
  alternativeCardClick,
}) => {
  return (
    <div className={classes.AlternativeCardSpaceContainer}>
      <div
        onClick={() => alternativeCardClick(index, alternative.id)}
        className={classNames(
          classes.AlternativeCard,
          selected ? classes.SelectedAlternativeCard : null
        )}
      >
        {alternative.alternativeText}
      </div>
    </div>
  );
};

export default AlternativeCard;
