import { useState } from "react";
import { Button, Typography, CircularProgress } from "@mui/material";
import ButtonWithLoader from "../../../components/ButtonWithLoader";

export const WaitingScreen = ({ tempUsers, inviteCode, isAdmin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const startPollButtonClick = () => {
    setIsLoading(true);
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
