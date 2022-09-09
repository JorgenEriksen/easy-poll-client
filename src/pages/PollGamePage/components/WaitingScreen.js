export const WaitingScreen = ({ tempUsers }) => {
  return (
    <div>
      <h2>Waiting for people to join</h2>
      <p>
        {tempUsers.map((user, index) => (
          <span key={index}>{user.displayName}</span>
        ))}
      </p>
    </div>
  );
};
