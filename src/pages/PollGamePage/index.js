import { useEffect, useState } from "react";
import PaperBoxWithIcon from "../../components/PaperBoxWithIcon";
import PaperBox from "../../components/PaperBox";
import { WaitingScreen } from "./components/WaitingScreen";
import PollScreen from "./components/PollScreen";
import { getQuestionFromAPI } from "../../utils/apiRequests";

// https://elfsight.com/wp-content/uploads/2020/08/poll-builder-hero-image.png
const PollGamePage = () => {
  const [alternatives, setAlternatives] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getQuestionFromAPI()
      .then((data) => {
        setIsAdmin(data.isAdmin);
        setHasStarted(data.hasStarted);
      })
      .catch((error) => {
        console.log("asd");
        console.log(error);
      });
  }, []);

  return (
    <PaperBox>
      {!hasStarted ? (
        <WaitingScreen />
      ) : (
        <PollScreen alternatives={alternatives} />
      )}
    </PaperBox>
  );
};

export default PollGamePage;
