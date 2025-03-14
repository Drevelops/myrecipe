
import axios, { AxiosInstance } from 'axios';

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  vegetarian: boolean;
  cuisines: string[];
}

interface SearchResponse {
  results: Recipe[];
  totalResults: number;
  offset: number;
  number: number;
}

// You'll need to sign up for a free API key from Spoonacular or similar
const API_KEY = import.meta.env.VITE_API_KEY; 
const BASE_URL = 'https://api.spoonacular.com/recipes';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

export const searchRecipes = async (query: string, number: number = 10): Promise<SearchResponse> => {
  try {
    const response = await apiClient.get<SearchResponse>('/complexSearch', {
      params: {
        query,
        number,
        addRecipeInformation: true, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

export type { Recipe, SearchResponse };