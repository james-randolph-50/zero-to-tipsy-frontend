import { Link } from "react-router-dom";
import type { Recipe as RecipeType } from "../types";

interface RecipeCardProps {
  recipe: RecipeType;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { image, title, description, documentId } = recipe;

  // Build a URL for the detail page using documentId
  const recipeUrl = `/recipes/${documentId}`;

  return (
    <Link to={recipeUrl} className="block transition hover:scale-[1.01] duration-300">
      <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg cursor-pointer transition">
        {image?.url && (
          <img src={image.url} alt={title} className="w-full h-48 object-cover" />
        )}
        <div className="p-4 flex flex-col gap-2">
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
