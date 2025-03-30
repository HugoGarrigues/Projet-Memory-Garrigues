import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useMemoryStore from "../store/UseMemoryStore";

const ThemeManagement = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { categories, addTheme, removeTheme, updateTheme, selectTheme } = useMemoryStore();
  const [newTheme, setNewTheme] = useState<string>("");

  const [editingThemeId, setEditingThemeId] = useState<number | null>(null);
  const [editedThemeName, setEditedThemeName] = useState<string>("");

  const category = categories.find((cat) => cat.id.toString() === categoryId);

  if (!category) {
    return <div className="text-error text-center">Category not found!</div>;
  }

  const handleSelectTheme = (themeId: number) => {
    selectTheme(category.id, themeId); 
  };

  const handleAddTheme = () => {
    if (newTheme.trim() !== "") {
      const theme = {
        id: Date.now(),
        name: newTheme,
        categoryId: category.id,
        cards: [],
        selected: false,  
      };
      addTheme(category.id, theme);
      setNewTheme("");
    }
  };

  const handleEditTheme = (themeId: number, themeName: string) => {
    setEditingThemeId(themeId);
    setEditedThemeName(themeName);
  };

  const handleSaveTheme = () => {
    if (editedThemeName.trim() !== "") {
      updateTheme(category.id, editingThemeId!, editedThemeName);
      setEditingThemeId(null);
      setEditedThemeName("");
    }
  };

  const handleRemoveTheme = (themeId: number) => {
    removeTheme(category.id, themeId);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-primary text-center mb-6">
        Gestion des Thèmes de {category.name}
      </h2>

      {/* Formulaire pour ajouter des thèmes */}
      <div className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="Nom du thème"
          value={newTheme}
          onChange={(e) => setNewTheme(e.target.value)}
          className="input input-bordered input-primary w-3/4"
        />
        <button
          onClick={handleAddTheme}
          className="btn btn-primary w-1/4"
        >
          Créer le Thème
        </button>
      </div>

      {/* Liste des thèmes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.themes.map((theme) => (
          <div key={theme.id} className="card card-bordered bg-neutral shadow-xl">
            <div className="card-body">
              {editingThemeId === theme.id ? (
                <div className="flex flex-col space-y-4">
                  <input
                    type="text"
                    value={editedThemeName}
                    onChange={(e) => setEditedThemeName(e.target.value)}
                    className="input input-bordered input-secondary w-full"
                  />
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSaveTheme}
                      className="btn btn-success flex-1"
                    >
                      Sauvegarder
                    </button>
                    <button
                      onClick={() => setEditingThemeId(null)}
                      className="btn btn-secondary flex-1"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={theme.selected}
                      onChange={() => handleSelectTheme(theme.id)} 
                      className="checkbox checkbox-primary"
                    />
                    <Link
                      to={`/creation/${category.id}/${theme.id}`}
                      className="text-2xl font-semibold text-accent hover:text-accent-focus"
                    >
                      {theme.name}
                    </Link>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEditTheme(theme.id, theme.name)}
                      className="btn btn-info w-1/2"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleRemoveTheme(theme.id)}
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

export default ThemeManagement;
