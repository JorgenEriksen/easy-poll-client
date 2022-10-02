import { useState } from "react";
import ButtonWithLoader from "../../../components/ButtonWithLoader";
import { startPollGameAPI } from "../../../utils/apiRequests";
import { useSnackbar } from "../../../hooks/useSnackbar";

const WaitingScreen = ({ tempUsers, inviteCode, isAdmin }) => {
  const { openSnack } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const startPollButtonClick = () => {
    setIsLoading(true);
    startPollGameAPI()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
        setIsLoading(false);
        openSnack(error.message, "error");
      });
  };

  return (
    <div>
      <h2>Invite code: {inviteCode}</h2>
      <h4>
        Waiting for people to join...
        {tempUsers.length < 2 &&
          "(needs atleast one more player before the poll can start)"}
      </h4>
      <div>
        {tempUsers.map((user, index) => (
          <p key={index}>{user.displayName}</p>
        ))}
      </div>
      {isAdmin && (
        <div>
          <ButtonWithLoader
            disabled={tempUsers.length < 2}
            onClick={startPollButtonClick}
            isLoading={isLoading}
            style={{ width: "100%" }}
          >
            Start Poll
          </ButtonWithLoader>
        </div>
      )}
    </div>
  );
};

export default WaitingScreen;
