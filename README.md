# CSE 134B Homework 5

## Web Component

The Random Facts Web Component is located on the
Experiments page (`experiments.html`).

The component retrieves random facts from the Useless
Facts API and supports compact and expanded display modes.

## Design Note

The visitor's goal is to discover random facts without
having to leave or reload the webpage.

When the visitor clicks Next Fact, an event listener
calls an asynchronous function that uses fetch() to
request data from the Useless Facts API.

While waiting, the component displays a loading message
and disables the Next Fact button.

On success, the component validates the response and
updates the displayed fact using textContent.

If the request fails, the component displays an error
message, preserves the previous fact, and allows the
visitor to retry without reloading the page.

The component supports the portfolio's light and dark
themes through CSS custom properties. The selected
display mode is saved using localStorage. If storage
is unavailable, the display mode still works for the
current page.

## Static Site Generation

The Eleventy exercise is located in `ssg-exercise/`.

The two generated pages are:

- Home (index.html)
- About (about.html)

Both pages use a shared footer. Installation, build,
and preview instructions are provided in
`ssg-exercise/README.md`.