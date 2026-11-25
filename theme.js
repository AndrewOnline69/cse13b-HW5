/* Light and Dark Theme Switching */

const themeToggle = document.querySelector("#theme-toggle");
const root = document.documentElement;

let currentTheme = "light";

// Load the user's saved preference
try {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
        currentTheme = savedTheme;
    }
} catch (error) {
    console.warn("Unable to load theme preference.");
}

// Apply a theme to the webpage
function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    if (themeToggle) {
        themeToggle.textContent = theme === "dark"
            ? "Switch to Light Mode"
            : "Switch to Dark Mode";
    }
}

// Apply the saved or default theme
applyTheme(currentTheme);

if (themeToggle) {
    themeToggle.hidden = false;

    
/* Theme Switching with View Transitions */

themeToggle.addEventListener("click", function () {
    const newTheme = currentTheme === "light"
        ? "dark"
        : "light";

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Update the theme
    function changeTheme() {
        currentTheme = newTheme;
        applyTheme(currentTheme);
    }

    // Use View Transition API when supported
    if (document.startViewTransition && !reducedMotion) {
        document.startViewTransition(changeTheme);
    } else {
        // Fallback without animation
        changeTheme();
    }

    // Save the selected theme
    try {
        localStorage.setItem("theme", newTheme);
    } catch (error) {
        console.warn("Unable to save theme preference.");
    }
});

}
