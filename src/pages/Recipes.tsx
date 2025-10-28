import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { AnimatePresence, motion } from "framer-motion";  
import { fetchRecipes } from "../lib/strapi";

type Recipe = {
  id: number;
  documentId: string;
  image?: string;
  title: string;
  description: string;
  category: string[];
  tags?: string[];
  instructions: any[];
  ingredients: any[];
  url?: string;
};

// const allCategories = ["Boozy", "Refreshing", "Batch", "Mocktail", "Warm", "Shot"];

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchRecipes()
      .then(setRecipes)
      .catch((error) => console.error("Failed to fetch recipes:", error));
  }, []);
  // Filter recipes by search text and selected tags
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.description.toLowerCase().includes(search.toLowerCase());

    // const matchesTags =
    //   selectedCategories.length === 0 ||
    //   selectedCategories.every((category) =>
    //     recipe.category.some(
    //       (recipeCategory) => recipeCategory.toLowerCase() === category.toLowerCase()
    //     )
    //   );

    return matchesSearch;
  });

  // const toggleTag = (tag: string) => {
  //   setSelectedCategories((prev) =>
  //     prev.includes(tag)
  //       ? prev.filter((t) => t !== tag)
  //       : [...prev, tag]
  //   );
  // };

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

      {/* Tags filter */}
      {/* <div className="flex gap-2 mb-6 flex-wrap">
        {allCategories.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded border ${
              selectedCategories.includes(tag)
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {tag}
          </button>
        ))}
      </div> */}

      {/* Recipes grid */}
      <AnimatePresence mode="wait">
        <motion.div layout className="grid grid-cols-2 gap-6">
          {filteredRecipes.map((recipe) => (
            <motion.div key={recipe.id} layout>
              <RecipeCard
                recipe={{
                  ...recipe,
                  url: `/recipes/${recipe.documentId}`,
                }}
              />
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
