// Function to toggle between dark and light mode
function toggleDarkMode() {
    // Toggle the dark mode class on the body
    document.body.classList.toggle("dark-mode");

    // Save the user's preference in localStorage
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
}

// Check if dark mode was previously enabled and apply it
window.addEventListener("load", function() {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "true") {
        document.body.classList.add("dark-mode");
    }
});

// Add event listener to the dark mode toggle button
const darkModeToggleButton = document.getElementById("darkModeToggle");
if (darkModeToggleButton) {
    darkModeToggleButton.addEventListener("click", toggleDarkMode);
}

