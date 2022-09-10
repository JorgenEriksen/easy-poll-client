import { useEffect, useState } from "react";
import PaperBoxContainer from "../../components/PaperBoxContainer";
import PaperBox from "../../components/PaperBox";
import { WaitingScreen } from "./components/WaitingScreen";
import PollScreen from "./components/PollScreen";
import { getQuestionAPI } from "../../utils/apiRequests";

// https://elfsight.com/wp-content/uploads/2020/08/poll-builder-hero-image.png
const PollGamePage = () => {
  const [alternatives, setAlternatives] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [tempUsers, setTempUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [inviteCode, setInviteCode] = useState("");

  useEffect(() => {
    getQuestionAPI()
      .then((data) => {
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
