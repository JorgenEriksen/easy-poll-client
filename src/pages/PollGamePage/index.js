import { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import PaperBoxContainer from "../../components/PaperBoxContainer";
import PaperBox from "../../components/PaperBox";
import WaitingScreen from "./components/WaitingScreen";
import ResultScreen from "./components/ResultScreen";
import PollScreen from "./components/PollScreen";
import { getPollGameDataAPI } from "../../utils/apiRequests";
import { useAuth } from "../../hooks/useAuth";
import ContentLoader from "../../components/ContentLoader";

// https://elfsight.com/wp-content/uploads/2020/08/poll-builder-hero-image.png
const PollGamePage = () => {
  const secondsBeforeRetryConnect = 5;
  const { isAdmin } = useAuth();
  const [gameId, setGameId] = useState(0);
  const [hubConnection, setHubConnection] = useState();
  const [results, setResults] = useState({});
  const [question, setQuestion] = useState({
    title: "",
    questionAlternatives: [],
    questionOrder: -1,
  });
  const [gameStatus, setGameStatus] = useState("NotStarted");
  const [tempUsers, setTempUsers] = useState([]);
  const [inviteCode, setInviteCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [numberOfAnswers, setNumberOfAnswers] = useState(0);
  const [selectedAlternativeIndex, setSelectedAlternativeIndex] = useState(-1);

  useEffect(() => {
    getPollGameDataAPI()
      .then((e) => {
        const data = e.result;
        applyDataFromAPI(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  }, []);

  useEffect(() => {
    createHubConnection();
  }, []);

  useEffect(() => {
    if (hubConnection && gameId > 0) {
      console.log("Connection!");
      console.log(gameId);
      hubConnection.on("Socket-PollGameId-" + gameId, (dataFromAPI) => {
        console.log("get");
        applyDataFromAPI(dataFromAPI);
      });
    }
  }, [hubConnection, gameId]);

  const createHubConnection = async () => {
    const hubConnectionInit = new HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_WEB_SOCKET_URL)
      .build();
    try {
      await hubConnectionInit.start();
      setHubConnection(hubConnectionInit);
    } catch (e) {
      console.log("error", e);
      console.log(
        "tryng to connect again in " + secondsBeforeRetryConnect + " seconds..."
      );
      setTimeout(() => {
        createHubConnection();
      }, secondsBeforeRetryConnect * 1000);
    }
  };

  const applyDataFromAPI = (data) => {
    console.log(data);
    setGameId(data.id);
    setTempUsers(data.tempUsers);
    setInviteCode(data.inviteCode);
    setQuestion(data.question);
    setGameStatus(data.status);
    setResults(data.questions);
    setNumberOfAnswers(data.numberOfAnswers);
    // if new question, reset selected alternative for user
    if (data.question && data.question.title !== question.title) {
      setSelectedAlternativeIndex(-1);
    }
  };

  return (
    <PaperBoxContainer>
      <PaperBox style={{ width: "100%" }}>
        <ContentLoader isLoading={isLoading}>
          {gameStatus == "NotStarted" && (
            <WaitingScreen
              tempUsers={tempUsers}
              isAdmin={isAdmin}
              inviteCode={inviteCode}
            />
          )}
          {gameStatus == "Started" && (
            <PollScreen
              tempUsers={tempUsers}
              question={question}
              isAdmin={isAdmin}
              numberOfAnswers={numberOfAnswers}
              selectedAlternativeIndex={selectedAlternativeIndex}
              setSelectedAlternativeIndex={setSelectedAlternativeIndex}
            />
          )}
          {gameStatus == "Ended" && (
            <ResultScreen results={results} tempUsers={tempUsers} />
          )}
        </ContentLoader>
      </PaperBox>
    </PaperBoxContainer>
  );
};

export default PollGamePage;
