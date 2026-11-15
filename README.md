# PureDrop Dairy – speed & accessibility rescue

A fast, responsive, accessible single-page website for PureDrop Dairy, built with plain HTML, CSS and a little vanilla JavaScript (no build step, no frameworks).

**Live site:** `https://<your-username>.github.io/puredrop-dairy/` (add after deploying)

## Files
- `index.html` – landmarks, Home view, and empty shells for Products and Contact
- `style.css` – layout, responsive rules, form states, colour variables
- `router.js` – hash router; fetches view fragments and loads view scripts with `import()`
- `products.html` / `products.js` / `products.json` – Products view, cards and data
- `contact.html` / `contact.js` – Contact view and live form validation
- `report/` – `before.png`, `after.png` (Lighthouse) and `axe.png` (axe DevTools)

## Accessibility
- Landmarks: `<header>`, `<nav aria-label="Main">`, `<main>`, `<footer>`; skip link to `<main>`.
- Heading order: every view has one `h1`; Home continues `h2` → `h3`; product names are `h2` under the Products `h1`.
- Colour contrast (WCAG AA): text ≥ 4.5:1 (ink/bg 12.9, accent/white 6.5, error/bg 6.9, muted/bg 7.0); borders and focus ring ≥ 3:1 (focus ring changed from gold 2.2:1 to blue 6.0:1).
- Contact form: labels on every field, errors linked with `aria-describedby`, `aria-invalid`, messages announced with `aria-live`, focus moves to the first invalid field on submit.
- Keyboard: skip link works, logical Tab order, visible focus, hamburger opens with Space, route changes move focus to the new `h1`.

## Local setup
`fetch()` and `import()` do not work from `file://`. Open the folder in VS Code and run **Live Server**, or run `python -m http.server` and visit `http://localhost:8000`.
