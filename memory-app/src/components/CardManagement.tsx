import { useState } from "react";
import { useParams } from "react-router-dom";
import useMemoryStore from "../store/UseMemoryStore";
import { Card } from "../types/card";

const CardManagement = () => {
  const { categoryId, themeId } = useParams<{ categoryId: string; themeId: string }>();
  const { categories, addCard, removeCard, updateCard } = useMemoryStore();

  const [newCardFront, setNewCardFront] = useState<string>("");
  const [newCardBack, setNewCardBack] = useState<string>("");

  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [editedCardFront, setEditedCardFront] = useState<string>("");
  const [editedCardBack, setEditedCardBack] = useState<string>("");
  const [editedCardLevel, setEditedCardLevel] = useState<number>(1);

  const category = categories.find((cat) => cat.id.toString() === categoryId);
  const theme = category?.themes.find((theme) => theme.id.toString() === themeId);

  if (!category || !theme) {
    // TODO : Faire une redirection vers une page d'erreur ou une div plus sympa
    return <div className="text-error text-center mt-6">Une erreur est survenue, veuillez réessayer</div>;
  }

  const handleAddCard = () => {
    if (newCardFront.trim() !== "" && newCardBack.trim() !== "") {
      const card: Card = {
        id: Date.now(),
        front: newCardFront,
        back: newCardBack,
        level: 1,
        lastReviewed: new Date(),
        nextReviewDate: new Date(),
        themeId: theme.id
      };
      addCard(theme.id, card);
      setNewCardFront("");
      setNewCardBack("");
    }
  };

  const handleEditCard = (cardId: number, cardFront: string, cardBack: string, cardLevel: number) => {
    setEditingCardId(cardId);
    setEditedCardFront(cardFront);
    setEditedCardBack(cardBack);
    setEditedCardLevel(cardLevel);
  };

  const handleSaveCard = () => {
    if (editedCardFront.trim() !== "" && editedCardBack.trim() !== "") {
      const updatedCard: Card = {
        id: editingCardId!,
        front: editedCardFront,
        back: editedCardBack,
        level: editedCardLevel,
        lastReviewed: new Date(),
        nextReviewDate: new Date(),
        themeId: theme.id
      };
      updateCard(editingCardId!, updatedCard);
      setEditingCardId(null);
      setEditedCardFront("");
      setEditedCardBack("");
      setEditedCardLevel(1);
    }
  };

  const handleRemoveCard = (cardId: number) => {
    removeCard(theme.id, cardId);
  };

  const handleLevelChange = (newLevel: number) => {
    setEditedCardLevel(newLevel);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-primary text-center mb-6">
        Gestion des Cartes de {theme.name}
      </h2>

      {/* Form pour créer les Cartes */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Question de la Carte"
          value={newCardFront}
          onChange={(e) => setNewCardFront(e.target.value)}
          className="input input-bordered input-primary w-full"
        />
        <input
          type="text"
          placeholder="Réponse de la Carte"
          value={newCardBack}
          onChange={(e) => setNewCardBack(e.target.value)}
          className="input input-bordered input-primary w-full"
        />
        <button
          onClick={handleAddCard}
          className="btn btn-primary w-full"
        >
          Créer la Carte
        </button>
      </div>

      {/* Affichage des Cartes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {theme.cards.map((card) => (
          <div key={card.id} className="card card-bordered bg-neutral shadow-xl">
            <div className="card-body">
              {editingCardId === card.id ? (
                <div className="flex flex-col space-y-4">
                  <input
                    type="text"
                    value={editedCardFront}
                    onChange={(e) => setEditedCardFront(e.target.value)}
                    className="input input-bordered input-secondary w-full"
                  />
                  <input
                    type="text"
                    value={editedCardBack}
                    onChange={(e) => setEditedCardBack(e.target.value)}
                    className="input input-bordered input-secondary w-full"
                  />
                  <select
                    className="select select-bordered input-secondary w-full"
                    value={editedCardLevel} // On utilise ici editedCardLevel
                    onChange={(e) => handleLevelChange(parseInt(e.target.value, 10))}
                  >
                    {[1, 2, 3, 4].map((lvl) => (
                      <option key={lvl} value={lvl}>
                        Niveau {lvl}
                      </option>
                    ))}
                  </select>

                  <div className="flex space-x-4">
                    <button
                      onClick={handleSaveCard}
                      className="btn btn-success flex-1"
                    >
                      Sauvegarder
                    </button>
                    <button
                      onClick={() => setEditingCardId(null)}
                      className="btn btn-secondary flex-1"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <div>
                    <strong>Question:</strong> {card.front}
                    <br />
                    <strong>Réponse:</strong> {card.back}
                    <br />
                    <strong>Niveau:</strong> {card.level}
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEditCard(card.id, card.front, card.back, card.level)}
                      className="btn btn-info w-1/2"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleRemoveCard(card.id)}
                      className="btn btn-error w-1/2"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardManagement;
