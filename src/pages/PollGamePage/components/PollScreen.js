import AlternativeCard from "./AlternativeCard";

const PollScreen = ({ alternatives }) => {
  return (
    <>
      {[1, 2, 3].map((alternative, index) => (
        <AlternativeCard key={index} />
      ))}
    </>
  );
};

export default PollScreen;
