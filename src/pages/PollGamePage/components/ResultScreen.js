import { Doughnut } from "react-chartjs-2";
import BarChart from "../../../components/BarChart";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ButtonWithLoader from "../../../components/ButtonWithLoader";
import { deletePollGameAPI } from "../../../utils/apiRequests";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { useNavigate } from "react-router-dom";

const ResultScreen = ({ results, tempUsers, isAdmin }) => {
  const [resultWithDisplayName, setResultWithDisplayName] = useState([]);
  const { openSnack } = useSnackbar();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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

  const deletePollButtonClick = () => {
    setIsLoading(true);
    deletePollGameAPI()
      .then(() => {
        console.log("ends");
        setIsLoading(false);
        openSnack("Poll deleted successfully", "success");
        navigate("/");
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
        openSnack(error.message, "error");
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h2>Result</h2>
      {resultWithDisplayName.map((result, index) => (
        <div style={{ border: "1px solid black", marginBottom: "20px" }}>
          <h3 style={{ paddingLeft: "20px" }}>{result.title}</h3>
          <BarChart
            key={index}
            result={result}
            numberOfUsers={tempUsers.length}
          />
        </div>
      ))}
      {isAdmin && (
        <ButtonWithLoader isLoading={isLoading} onClick={deletePollButtonClick}>
          Delete poll
        </ButtonWithLoader>
      )}
    </div>
  );
};

export default ResultScreen;
