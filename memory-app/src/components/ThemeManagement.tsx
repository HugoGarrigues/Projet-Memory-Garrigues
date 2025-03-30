import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useMemoryStore from "../store/UseMemoryStore";

const ThemeManagement = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { categories, addTheme, removeTheme, updateTheme, selectTheme } = useMemoryStore();
  const [newTheme, setNewTheme] = useState<string>(""); 
  const [revisionLevels, setRevisionLevels] = useState<number>(1); 
  const [newCardsPerDay, setNewCardsPerDay] = useState<number>(10);

  const [editingThemeId, setEditingThemeId] = useState<number | null>(null);
  const [editedThemeName, setEditedThemeName] = useState<string>(""); 
  const [editedRevisionLevels, setEditedRevisionLevels] = useState<number>(1); 
  const [editedNewCardsPerDay, setEditedNewCardsPerDay] = useState<number>(10); 

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
        revisionLevels: revisionLevels,
        newCardsPerDay: newCardsPerDay,
      };
      addTheme(category.id, theme);
      setNewTheme("");
      setRevisionLevels(1);
      setNewCardsPerDay(10);
    }
  };

  const handleEditTheme = (themeId: number, themeName: string, revisionLevels: number, newCardsPerDay: number) => {
    setEditingThemeId(themeId);
    setEditedThemeName(themeName);
    setEditedRevisionLevels(revisionLevels);
    setEditedNewCardsPerDay(newCardsPerDay);
  };

  const handleSaveTheme = () => {
    if (editedThemeName.trim() !== "") {
      const updatedTheme = {
        id: editingThemeId!,
        name: editedThemeName,
        categoryId: category.id,
        cards: category.themes.find(theme => theme.id === editingThemeId)?.cards || [],
        selected: category.themes.find(theme => theme.id === editingThemeId)?.selected || false,
        revisionLevels: editedRevisionLevels,
        newCardsPerDay: editedNewCardsPerDay,
      };
      updateTheme(category.id, editingThemeId!, updatedTheme);
      setEditingThemeId(null);
      setEditedThemeName("");
      setEditedRevisionLevels(1); 
      setEditedNewCardsPerDay(10);
    }
  };

  const handleRemoveTheme = (themeId: number) => {
    removeTheme(category.id, themeId);
  };

  const handleRevisionLevelsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value)); 
    setRevisionLevels(Math.min(value, 4)); 
  };

  const handleNewCardsPerDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value)); 
    setNewCardsPerDay(Math.min(value, 10)); 
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100">
      <h2 className="text-4xl font-bold text-violet-600 text-center mb-6">
        Créer un Thème pour {category.name}
      </h2>

      {/* Formulaire pour ajouter des thèmes */}
      <div className="mb-6 flex flex-col space-y-4">
        <div>
          <label className="block text-lg font-semibold text-violet-600">Nom du thème</label>
          <input
            type="text"
            placeholder="Nom du thème"
            value={newTheme}
            onChange={(e) => setNewTheme(e.target.value)}
            className="input input-bordered w-full bg-base-200 text-base-content"
          />
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-lg font-semibold text-violet-600">Niveaux de révision (max 4)</label>
            <input
              type="number"
              placeholder="Niveaux de révision (max 4)"
              value={revisionLevels}
              onChange={handleRevisionLevelsChange}
              className="input input-bordered w-full bg-base-200 text-base-content"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-lg font-semibold text-violet-600">Cartes nouvelles par jour (max 10)</label>
            <input
              type="number"
              placeholder="Cartes nouvelles par jour (max 10)"
              value={newCardsPerDay}
              onChange={handleNewCardsPerDayChange}
              className="input input-bordered w-full bg-base-200 text-base-content"
            />
          </div>
        </div>

        <button
          onClick={handleAddTheme}
          className="btn btn-primary bg-violet-600 text-white hover:bg-violet-700"
        >
          Créer le Thème
        </button>
      </div>

      {/* Liste des thèmes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.themes.map((theme) => (
          <div key={theme.id} className="card card-bordered bg-base-200 text-base-content shadow-xl">
            <div className="card-body">
              {editingThemeId === theme.id ? (
                <div className="flex flex-col space-y-4">
                  <div>Nom du thème</div>
                  <input
                    type="text"
                    value={editedThemeName}
                    onChange={(e) => setEditedThemeName(e.target.value)}
                    className="input input-bordered w-full bg-base-100 text-base-content"
                  />

                  {/* Révision Levels */}
                  <div>
                    <label className="text-violet-600">Niveaux de révision</label>
                    <input
                      type="number"
                      value={editedRevisionLevels}
                      min={1}
                      max={4} // Limite de 4 niveaux de révision
                      onChange={(e) => setEditedRevisionLevels(Number(e.target.value))}
                      className="input input-bordered w-full bg-base-100 text-base-content"
                    />
                  </div>

                  {/* Nouvelles cartes par jour */}
                  <div>
                    <label className="text-violet-600">Nouvelles cartes par jour</label>
                    <input
                      type="number"
                      value={editedNewCardsPerDay}
                      min={1}
                      max={10} 
                      onChange={(e) => setEditedNewCardsPerDay(Number(e.target.value))}
                      className="input input-bordered w-full bg-base-100 text-base-content"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={handleSaveTheme}
                      className="btn btn-success bg-green-600 text-white hover:bg-green-700 flex-1"
                    >
                      Sauvegarder
                    </button>
                    <button
                      onClick={() => setEditingThemeId(null)}
                      className="btn btn-primary bg-gray-600 text-white hover:bg-gray-700 flex-1"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/creation/${category.id}/${theme.id}`}
                      className="text-2xl font-semibold text-white-200 hover:text-violet-200 transition duration-300"
                    >
                      {theme.name}
                    </Link>
                    <input
                      type="checkbox"
                      checked={theme.selected}
                      onChange={() => handleSelectTheme(theme.id)}
                      className="checkbox checkbox-violet-600"
                    />
                  </div>
                  {/* Informations sous le nom du thème */}
                  <div className="mt-2 text-sm text-neutral-content">
                    <p><strong>Niveaux de révision:</strong> {theme.revisionLevels} / 4</p>
                    <p><strong>Cartes nouvelles par jour:</strong> {theme.newCardsPerDay} / 10</p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEditTheme(theme.id, theme.name, theme.revisionLevels, theme.newCardsPerDay)}
                      className="btn btn-info w-1/2 bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleRemoveTheme(theme.id)}
                      className="btn btn-error w-1/2 bg-red-600 text-white hover:bg-red-700"
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
