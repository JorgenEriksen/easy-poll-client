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
import { Bar } from "react-chartjs-2";
import { css } from "@emotion/css";

const classes = {
  container: css`
    width: 100%;
    min-width: 100px;
    min-height: 100px;
    background-color: blue;
  `,
};

const BarChart = ({ result }) => {
  useEffect(() => {
    console.log(result);
  }, []);

  return (
    <div className={classes.container}>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default BarChart;
