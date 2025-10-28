import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

type Recipe = {
  id: number;
  image?: string;
  title: string;
  description: string;
  // tags: string[];
  steps: string[];
  ingredients: string[];
};

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
        const response = await fetch(`http://localhost:1337/api/recipes?filters[documentId][$eq]=${documentId}&populate=*`);
        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }
        const data = await response.json();
        const item = data.data?.[0];
        if (!item) {
          throw new Error("Recipe not found");
        }
        const steps = item.steps
        .map((step: any) => step.children.map((child: any) => child.text).join(' '))
        .filter((text: string) => text.trim() !== '');

        const ingredients = item.ingredients
  .flatMap((ingredient: any) => 
    ingredient.children.map((child: any) => {
      if (child.type === 'list-item') {
        return child.children.map((c: any) => c.text).join(' ');
      }
      return child.text;
    })
  )
  .filter((text: string) => text.trim() !== '');


        const mapped: Recipe = {
          id: item.id,
          title: item.title,
          description: item.description,
          // tags: item.tag ? [item.tag] : [],
          image: item.image?.url ? `${item.image.url}` : undefined,
          steps,
          ingredients,
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
      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-lg mb-4" />
      )}
      <p className="text-gray-700 mb-4">{recipe.description}</p>
      <p className="text-gray-700 mb-4">{recipe.ingredients}</p>
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


