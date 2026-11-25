class FactPanel extends HTMLElement {
    static get observedAttributes() {
        return ["compact"];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "compact" && this.status) {
            this.status.hidden = this.hasAttribute("compact");
        }
    }

    connectedCallback() {
       

        const heading = document.createElement("h3");
        heading.textContent = "Random Facts";

        this.factText = document.createElement("p");

        this.nextButton = document.createElement("button");
        this.nextButton.type = "button";
        this.nextButton.textContent = "Next Fact";

        this.status = document.createElement("p");
        this.status.setAttribute("role", "status");

        this.appendChild(heading);
        this.appendChild(this.factText);
        this.appendChild(this.nextButton);
        this.appendChild(this.status);

        this.nextButton.addEventListener("click", () => {
            this.fetchFact();
        });

        this.fetchFact();
    }

    async fetchFact() {
        const response = await fetch(
            "https://uselessfacts.jsph.pl/api/v2/facts/random"
        );

        const data = await response.json();

        this.factText.textContent = data.text;
        this.status.textContent = "Random Fact Loaded.";
    
    }
}

customElements.define("fact-panel", FactPanel);

const panel = document.querySelector("fact-panel");
const toggleButton = document.querySelector("#toggle-mode");

toggleButton.addEventListener("click", () => {
    panel.toggleAttribute("compact");
});