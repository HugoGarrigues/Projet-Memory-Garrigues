import { useState } from "react";
import useMemoryStore from "../store/UseMemoryStore";

const Home = () => {
  const { getCardsToReview } = useMemoryStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const cardsToReview = getCardsToReview();

  if (cardsToReview.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-100">
        <div className="text-xl text-center text-gray-700">
          Aucune carte à réviser aujourd'hui.
        </div>
      </div>
    );
  }

  const currentCard = cardsToReview[currentIndex];

  if (!currentCard) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-100">
        <div className="text-xl text-center text-red-500">
          Une erreur est survenue, veuillez réessayer.
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    const correct =
      userAnswer.trim().toLowerCase() === currentCard.back.trim().toLowerCase();
    setIsCorrect(correct);
    setIsAnswered(true);
  };

  const handleNext = () => {
    setUserAnswer("");
    setIsAnswered(false);
    if (currentIndex < cardsToReview.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 p-4 space-y-6">
      <div className="card card-compact bg-base-200 p-6 shadow-xl rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-primary mb-4">
          {currentCard.front}
        </h2>

        {!isAnswered ? (
          <div className="mt-4 space-y-4">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="input input-bordered input-primary w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary p-2"
              placeholder="Votre réponse..."
            />
            <button
              className="btn btn-primary w-full mt-4"
              onClick={handleSubmit}
            >
              Valider
            </button>
          </div>
        ) : (
          <div className="mt-4 text-center space-y-4">
            {isCorrect ? (
              <p className="text-green-500 font-semibold text-xl">
                Correct !
              </p>
            ) : (
              <p className="text-red-500 font-semibold text-xl">
                Incorrect ! La bonne réponse était :{" "}
                <span className="font-bold text-white">
                  {currentCard.back}
                </span>
              </p>
            )}
            <button
              className="btn btn-primary w-full mt-4"
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

export default Home;
