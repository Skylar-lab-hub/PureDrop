# PureDrop Dairy – speed & accessibility rescue

A fast, responsive, accessible single-page website for PureDrop Dairy, a home milk-delivery business. It is built with plain HTML, CSS and a little vanilla JavaScript: no build step and no frameworks.

## Live site
**https://YOUR-USERNAME.github.io/YOUR-REPO/** (replace with your own link after enabling GitHub Pages)

To view it: open the link in any browser. Use the menu to switch between Home, Products and Contact. Links such as `/#products` also work directly.

## Features
- **Hash router** (`router.js`): switches views without page reloads; Back/Forward and deep links work.
- **Code splitting:** Products and Contact are fetched as HTML fragments and their scripts (`products.js`, `contact.js`) are loaded with `import()` only when the user opens that page.
- **Products:** `products.json` is fetched and cards are built from a `<template>`.
- **Contact form:** live validation as the user types, with clear error messages.
- **Responsive:** hamburger menu at 768px, flexible product grid.

## Files
| File | Purpose |
|---|---|
| `index.html` | Landmarks, Home view, empty shells for Products and Contact |
| `style.css` | Layout, responsive rules, form states, colour variables |
| `router.js` | Hash router and on-demand loading of view code |
| `products.html`, `products.js`, `products.json` | Products view, card rendering, data |
| `contact.html`, `contact.js` | Contact view and live validation |
| `report/` | Lighthouse screenshots (`before.png`, `after.png`) |

## Local setup
`fetch()` and `import()` do not work from `file://`, so do **not** double-click `index.html`.
1. Download or clone the repository.
2. Open the folder in VS Code and run **Live Server**, or run `python -m http.server` in the folder.
3. Visit `http://localhost:8000` (or the address Live Server shows).

## Performance outcomes
- Images are served as **WebP** (quality 70) at the size they are shown, from Unsplash.
- Product images use `loading="lazy"`. The hero image is not lazy and has `fetchpriority="high"` so the main content appears first.
- Every image has `width` and `height`, which prevents layout shift.
- Product and contact code is loaded only when needed (`import()`).
- No frameworks or libraries.

**Lighthouse (Mobile):** see `report/before.png` and `report/after.png`.

| Category | Before | After |
|---|---|---|
| Performance | ___ | ___ |
| Accessibility | ___ | ___ |
| Best Practices | ___ | ___ |
| SEO | ___ | ___ |

## Accessibility outcomes
- Landmarks: `<header>`, `<nav aria-label="Main">`, `<main>`, `<footer>`, plus a skip link.
- Each view has one `h1`; Home continues `h2` → `h3`; product names are `h2` under the Products `h1`.
- Colour contrast meets WCAG AA: text ≥ 4.5:1 (for example ink on background 12.9:1, accent on white 6.5:1); focus ring and field borders ≥ 3:1.
- Contact form: a label on every field, errors linked with `aria-describedby`, `aria-invalid`, errors announced with `aria-live`, and focus moves to the first invalid field on submit.
- Keyboard: skip link, logical Tab order, visible focus, menu opens with Space, focus moves to the new heading after each page change.
- axe DevTools result: ___ issues found, ___ fixed (add your own result).

## Credits
Photos from Unsplash (free to use under the Unsplash License).
