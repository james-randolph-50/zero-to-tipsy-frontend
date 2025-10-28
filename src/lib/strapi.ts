const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

export async function fetchRecipes() {
  const res = await fetch(`${STRAPI_URL}/api/recipes?populate=*`);

  if (!res.ok) {
    throw new Error(`Failed to fetch recipes: ${res.status}`);
  }

  const data = await res.json();
  return data.data; // Strapi wraps everything in { data: [...] }
}
