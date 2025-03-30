import { useState } from "react";
import { Card as CardType } from "../types/card";

interface CardProps {
  card: CardType;
  onReview: (isCorrect: boolean) => void;
}

const Card = ({ card, onReview }: CardProps) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    const correct = userAnswer.trim().toLowerCase() === card.back.trim().toLowerCase();
    setIsCorrect(correct);
    setIsAnswered(true);
  };

  const handleNext = () => {
    onReview(isCorrect);
    setUserAnswer("");
    setIsAnswered(false);
  };

  return (
    <div className="card shadow-lg w-full md:w-1/2">
      <div className="card-body">
        <h2 className="card-title text-center">{card.front}</h2>

        {!isAnswered ? (
          <div className="mt-4">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Votre réponse..."
            />
            <button
              className="btn btn-primary w-full mt-2"
              onClick={handleSubmit}
            >
              Valider
            </button>
          </div>
        ) : (
          <div className="mt-4 text-center">
            {isCorrect ? (
              <p className="text-green-500 font-bold text-lg">Correct !</p>
            ) : (
              <p className="text-red-500 font-bold text-lg">
                Incorrect !<br />
                <span className="text-gray-700">Réponse : {card.back}</span>
              </p>
            )}
            <button
              className="btn btn-secondary w-full mt-2"
              onClick={handleNext}
            >
              Continuer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
