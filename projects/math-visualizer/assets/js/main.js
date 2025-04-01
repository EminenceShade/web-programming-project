// Initialize Desmos Calculator
var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt, {
    settingsMenu: false,
    expressions: true,
    branding: false
});

// Update Graph Styling
calculator.updateSettings({
    colors: Desmos.Colors.DARK,
    xAxisColor: "#00ffcc",
    yAxisColor: "#ff3366"
});

// Function to Generate Falling Stars
function createFallingStars() {
    for (let i = 0; i < 50; i++) {  // Number of stars
        let star = document.createElement("div");
        star.classList.add("stars");
        document.body.appendChild(star);

        let startX = Math.random() * window.innerWidth;  // Random horizontal position
        let duration = Math.random() * 3 + 2;  // Speed variation

        // Start from above the screen and fall to the bottom
        star.style.left = `${startX}px`;
        star.style.top = `${-40 + Math.random() * -200}px`; // Start above the screen

        // Adjust animation duration for each star
        star.style.animationDuration = `${duration + Math.random()}s`;

        // Remove star after animation
        setTimeout(() => {
            star.remove();
        }, duration * 1000);
    }
}

// Generate stars every 0.5s for a chaotic effect
setInterval(createFallingStars, 500);
