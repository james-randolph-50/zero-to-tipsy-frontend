import { Link } from "react-router-dom";
import type { Recipe as RecipeType } from "../types";

interface RecipeCardProps {
  recipe: RecipeType;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { image, title, description, documentId, category } = recipe;

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
          {category && category.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {category.map((tag) => (
                <span
                  key={tag}
                  className={"px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800"}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
