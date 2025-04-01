// Load the selected recipe details when the page loads
function loadRecipeDetails() {
    const recipeId = localStorage.getItem("selectedRecipeId");

    // If no recipe ID is found, show an error message
    if (!recipeId) {
        document.getElementById("recipe-details").innerHTML = "<p>Recipe not found.</p>";
        return;
    }

    // Fetch recipe details from TheMealDB API
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
        .then(response => response.json())
        .then(data => {
            const recipe = data.meals[0];

            // Log the YouTube URL to debug
            console.log("YouTube URL: ", recipe.strYoutube);

            // Prepare the ingredients list (without numbering)
            const ingredients = [];
            for (let i = 1; i <= 20; i++) {
                if (recipe[`strIngredient${i}`] && recipe[`strMeasure${i}`]) {
                    ingredients.push(`${recipe[`strMeasure${i}`]} ${recipe[`strIngredient${i}`]}`);
                }
            }

            // Prepare the instructions list
            const instructions = recipe.strInstructions.split("\n").map(line => `<li>${line}</li>`).join("");

            // YouTube Video Embed - Check if a valid YouTube link is provided
            const youtubeEmbedCode = recipe.strYoutube ? getYouTubeEmbedCode(recipe.strYoutube) : "<p>No video available for this recipe.</p>";

            // Populate the recipe details section
            document.getElementById("recipe-details").innerHTML = `
                <h2>${recipe.strMeal}</h2>
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="recipe-image">

                <h3>Ingredients:</h3>
                <ul class="ingredients-list">
                    ${ingredients.map(item => `<li>${item}</li>`).join('')}
                </ul>

                <h3>Instructions:</h3>
                <ol class="instructions">
                    ${instructions}
                </ol>

                <h3>Watch the Recipe:</h3>
                ${youtubeEmbedCode}
            `;
        })
        .catch(error => {
            console.error("Error fetching recipe details:", error);
            document.getElementById("recipe-details").innerHTML = "<p>Failed to load recipe details. Try again later.</p>";
        });
}

// Extract YouTube video ID from URL
function getYouTubeVideoID(url) {
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/?([^"&?\/\s]{11}))).*/;
    const match = url.match(regExp);
    return match && match[1];  // Return the video ID
}

// Generate embed code for YouTube video
function getYouTubeEmbedCode(url) {
    const videoID = getYouTubeVideoID(url);
    if (videoID) {
        return `
            <div class="youtube-video">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoID}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `;
    } else {
        return "<p>No valid YouTube video found.</p>";
    }
}

// Go back to the previous page
function goBack() {
    window.history.back();
}

// Call loadRecipeDetails when the page loads (Only if the recipe page is loaded)
if (window.location.pathname.includes('recipe.html')) {
    loadRecipeDetails();
}
