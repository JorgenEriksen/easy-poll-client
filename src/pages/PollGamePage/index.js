import { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import PaperBoxContainer from "../../components/PaperBoxContainer";
import PaperBox from "../../components/PaperBox";
import { WaitingScreen } from "./components/WaitingScreen";
import PollScreen from "./components/PollScreen";
import { getPollGameDataAPI } from "../../utils/apiRequests";

// https://elfsight.com/wp-content/uploads/2020/08/poll-builder-hero-image.png
const PollGamePage = () => {
  const secondsBeforeRetryConnect = 5;
  const [hubConnection, setHubConnection] = useState();
  const [alternatives, setAlternatives] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [tempUsers, setTempUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [inviteCode, setInviteCode] = useState("");

  useEffect(() => {
    getPollGameDataAPI()
      .then((e) => {
        const data = e.result;
        console.log(data);
        setIsAdmin(data.isAdmin);
        setHasStarted(data.hasStarted);
        setTempUsers(data.tempUsers);
        setInviteCode(data.inviteCode);
        setAlternatives([]);
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
    if (hubConnection) {
      console.log("Connection!");
    }
  }, [hubConnection]);

  const createHubConnection = async () => {
    console.log(process.env.REACT_APP_WEB_SOCKET_URL);
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
