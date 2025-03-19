import React, { useState } from "react";

function Main() {
    
    const [ingredients, setIngredients] = useState([])
    
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        console.log(newIngredient)
        
        if (newIngredient.trim() !== "" && !ingredients.includes(newIngredient)) {
            setIngredients([...ingredients, newIngredient]); // Add new ingredient to the list
        }
    }

    const ingredientsListedItems = ingredients.map(ingredient => (<li key={ingredient}>{ingredient}</li>))

    return (
        <main className="container">
            {/* Ingredient Input Section */}
            <section className="ingredient-input">

                <form action={addIngredient}>

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

            {/* Ingredients List */}
            <section className="ingredients-list">
                <h2>Ingredients on hand:</h2>
                <ul>
                {ingredientsListedItems}
                </ul>
            </section>

            {/* Recipe Suggestion Section */}
            <aside className="recipe-suggestion">
                <div className="ready-for">
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button className="suggestion-button" type="button">GET RECIPE</button>
            </aside>
        </main>
    );
}

export default Main;