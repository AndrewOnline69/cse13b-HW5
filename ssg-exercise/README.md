# Static Site Generation Exercise

This exercise uses Eleventy to generate two pages from
my personal portfolio using a shared footer.

## Installation

Install the required dependencies:

```bash
npm install
```

## Build

Generate the static HTML pages:

```bash
npx @11ty/eleventy
```

The generated files are stored in the `_site` folder.

## Local Preview

Start the local development server:

```bash
npx @11ty/eleventy --serve
```

Open the following pages:

- Home: http://localhost:8080/
- About: http://localhost:8080/about.html

## Shared Footer

Both pages use `src/_includes/footer.njk`.
Changing this file and rebuilding updates the footer
on both pages without editing them individually.