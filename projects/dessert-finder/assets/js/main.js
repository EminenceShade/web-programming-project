// Fetch and display multiple recipes when the page loads or if a search is performed
function loadRecipes(query = "") {
    const url = query 
        ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        : 'https://www.themealdb.com/api/json/v1/1/search.php?s='; // Get all recipes initially

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const recipes = data.meals || [];
            const recipesContainer = document.getElementById("recipes-container");
            recipesContainer.innerHTML = ""; // Clear any previous recipes

            recipes.forEach(recipe => {
                const recipeCard = document.createElement("div");
                recipeCard.classList.add("recipe-card");
                recipeCard.innerHTML = `
                    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                    <h3>${recipe.strMeal}</h3>
                `;

                recipeCard.addEventListener("click", () => {
                    localStorage.setItem("selectedRecipeId", recipe.idMeal);
                    window.location.href = "recipe.html"; // Navigate to recipe details page
                });

                recipesContainer.appendChild(recipeCard);
            });
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
            document.getElementById("recipes-container").innerHTML = "<p>An error occurred. Please try again later.</p>";
        });
}

// Load recipes on page load
window.onload = () => {
    loadRecipes(); // Show some default recipes on load
};

// Perform search when the user types
document.getElementById("search-input").addEventListener("input", (event) => {
    loadRecipes(event.target.value);
});
