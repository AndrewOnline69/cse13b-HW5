
const form = document.querySelector("#contact-form");

const fields = [
    document.querySelector("#name"),
    document.querySelector("#email"),
    document.querySelector("#comments")
];

const editedFields = new Set();
const visitedFields = new Set();
let submitAttempted = false;

// Check a field and return an error message
function validateField(field) {
    field.setCustomValidity("");

    let message = "";

    if (field.validity.valueMissing) {
        message = `Please enter your ${field.name}.`;
    } else if (field.validity.typeMismatch) {
        message = "Please enter a valid email address.";
    } else if (field.validity.tooShort) {
        message = `Please enter at least ${field.minLength} characters.`;
    }

    field.setCustomValidity(message);
    return message;
}

// Show or hide a field's error message
function updateField(field) {
    const message = validateField(field);
    const errorElement = document.querySelector(
        `#${field.id}-error`
    );

    const showError = submitAttempted ||
                      visitedFields.has(field.id);

    errorElement.textContent = showError ? message : "";
    errorElement.hidden = !showError || !message;

    if (showError && message) {
        field.setAttribute("aria-invalid", "true");
    } else {
        field.removeAttribute("aria-invalid");
    }
}

// Update the form's error summary
function updateSummary() {
    const summary = document.querySelector(
        "#form-error-summary"
    );
    const list = document.querySelector(
        "#form-error-list"
    );

    list.replaceChildren();

    fields.forEach(function (field) {
        const error = document.querySelector(
            `#${field.id}-error`
        );

        if (!error.hidden) {
            const item = document.createElement("li");
            item.textContent = `${field.name.charAt(0).toUpperCase() + field.name.slice(1)}: ${error.textContent}`;
            list.appendChild(item);
        }
    });

    summary.hidden = list.children.length === 0;
}

// Check fields as the user interacts with them
fields.forEach(function (field) {
    field.addEventListener("input", function () {
        editedFields.add(field.id);
        updateField(field);
        updateSummary();
    });

    field.addEventListener("blur", function () {
        if (editedFields.has(field.id)) {
            visitedFields.add(field.id);
            updateField(field);
            updateSummary();
        }
    });
});


/* Form Error History */

// Store errors from unsuccessful submissions
const form_errors = [];

const formErrorsInput = document.querySelector("#form-errors");

// Record invalid fields during submission
form.addEventListener("invalid", function (event) {
    submitAttempted = true;

    fields.forEach(updateField);
    updateSummary();

    const field = event.target;

    if (fields.includes(field)) {
        const message = validateField(field);

        form_errors.push({
            field: field.name,
            message: message || field.validationMessage
        });
    }
}, true);

// Send error history when the form is valid
form.addEventListener("submit", function () {
    formErrorsInput.value = JSON.stringify(form_errors);
});

/* Comments Character Counter */

const commentsField = document.querySelector("#comments");
const commentsInfo = document.querySelector("#comments-info");

const characterLimit = commentsField.maxLength;
const warningThreshold = 100;

function updateCharacterCounter() {
    const remaining = characterLimit - commentsField.value.length;

    commentsInfo.hidden = false;

    if (remaining === 0) {
        commentsInfo.textContent = "Character limit reached! 0 characters remaining.";
        commentsInfo.classList.add("length-warning");
    } else if (remaining <= warningThreshold) {
        commentsInfo.textContent =
            `Warning: Only ${remaining} characters remaining.`;
        commentsInfo.classList.add("length-warning");
    } else {
        commentsInfo.textContent =
            `${remaining} characters remaining.`;
        commentsInfo.classList.remove("length-warning");
    }
}

commentsField.addEventListener("input", updateCharacterCounter);

updateCharacterCounter();


