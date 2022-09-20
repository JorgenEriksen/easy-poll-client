import { useEffect, useState } from "react";
import AlternativeCard from "./AlternativeCard";
import ButtonWithLoader from "../../../components/ButtonWithLoader";
import { submitQuestionAnswer } from "../../../utils/apiRequests";
import WaitingForPlayersAnimation from "./WaitingForPlayersAnimation";

const PollScreen = ({
  question,
  isAdmin,
  tempUsers,
  numberOfAnswers,
  selectedAlternativeIndex,
  setSelectedAlternativeIndex,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const nextQuestionButtonClick = () => {
    setIsLoading(true);
  };

  const alternativeCardClick = (index, alternativeId) => {
    setSelectedAlternativeIndex(index);
    var body = {
      questionId: question.id,
      alternativeId: alternativeId,
    };
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

      <WaitingForPlayersAnimation
        numberOfPlayers={tempUsers.length}
        numberOfAnswers={numberOfAnswers}
      />

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
