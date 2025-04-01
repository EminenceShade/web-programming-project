document.addEventListener("DOMContentLoaded", function() {
    console.log("Portfolio Loaded");

    // Add interactive hover effects
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.boxShadow = "0px 0px 20px rgba(0, 0, 0, 0.15)";
        });
        card.addEventListener("mouseleave", () => {
            card.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.1)";
        });
    });

    // Hover effect on skills icons
    const skillIcons = document.querySelectorAll(".skills-container img");
    skillIcons.forEach(icon => {
        icon.addEventListener("mouseenter", () => {
            icon.style.transform = "scale(1.1)";
        });
        icon.addEventListener("mouseleave", () => {
            icon.style.transform = "scale(1)";
        });
    });
});
