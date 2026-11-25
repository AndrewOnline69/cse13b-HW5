class FactPanel extends HTMLElement {
    static get observedAttributes() {
        return ["compact"];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "compact" && this.description) {
            this.description.hidden = this.hasAttribute("compact");
        }
    }

    connectedCallback() {
        this.description = document.createElement("p");
        this.description.textContent =
            "Discover random facts from the Useless Facts API.";   

        const heading = document.createElement("h3");
        heading.textContent = "Random Facts";

        this.factText = document.createElement("p");

        this.nextButton = document.createElement("button");
        this.nextButton.type = "button";
        this.nextButton.textContent = "Next Fact";

        this.status = document.createElement("p");
        this.status.setAttribute("role", "status");

        this.appendChild(heading);
        this.appendChild(this.description);
        this.appendChild(this.factText);
        this.appendChild(this.nextButton);
        this.appendChild(this.status);

        this.nextButton.addEventListener("click", () => {
            this.fetchFact();
        });

        this.description.hidden = this.hasAttribute("compact");
        this.fetchFact();
    }

    async fetchFact() {
        this.status.textContent = "Loading fact...";
        this.nextButton.disabled = true;

        try {
            const response = await fetch(
                "https://uselessfacts.jsph.pl/api/v2/facts/random"
            );

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const data = await response.json();

            if (typeof data?.text !== "string" || !data.text.trim()) {
                throw new Error("Invalid fact data.");
            }

            this.factText.textContent = data.text;
            this.status.textContent = "Random fact loaded.";

        } 
    
        catch (error) {
            this.status.textContent =
                "Could not load a fact. Please try again.";

            console.error(error);

            }

        finally {
            this.nextButton.disabled = false;
        }
    }
}

customElements.define("fact-panel", FactPanel);

const panel = document.querySelector("fact-panel");
const toggleButton = document.querySelector("#toggle-mode");
const storageKey = "hw5-fact-panel-mode";

function applyMode(compact) {
    panel.toggleAttribute("compact", compact);

    toggleButton.textContent = compact
        ? "Switch to Expanded Mode"
        : "Switch to Compact Mode";
}

// Restore saved preference
let savedMode = "expanded";

try {
    const storedMode = localStorage.getItem(storageKey);

    if (storedMode === "compact" || storedMode === "expanded") {
        savedMode = storedMode;
    }
} catch (error) {
    console.warn("Could not read saved preference.", error);
}

applyMode(savedMode === "compact");
toggleButton.hidden = false;

// Change and save preference
toggleButton.addEventListener("click", () => {
    const compact = !panel.hasAttribute("compact");

    applyMode(compact);

    try {
        localStorage.setItem(
            storageKey,
            compact ? "compact" : "expanded"
        );
    } catch (error) {
        console.warn("Could not save preference.", error);
    }
});