import { useState, useEffect } from 'react';
import { searchRecipes, Recipe } from '../services/recipeService';

const TestApi = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await searchRecipes('pasta', 5); // Test with a simple query
        console.log('API Response:', data); // Log the full response
        setRecipes(data.results);
        setError(null);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError('Failed to fetch recipes. Check console for details.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>API Test</h1>
      <pre>{JSON.stringify(recipes[0], null, 2)}</pre>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            {recipe.title} - Ready in {recipe.readyInMinutes} minutes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestApi;