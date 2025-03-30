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
      localStorage.removeItem("categories");  // Ajout de cette ligne parce que j'avais une erreur qui faisait que je ne pouvais pas supprimer toutes les catégories 
    }
  }, [categories]);
  

  // Permet d'ajouter une catégorie
  const addCategory = (category: Category) => {
    setCategories((prevCategories) => [...prevCategories, category]);
  };

  // Permet d'ajouter un thème dans une catégorie
  const addTheme = (categoryId: number, theme: Theme) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? { ...category, themes: [...category.themes, theme] }
          : category
      )
    );
  };

  // Permet d'ajouter une carte dans un thème
  const addCard = (themeId: number, card: Card) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        themes: category.themes.map((theme) =>
          theme.id === themeId
            ? { ...theme, cards: [...theme.cards, card] }
            : theme
        ),
      }))
    );
  };

  //  supprimer une carte d'un thème
  const removeCard = (themeId: number, cardId: number) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        themes: category.themes.map((theme) =>
          theme.id === themeId
            ? { ...theme, cards: theme.cards.filter((card) => card.id !== cardId) }
            : theme
        ),
      }))
    );
  };

  // Supprime un thème d'une catégorie
  const removeTheme = (categoryId: number, themeId: number) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? { ...category, themes: category.themes.filter((theme) => theme.id !== themeId) }
          : category
      )
    );
  };

  // Supprime une catégorie
  const removeCategory = (categoryId: number) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== categoryId)
    );
  };

  // Modifie une catégorie
  const updateCategory = (categoryId: number, newName: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId ? { ...category, name: newName } : category
      )
    );
  };

  // Modifie un thème
  const updateTheme = (categoryId: number, themeId: number, newName: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              themes: category.themes.map((theme) =>
                theme.id === themeId ? { ...theme, name: newName } : theme
              ),
            }
          : category
      )
    );
  };

  // Modifie une carte
  const updateCard = (cardId: number, updatedCard: Card) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        themes: category.themes.map((theme) => ({
          ...theme,
          cards: theme.cards.map((card) =>
            card.id === cardId ? { ...card, ...updatedCard } : card
          ),
        })),
      }))
    );
  };

  // Ici je retourne toutes les infos nécessaires pour gérer les catégories, thèmes et cartes depuis les composants
  return {
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
  };
};

export default useMemoryStore;
