import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { AnimatePresence, motion } from "framer-motion";
import { fetchRecipes } from "../lib/strapi";
import type { Recipe } from "../types";

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRecipes()
      .then(setRecipes)
      .catch((error) => console.error("Failed to fetch recipes:", error));
  }, []);

  // Filter recipes by search text
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.description.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Recipes</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded p-2 mb-4 w-full"
      />

      {/* Recipes grid */}
      <AnimatePresence mode="wait">
        <motion.div layout className="grid grid-cols-2 gap-6">
          {filteredRecipes.map((recipe) => (
            <motion.div key={recipe.id} layout>
              <RecipeCard recipe={recipe} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredRecipes.length === 0 && (
        <p className="text-center mt-6 text-gray-500">No recipes found.</p>
      )}
    </div>
  );
};

export default Recipes;
