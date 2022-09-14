import { useState } from "react";
import AlternativeCard from "./AlternativeCard";
import ButtonWithLoader from "../../../components/ButtonWithLoader";
import { submitQuestionAnswer } from "../../../utils/apiRequests";
import WaitingForPlayersAnimation from "./WaitingForPlayersAnimation";

const PollScreen = ({ question, title, isAdmin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAlternativeIndex, setSelectedAlternativeIndex] = useState(1);
  const nextQuestionButtonClick = () => {
    setIsLoading(true);
  };

  const alternativeCardClick = (index, alternativeId) => {
    setSelectedAlternativeIndex(index);
    var body = {
      questionId: question.id,
      alternativeId: alternativeId,
    };
    console.log(body);
    submitQuestionAnswer(body);
  };

  return (
    <>
      <h1>{question.title}</h1>
      {question.questionAlternatives.map((alternative, index) => (
        <AlternativeCard
          key={index}
          index={index}
          alternative={alternative}
          selected={selectedAlternativeIndex === index}
          alternativeCardClick={alternativeCardClick}
        />
      ))}

      <WaitingForPlayersAnimation />

      {isAdmin && (
        <div>
          <ButtonWithLoader
            onClick={nextQuestionButtonClick}
            isLoading={isLoading}
            style={{ width: "100%", marginTop: "20px" }}
          >
            Force next Question
          </ButtonWithLoader>
        </div>
      )}
    </>
  );
};

export default PollScreen;
