import { useState } from "react";
import AlternativeCard from "./AlternativeCard";
import ButtonWithLoader from "../../../components/ButtonWithLoader";

const PollScreen = ({ question, title, isAdmin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAlternativeIndex, setSelectedAlternativeIndex] = useState(1);
  const nextQuestionButtonClick = () => {
    setIsLoading(true);
  };
  return (
    <>
      <h1>{question.title}</h1>
      {question.questionAlternatives.map((alternative, index) => (
        <AlternativeCard
          key={index}
          index={index}
          text={alternative.alternativeText}
          selected={selectedAlternativeIndex === index}
          setSelectedAlternativeIndex={setSelectedAlternativeIndex}
        />
      ))}

      {isAdmin && (
        <div>
          <ButtonWithLoader
            onClick={nextQuestionButtonClick}
            isLoading={isLoading}
            style={{ width: "100%", marginTop: "20px" }}
          >
            Next Question
          </ButtonWithLoader>
        </div>
      )}
    </>
  );
};

export default PollScreen;
