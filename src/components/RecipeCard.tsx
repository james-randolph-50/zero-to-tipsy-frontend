import { Link } from "react-router-dom";

type Recipe = {
  id: number;
  image?: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
};

type RecipeCardProps = {
  recipe: Recipe;
};

  const tagColors: Record<string, string> = {
    Boozy: "bg-red-200 text-red-800",
    Refreshing: "bg-blue-200 text-blue-800",
    Batch: "bg-yellow-200 text-yellow-800",
    Mocktail: "bg-green-200 text-green-800",
    Warm: "bg-orange-200 text-orange-800",
    Shot: "bg-purple-200 text-purple-800",
  };

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { image, title, description, tags, url } = recipe;
  return (
    <>
    <Link to={url ?? '#'} className="block transition hover:scale-[1.01] duration-300">
      <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg cursor-pointer transition">
        {image && (
          <img src={image} alt={title} className="w-full h-48 object-cover" />
        )}
        <div className="p-4 flex flex-col gap-2">
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`px-2 py-1 rounded-full text-xs font-medium ${tagColors[tag] || "bg-gray-200 text-gray-800"}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      </Link>
    </>
  );
};

export default RecipeCard