import { Doughnut } from "react-chartjs-2";
import BarChart from "../../../components/BarChart";
import { useEffect, useState } from "react";

const ResultScreen = ({ results, tempUsers }) => {
  const [resultWithDisplayName, setResultWithDisplayName] = useState([]);
  useEffect(() => {
    var resultWithDisplayNamePlaceholder = results.map((r) => {
      r.questionAlternatives = r.questionAlternatives.map((qa) => {
        qa.usersAnswered = qa.usersAnswered.map(
          (ua) => tempUsers.find((tu) => tu.id === ua)?.displayName
        );
        return qa;
      });
      return r;
    });
    console.log(resultWithDisplayNamePlaceholder);
    setResultWithDisplayName(resultWithDisplayNamePlaceholder);
  }, []);
  return (
    <div>
      <h2>Result</h2>
      {resultWithDisplayName.map((result, index) => (
        <BarChart key={index} result={result} />
      ))}
    </div>
  );
};

export default ResultScreen;
