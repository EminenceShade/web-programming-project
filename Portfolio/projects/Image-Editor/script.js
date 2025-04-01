// Select elements from the DOM
const chooseImageBtn = document.getElementById('chooseImageBtn');
const imageInput = document.createElement('input');
const imageCanvas = document.getElementById('imageCanvas');
const ctx = imageCanvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

// Image filters
const brightnessSlider = document.getElementById('brightness');
const contrastSlider = document.getElementById('contrast');
const saturationSlider = document.getElementById('saturation');
const hueSlider = document.getElementById('hue');
const blurSlider = document.getElementById('blur');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');

let image = new Image(); // Store the uploaded image
let originalImageData = null; // Store the original image data for resetting

imageInput.type = 'file';
imageInput.accept = 'image/*';

// Enable file selection by clicking the button
chooseImageBtn.addEventListener('click', () => {
    imageInput.click();
});

// Handle image selection and preview
imageInput.addEventListener('change', function() {
    const file = imageInput.files[0];

    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            image.src = e.target.result;
        };
        
        reader.readAsDataURL(file);
        
        image.onload = function() {
            // Resize canvas for display
            imageCanvas.width = 400;
            imageCanvas.height = 300;
            ctx.drawImage(image, 0, 0, 400, 300);

            // Save original image data
            originalImageData = ctx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);

            // Enable download button
            downloadBtn.disabled = false;
        };
    } else {
        alert("Please upload an image first.");
    }
});

// Apply filters when sliders change
function applyFilters() {
    if (!originalImageData) return;

    // Reset to original before applying new filters
    ctx.putImageData(originalImageData, 0, 0);

    let brightness = brightnessSlider.value + "%";
    let contrast = contrastSlider.value + "%";
    let saturation = saturationSlider.value + "%";
    let hue = hueSlider.value + "deg";
    let blur = blurSlider.value + "px";

    imageCanvas.style.filter = `brightness(${brightness}) contrast(${contrast}) saturate(${saturation}) hue-rotate(${hue}) blur(${blur})`;
}

// Listen for filter changes
brightnessSlider.addEventListener("input", applyFilters);
contrastSlider.addEventListener("input", applyFilters);
saturationSlider.addEventListener("input", applyFilters);
hueSlider.addEventListener("input", applyFilters);
blurSlider.addEventListener("input", applyFilters);

// Reset Filters
resetFiltersBtn.addEventListener("click", function() {
    brightnessSlider.value = 100;
    contrastSlider.value = 100;
    saturationSlider.value = 100;
    hueSlider.value = 0;
    blurSlider.value = 0;
    
    applyFilters();
});

// Enable downloading the edited image
downloadBtn.addEventListener('click', function() {
    const imageUrl = imageCanvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'edited-image.png';
    link.click();
});
