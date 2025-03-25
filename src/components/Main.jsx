import React, { useState } from "react";
import IngredientsList from './IngredientsList';  // Component to display added ingredients
import Recipe from './Recipe';                    // Component to display the AI-generated recipe
import { generateRecipeFromOllama } from '../ai/ollama';  // Local AI function using Ollama

function Main() {
  // === React State Variables ===

  const [ingredients, setIngredients] = useState([]); // Holds the list of ingredients

  const [recipe, setRecipe] = useState(false); // Holds the generated recipe (Markdown string)

  const [loading, setLoading] = useState(false); // Controls button loading state (prevents spam)

  // === Function to Add Ingredient from Form ===
  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient"); // Get value from input field
    console.log(newIngredient);

    // Add if not empty and not already in list
    if (newIngredient.trim() !== "" && !ingredients.includes(newIngredient)) {
      setIngredients([...ingredients, newIngredient]);
    }
  }

  // === Function to Call Local AI (Ollama) ===
  async function getRecipe() {
    setLoading(true); // Show "Generating..." on button
    try {
      const markdown = await generateRecipeFromOllama(ingredients); // Send ingredients to Ollama
      setRecipe(markdown); // Save recipe to state
    } catch (err) {
      alert("Failed to generate recipe: " + err.message);
    } finally {
      setLoading(false); // Re-enable button
    }
  }

  return (
    <main className="container">

      {/* ====== INGREDIENT INPUT FORM ====== */}
      <section className="ingredient-input">
        <h2>👋 Welcome to Chef Claude!</h2>
        <p>Just add at least 3 ingredients, and Chef Claude will whip up a delicious recipe just for you.</p>
        
        {/* Form to input ingredients */}
        <form onSubmit={(e) => {
          e.preventDefault(); // Prevent page refresh
          addIngredient(new FormData(e.target)); // Pass form data
          e.target.reset(); // Clear input field
        }}>
          <input 
            type="text" 
            name="ingredient" 
            autoComplete="off" 
            className="ingredient" 
            placeholder="e.g. oregano" 
            aria-label="Add ingredient"
          />
          <button type="submit" className="button">
            Add ingredient
          </button>
        </form>
      </section>

      {/* ====== INGREDIENTS LIST ====== */}
      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} />
      )}

      {/* ====== RECIPE SUGGESTION BUTTON ====== */}
      {ingredients.length >= 3 && (
        <aside className="recipe-suggestion">
          <div className="ready-for">
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>

          <button 
            onClick={getRecipe} 
            className="suggestion-button" 
            type="button"
            disabled={loading} // Prevent multiple clicks
          >
            {loading ? "Generating..." : "GET RECIPE"}
          </button>
        </aside>
      )}

      {/* ====== GENERATED RECIPE DISPLAY ====== */}
      {recipe && (
        <Recipe recipe={recipe} /> //recipe is the markdown string, and getRecipe is a function — but your <Recipe /> component is expecting a recipe prop, not a function.
      )}

    </main>
  );
}

export default Main;
