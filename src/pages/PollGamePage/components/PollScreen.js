import AlternativeCard from "./AlternativeCard";

const PollScreen = ({ question, title }) => {
  return (
    <>
      <h1>{question.title}</h1>
      {question.questionAlternatives.map((alternative, index) => (
        <AlternativeCard key={index} text={alternative.alternativeText} />
      ))}
    </>
  );
};

export default PollScreen;
