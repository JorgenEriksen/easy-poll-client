export const WaitingScreen = ({ tempUsers, inviteCode }) => {
  return (
    <div>
      <h2>Invite code: {inviteCode}</h2>
      <h4>Waiting for people to join...</h4>
      <p>
        {tempUsers.map((user, index) => (
          <p key={index}>{user.displayName}</p>
        ))}
      </p>
    </div>
  );
};
