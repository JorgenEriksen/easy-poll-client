import { useState } from "react";
import { Button, Typography, CircularProgress } from "@mui/material";
import ButtonWithLoader from "../../../components/ButtonWithLoader";
import {
  startPollGameAPI,
  deletePollGameAPI,
} from "../../../utils/apiRequests";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const WaitingScreen = ({ tempUsers, inviteCode, isAdmin }) => {
  const { openSnack } = useSnackbar();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const startPollButtonClick = () => {
    setIsLoading(true);
    startPollGameAPI()
      .then(() => {
        console.log("starts");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
        setIsLoading(false);
        openSnack(error.message, "error");
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
          <br />
          <br />
          <ButtonWithLoader
            disabled={tempUsers.length < 2}
            onClick={deletePollButtonClick}
            isLoading={isLoading}
            style={{ width: "100%" }}
          >
            Delete Poll
          </ButtonWithLoader>
        </div>
      )}
    </div>
  );
};

export default WaitingScreen;
