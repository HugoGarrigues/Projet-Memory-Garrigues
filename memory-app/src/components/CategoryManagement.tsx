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
        selected: false,  
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
    <div className="max-w-4xl mx-auto p-6 bg-base-100">
      <h2 className="text-4xl font-bold text-violet-600 text-center mb-6">Gestion des Catégories</h2>

      {/* Form de création des catégories */}
      <div className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="Nom de la catégorie"
          className="input input-bordered w-3/4 bg-base-200 text-base-content"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          onClick={handleAddCategory}
          className="btn btn-primary w-1/4 text-white bg-violet-600 hover:bg-violet-700"
        >
          Créer la Catégorie
        </button>
      </div>

      {/* Affichage des catégories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="card card-bordered bg-base-200 text-base-content">
            <div className="card-body">
              {editingCategoryId === category.id ? (
                <div className="flex flex-col space-y-4">
                  <input
                    type="text"
                    value={editedCategoryName}
                    onChange={(e) => setEditedCategoryName(e.target.value)}
                    className="input input-bordered w-full bg-base-100 text-base-content"
                  />
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSaveCategory}
                      className="btn btn-success flex-1 bg-green-600 text-white hover:bg-green-700"
                    >
                      Sauvegarder
                    </button>
                    <button
                      onClick={() => setEditingCategoryId(null)}
                      className="btn btn-primary flex-1 bg-gray-600 text-white hover:bg-gray-700"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/creation/${category.id}`}
                      className="text-2xl font-semibold text-white-200 hover:text-violet-200 transition duration-300"
                    >
                      {category.name}
                    </Link>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEditCategory(category.id, category.name)}
                      className="btn btn-info w-1/2 bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleRemoveCategory(category.id)}
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

export default CategoryManagement;
