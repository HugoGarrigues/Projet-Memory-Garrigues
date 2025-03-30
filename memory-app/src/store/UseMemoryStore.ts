import { useState, useEffect } from "react";
import { Category } from "../types/category";
import { Theme } from "../types/theme";
import { Card } from "../types/card";
// Changement de techno, je suis passé de Zustand à du useState pour gérer le state de l'application car il m'étais impossible d'utiliser la fonction create() de Zustand 

const useMemoryStore = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCardsToday, setNewCardsToday] = useState(0);

  // Utilisation de useEffect qui va permettre de récupérer les catégories sauvegardées dans le localStorage
  useEffect(() => {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }

    const savedNewCardsToday = localStorage.getItem("newCardsToday");
    if (savedNewCardsToday) {
      setNewCardsToday(JSON.parse(savedNewCardsToday));
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

  useEffect(() => {
    localStorage.setItem("newCardsToday", JSON.stringify(newCardsToday));
  }, [newCardsToday]);

  // Permet d'ajouter une catégorie
  const addCategory = (category: Category) => {
    setCategories((prev) => [...prev, category]);
  };

  // Permet d'ajouter un thème dans une catégorie
  const addTheme = (categoryId: number, theme: Theme) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId ? { ...category, themes: [...category.themes, theme] } : category
      )
    );
  };

  // Permet d'ajouter une carte dans un thème
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

  //  supprimer une carte d'un thème
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
  const updateTheme = (categoryId: number, themeId: number, newName: string) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              themes: category.themes.map((theme) => (theme.id === themeId ? { ...theme, name: newName } : theme)),
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

  // Récupérer les cartes à réviser ( ne prend pas en compte les niveaux de révision )
  const getCardsToReview = (): Card[] => {
    return categories.flatMap(category =>
      category.themes.flatMap(theme =>
        theme.cards
      )
    );
  };

  // Fonction pour sélectionner une catégorie (une seule à la fois)
  const selectCategory = (categoryId: number) => {
    setCategories((prev) =>
      prev.map((category) => ({
        ...category,
        selected: category.id === categoryId, // Si l'ID correspond, la catégorie est sélectionnée
      }))
    );
  };

    // Permet de sélectionner et ou désélectionner un thème
    const selectTheme = (categoryId: number, themeId: number) => {
      setCategories((prev) =>
        prev.map((category) => {
          if (category.id === categoryId) {
            return {
              ...category,
              themes: category.themes.map((theme) =>
                theme.id === themeId
                  ? { ...theme, selected: !theme.selected }  
                  : theme
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
    selectCategory,  
    selectTheme,   
    // Fonction pour récupérer les cartes à réviser
    getCardsToReview,
 
  };
};

export default useMemoryStore;
