import { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { css } from "@emotion/css";

const classes = {
  container: css`
    width: 100%;
    min-width: 50px;
    height: 300px;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
  `,
  barContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    max-width: 50px;
    width: 100%;
    height: 100%;
  `,
  barBox: (size) => css`
    width: 100%;

    background-color: blue;
    height: ${size}%;
  `,
  barTitle: css``,
};

const BarChart = ({ result, numberOfUsers }) => {
  return (
    <div className={classes.container}>
      {result.questionAlternatives.map((qa, index) => (
        <div className={classes.barContainer}>
          <div
            className={classes.barBox(
              (qa.usersAnswered.length / numberOfUsers) * 100
            )}
          />
          <div className={classes.barTitle}>{qa.alternativeText}</div>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
