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
    return <div>Aucune carte à réviser aujourd'hui.</div>;
  }

  const currentCard = cardsToReview[currentIndex];

  if (!currentCard) {
    return <div>Une erreur est survenue, veuillez réessayer.</div>;
  }

  const handleSubmit = () => {
    const correct = userAnswer.trim().toLowerCase() === currentCard.back.trim().toLowerCase();
    setIsCorrect(correct);
    setIsAnswered(true);
  };

  const handleNext = () => {
    setUserAnswer("");
    setIsAnswered(false);
    if (currentIndex < cardsToReview.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <div className="card bg-neutral p-6 shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">{currentCard.front}</h2>

        {!isAnswered ? (
          <div className="mt-4">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Votre réponse..."
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
              onClick={handleSubmit}
            >
              Valider
            </button>
          </div>
        ) : (
          <div className="mt-4 text-center">
            {isCorrect ? (
              <p className="text-green-500 font-bold">✔ Correct !</p>
            ) : (
              <p className="text-red-500 font-bold">
                ❌ Incorrect ! La bonne réponse était : <span className="font-bold">{currentCard.back}</span>
              </p>
            )}
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mt-4 w-full"
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
