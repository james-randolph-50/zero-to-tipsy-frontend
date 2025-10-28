export interface RichTextChild {
    type: string;
    text?: string;
    children?: RichTextChild[];
    [key: string]: any;
  }

export interface ListItem {
    type: "list-item";
    children: RichTextChild[];
  }
  
  export interface ListBlock {
    type: "list";
    format: "ordered" | "unordered";
    children: ListItem[];
  }
  
  export interface RecipeImage {
    url: string;
    alt?: string;
    [key: string]: any; // optional other fields from Cloudinary
  }
  
  export interface Recipe {
    id: number;
    documentId: string;
    title: string;
    description: string;
    category: string[]; // array of one or more strings
    ingredients: ListBlock[];
    instructions: ListBlock[];
    image: RecipeImage;
    video?: string | null;
  }