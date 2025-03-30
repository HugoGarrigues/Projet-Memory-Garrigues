import { useState, useEffect } from "react";
import { Category } from "../types/category";
import { Theme } from "../types/theme";
import { Card } from "../types/card";
// Changement de techno, je suis passé de Zustand à du useState pour gérer le state de l'application car il m'étais impossible d'utiliser la fonction create() de Zustand 

const useMemoryStore = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  // Utilisation de useEffect qui va permettre de récupérer les catégories sauvegardées dans le localStorage
  useEffect(() => {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  // Permet ici de sauvegarder les catégories dans le localStorage
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem("categories", JSON.stringify(categories));
    } else {
      localStorage.removeItem("categories");
    }
  }, [categories]);

  // Permet d'ajouter une catégorie
  const addCategory = (category: Category) => {
    setCategories((prev) => [...prev, category]);
  };

  // Permet d'ajouter un thème dans une catégorie
  const addTheme = (categoryId: number, theme: Theme) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              themes: [
                ...category.themes,
                {
                  ...theme,
                  revisionLevels: Math.min(theme.revisionLevels ?? 1, 4), 
                  newCardsPerDay: Math.min(theme.newCardsPerDay ?? 10, 10), 
                },
              ],
            }
          : category
      )
    );
  };

  // Ajoute une carte dans un thème
  const addCard = (themeId: number, card: Card) => {
    setCategories((prev) =>
      prev.map((category) => ({
        ...category,
        themes: category.themes.map((theme) =>
          theme.id === themeId ? { ...theme, cards: [...theme.cards, card] } : theme
        ),
      }))
    );
  };

  // Supprime une carte d'un thème
  const removeCard = (themeId: number, cardId: number) => {
    setCategories((prev) =>
      prev.map((category) => ({
        ...category,
        themes: category.themes.map((theme) =>
          theme.id === themeId ? { ...theme, cards: theme.cards.filter((card) => card.id !== cardId) } : theme
        ),
      }))
    );
  };

  // Supprime un thème d'une catégorie
  const removeTheme = (categoryId: number, themeId: number) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? { ...category, themes: category.themes.filter((theme) => theme.id !== themeId) }
          : category
      )
    );
  };

  // Supprime une catégorie
  const removeCategory = (categoryId: number) => {
    setCategories((prev) => prev.filter((category) => category.id !== categoryId));
  };

  // Modifie une catégorie
  const updateCategory = (categoryId: number, newName: string) => {
    setCategories((prev) =>
      prev.map((category) => (category.id === categoryId ? { ...category, name: newName } : category))
    );
  };

  // Modifie un thème
  const updateTheme = (categoryId: number, themeId: number, updatedTheme: Theme) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              themes: category.themes.map((theme) =>
                theme.id === themeId
                  ? {
                      ...theme,
                      name: updatedTheme.name,
                      revisionLevels: Math.min(updatedTheme.revisionLevels ?? theme.revisionLevels, 4),
                      newCardsPerDay: Math.min(updatedTheme.newCardsPerDay ?? theme.newCardsPerDay, 10), 
                    }
                  : theme
              ),
            }
          : category
      )
    );
  };
  // Modifie une carte
  const updateCard = (cardId: number, updatedCard: Card) => {
    setCategories((prev) =>
      prev.map((category) => ({
        ...category,
        themes: category.themes.map((theme) => ({
          ...theme,
          cards: theme.cards.map((card) => (card.id === cardId ? { ...card, ...updatedCard } : card)),
        })),
      }))
    );
  };

  // Récupère les cartes à réviser (ne prend pas en compte les niveaux de révision)
  const getCardsToReview = (): Card[] => {
    return categories.flatMap((category) =>
      category.themes.flatMap((theme) => theme.cards)
    );
  };

  // Sélectionne et/ou désélectionne un thème
  const selectTheme = (categoryId: number, themeId: number) => {
    setCategories((prev) =>
      prev.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            themes: category.themes.map((theme) =>
              theme.id === themeId ? { ...theme, selected: !theme.selected } : theme
            ),
          };
        }
        return category;
      })
    );
  };

  return {
    // Fonctions pour la gestion des catégories, thèmes et cartes
    categories,
    addCategory,
    addTheme,
    addCard,
    removeCard,
    removeTheme,
    removeCategory,
    updateCategory,
    updateTheme,
    updateCard,
    selectTheme,
    // Fonction pour récupérer les cartes à réviser
    getCardsToReview,
  };
};

export default useMemoryStore;
