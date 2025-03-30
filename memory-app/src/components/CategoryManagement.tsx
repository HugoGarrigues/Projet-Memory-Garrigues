import { useState } from "react";
import { Link } from "react-router-dom";
import useMemoryStore from "../store/UseMemoryStore";

const CategoryManagement = () => {
  const { categories, addCategory, removeCategory, updateCategory } = useMemoryStore(); 
  const [newCategory, setNewCategory] = useState<string>("");

  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editedCategoryName, setEditedCategoryName] = useState<string>("");

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      const category = {
        id: Date.now(),
        name: newCategory,
        themes: [],
      };
      addCategory(category);
      setNewCategory("");
    }
  };

  const handleEditCategory = (categoryId: number, categoryName: string) => {
    setEditingCategoryId(categoryId);
    setEditedCategoryName(categoryName);
  };

  const handleSaveCategory = () => {
    if (editedCategoryName.trim() !== "") {
      updateCategory(editingCategoryId!, editedCategoryName);
      setEditingCategoryId(null);
      setEditedCategoryName("");
    }
  };

  const handleRemoveCategory = (categoryId: number) => {
    removeCategory(categoryId);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-primary text-center mb-6">Gestion des Catégories</h2>

      {/* Form dde création des catégories */}
      <div className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="Nom de la catégorie"
          className="input input-bordered input-primary w-3/4"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          onClick={handleAddCategory}
          className="btn btn-primary w-1/4"
        >
          Créer la Catégorie
        </button>
      </div>

      {/* Affichage des catégories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="card card-bordered bg-neutral">
            <div className="card-body">
              {editingCategoryId === category.id ? (
                <div className="flex flex-col space-y-4">
                  <input
                    type="text"
                    value={editedCategoryName}
                    onChange={(e) => setEditedCategoryName(e.target.value)}
                    className="input input-bordered input-secondary w-full"
                  />
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSaveCategory}
                      className="btn btn-success flex-1"
                    >
                      Sauvegarder
                    </button>
                    <button
                      onClick={() => setEditingCategoryId(null)}
                      className="btn btn-secondary flex-1"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link
                    to={`/creation/${category.id}`}
                    className="text-2xl font-semibold text-accent hover:text-accent-focus"
                  >
                    {category.name}
                  </Link>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEditCategory(category.id, category.name)}
                      className="btn btn-info  w-1/2"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleRemoveCategory(category.id)}
                      className="btn btn-secondary w-1/2"
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

export default CategoryManagement;
