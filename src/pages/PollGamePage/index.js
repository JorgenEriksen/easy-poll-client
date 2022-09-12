import { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import PaperBoxContainer from "../../components/PaperBoxContainer";
import PaperBox from "../../components/PaperBox";
import { WaitingScreen } from "./components/WaitingScreen";
import PollScreen from "./components/PollScreen";
import { getPollGameDataAPI } from "../../utils/apiRequests";
import { useAuth } from "../../hooks/useAuth";

// https://elfsight.com/wp-content/uploads/2020/08/poll-builder-hero-image.png
const PollGamePage = () => {
  const secondsBeforeRetryConnect = 5;
  const { isAdmin } = useAuth();
  const [gameId, setGameId] = useState(0);
  const [hubConnection, setHubConnection] = useState();
  const [alternatives, setAlternatives] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [tempUsers, setTempUsers] = useState([]);
  const [inviteCode, setInviteCode] = useState("");

  useEffect(() => {
    getPollGameDataAPI()
      .then((e) => {
        const data = e.result;
        applyDataFromAPI(data);
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
      hubConnection.on("Socket-PollGameId-" + gameId, (dataFromAPI) => {
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
    setGameId(data.id);
    setHasStarted(data.hasStarted);
    setTempUsers(data.tempUsers);
    setInviteCode(data.inviteCode);
    setAlternatives([]);
  };

  return (
    <PaperBoxContainer>
      <PaperBox>
        {!hasStarted ? (
          <WaitingScreen
            tempUsers={tempUsers}
            isAdmin={isAdmin}
            inviteCode={inviteCode}
          />
        ) : (
          <PollScreen alternatives={alternatives} />
        )}
      </PaperBox>
    </PaperBoxContainer>
  );
};

export default PollGamePage;
