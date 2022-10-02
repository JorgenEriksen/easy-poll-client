import { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import PaperBoxContainer from "../../components/PaperBoxContainer";
import PaperBox from "../../components/PaperBox";
import WaitingScreen from "./components/WaitingScreen";
import ResultScreen from "./components/ResultScreen";
import PollScreen from "./components/PollScreen";
import {
  getPollGameDataAPI,
  leavePollGameAPI,
  deletePollGameAPI,
} from "../../utils/apiRequests";
import { useAuth } from "../../hooks/useAuth";
import ContentLoader from "../../components/ContentLoader";
import ButtonWithLoader from "../../components/ButtonWithLoader";
import { useSnackbar } from "../../hooks/useSnackbar";
import ConfirmModal from "../../components/ConfirmModal";

// https://elfsight.com/wp-content/uploads/2020/08/poll-builder-hero-image.png
const PollGamePage = () => {
  const secondsBeforeRetryConnect = 5;
  const { openSnack } = useSnackbar();
  const { isAdmin, logout } = useAuth();
  const [gameId, setGameId] = useState(0);
  const [hubConnection, setHubConnection] = useState();
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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);
  const [selectedAlternativeIndex, setSelectedAlternativeIndex] = useState(-1);
  const [results, setResults] = useState({});
  const [dataReceived, setDataReceived] = useState({});

  useEffect(() => {
    getPollGameDataAPI()
      .then((e) => {
        const data = e.result;
        console.log(data);
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
      hubConnection.on("Socket-PollGameId-" + gameId, (dataFromAPI) => {
        setDataReceived(dataFromAPI);
      });
    }
  }, [hubConnection, gameId]);

  useEffect(() => {
    if (Object.keys(dataReceived).length > 0) {
      applyDataFromAPI({ ...dataReceived });
    }
  }, [dataReceived]);

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
    setQuestion({ ...data.question });
    setGameStatus(data.status);
    setResults(data.questions);
    setNumberOfAnswers(data.numberOfAnswers);
    // if new question, reset selected alternative for user
    if (data.question && data.question.title !== question.title) {
      setSelectedAlternativeIndex(-1);
    }
  };

  const leavePollGameClick = () => {
    setIsLoading(true);
    leavePollGameAPI()
      .then(() => {
        logout();
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const deletePollButtonClick = () => {
    setIsLoading(true);
    deletePollGameAPI()
      .then(() => {
        setIsLoading(false);
        openSnack("Poll deleted successfully", "success");
        logout();
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
        setIsLoading(false);
        openSnack(error.message, "error");
      });
  };

  return (
    <PaperBoxContainer>
      <PaperBox style={{ width: "100%" }}>
        <ContentLoader isLoading={isLoading}>
          {isAdmin && (
            <ButtonWithLoader
              onClick={() => setOpenDeleteDialog(true)}
              isLoading={isLoading}
              style={{ backgroundColor: "red" }}
            >
              Delete Poll
            </ButtonWithLoader>
          )}
          {!isAdmin && (
            <ButtonWithLoader
              isLoading={isLoading}
              onClick={() => setOpenLeaveDialog(true)}
              style={{ backgroundColor: "red" }}
            >
              Leave poll
            </ButtonWithLoader>
          )}
          {gameStatus === "NotStarted" && (
            <WaitingScreen
              tempUsers={tempUsers}
              isAdmin={isAdmin}
              inviteCode={inviteCode}
            />
          )}
          {gameStatus === "Started" && (
            <PollScreen
              tempUsers={tempUsers}
              question={question}
              isAdmin={isAdmin}
              numberOfAnswers={numberOfAnswers}
              selectedAlternativeIndex={selectedAlternativeIndex}
              setSelectedAlternativeIndex={setSelectedAlternativeIndex}
            />
          )}
          {gameStatus === "Ended" && (
            <ResultScreen
              results={results}
              tempUsers={tempUsers}
              isAdmin={isAdmin}
            />
          )}
        </ContentLoader>
      </PaperBox>
      <ConfirmModal
        openConfirmDialog={openDeleteDialog}
        setOpenConfirmDialog={setOpenDeleteDialog}
        confirmFunction={deletePollButtonClick}
        dialogTitle="Delete poll"
        dialogText="Are you sure you want to delete the poll?"
      />
      <ConfirmModal
        openConfirmDialog={openLeaveDialog}
        setOpenConfirmDialog={setOpenLeaveDialog}
        confirmFunction={leavePollGameClick}
        dialogTitle="Leave poll"
        dialogText="Are you sure you want to leave the poll?"
      />
    </PaperBoxContainer>
  );
};

export default PollGamePage;
