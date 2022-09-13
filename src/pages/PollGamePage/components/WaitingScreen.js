import { useState } from "react";
import { Button, Typography, CircularProgress } from "@mui/material";
import ButtonWithLoader from "../../../components/ButtonWithLoader";
import { startPollGameAPI } from "../../../utils/apiRequests";
import { useSnackbar } from "../../../hooks/useSnackbar";

export const WaitingScreen = ({ tempUsers, inviteCode, isAdmin }) => {
  const { openSnack } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const startPollButtonClick = () => {
    setIsLoading(true);
    startPollGameAPI()
      .then(() => {
        console.log("starts");
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
        openSnack(error.message, "error");
      });
  };

  return (
    <div>
      <h2>Invite code: {inviteCode}</h2>
      <h4>Waiting for people to join...</h4>
      <div>
        {tempUsers.map((user, index) => (
          <p key={index}>{user.displayName}</p>
        ))}
      </div>
      {isAdmin && (
        <div>
          <ButtonWithLoader
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
