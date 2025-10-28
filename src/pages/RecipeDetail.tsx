import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Recipe } from "../types";

const API_URL = import.meta.env.VITE_API_URL;


const RecipeDetail = () => {
  const { documentId } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/api/recipes?filters[documentId][$eq]=${documentId}&populate=*`);
        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }
        const data = await response.json();
        const item = data.data?.[0];
        if (!item) {
          throw new Error("Recipe not found");
        }


        const mapped: Recipe = {
          id: item.id,
          documentId: item.documentId,
          title: item.title,
          description: item.description,
          category: item.category || [],
          image: item.image?.url ? { url: item.image.url, alt: item.title } : { url: '', alt: item.title },
          ingredients: item.ingredients || [],
          instructions: item.instructions || [],
        };

        setRecipe(mapped);
      } catch (e: any) {
        setError(e?.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (documentId) {
      fetchRecipe();
    }
  }, [documentId]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error || !recipe) {
    return <div className="p-6 text-red-500">{error || "Recipe not found"}</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-4">
        <Link to="/recipes" className="text-blue-500 hover:underline">
          ← Back to recipes
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      {recipe.image && recipe.image.url && (
        <img src={recipe.image.url} alt={recipe.image.alt || recipe.title} className="w-full h-64 object-cover rounded-lg mb-4" />
      )}
      <p className="text-gray-700 mb-4">{recipe.description}</p>
      <div className="text-gray-700 mb-4">
        <h3 className="font-bold mb-2">Ingredients:</h3>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.children.map(child => child.children.map(c => c.text).join('')).join('')}</li>
          ))}
        </ul>
      </div>
      {/* {recipe.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map(tag => (
            <span key={tag} className="px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
              {tag}
            </span>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default RecipeDetail;


