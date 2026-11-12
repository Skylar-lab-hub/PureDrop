# PureDrop Dairy – speed & accessibility rescue

A fast, responsive, accessible single-page website for PureDrop Dairy, built with **only HTML and CSS** (no JavaScript, no build step).

**Live site:** `https://<your-username>.github.io/puredrop-dairy/` (add after deploying)

## Files
- `index.html` – all three views (Home, Products, Contact)
- `style.css` – layout, responsive rules, form validation styles
- Photos are loaded live from Unsplash (free to use under the Unsplash License)
- `report/` – put `before.png` and `after.png` Lighthouse screenshots here

## How it works without JavaScript
| Brief asks for | Done here with |
|---|---|
| Router (no page reload) | CSS `:target` – nav links point to `#home`, `#products`, `#contact` and CSS shows the matching view |
| Products from `products.json` | Product cards written directly in `index.html` (fetch needs JS) |
| Hamburger menu at 768px | Hidden checkbox + label, shown under `max-width: 768px` |
| Images | Live Unsplash photos, requested as compressed WebP via the URL (`fm=webp`) |
| Lazy loading | Native `loading="lazy"` on product images |
| Live form validation | HTML5 attributes (`required`, `type=email`, `minlength`) + CSS `:user-invalid` / `:user-valid` |
| Code splitting (`import()`) | Not possible without JS. There is no JS to ship, so nothing to split |

## Local setup
Open the folder in VS Code and run **Live Server** on `index.html`, or just double-click `index.html`.

## Accessibility
`<header>`, `<nav>`, `<main>`, `<footer>` landmarks; one `h1`, then `h2`/`h3`; skip link; labels on every field; errors linked with `aria-describedby`; visible focus; contrast of 4.5:1 or better.



![Before](report/before.png) ![After](report/after.png)

## Deploy to GitHub Pages
1. Push to a public repo named `puredrop-dairy`.
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)` → Save.
3. Wait about a minute, then open the URL shown on that page.
