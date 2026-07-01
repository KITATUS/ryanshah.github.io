# ryanshah.co.uk

Personal site for Ryan Shah — Lead Technical Designer.

A self-contained static site (no build step). Served via GitHub Pages on the
custom domain [ryanshah.co.uk](https://ryanshah.co.uk) (see `CNAME`).

## Structure

| File / dir    | Purpose                                          |
| ------------- | ------------------------------------------------ |
| `index.html`  | Entry point; mounts the app into `#app`          |
| `app.js`      | Renders the UI from the data and handles routing |
| `data.js`     | All site content (copy, links, projects)         |
| `styles.css`  | Styles                                           |
| `assets/`     | Images (key art, headshot, OG card) — WebP + PNG |
| `assets/fonts/` | Self-hosted Oswald + Poppins (latin woff2)     |
| `assets/icons/` | Generated favicons / PWA icons                 |
| `favicon.ico` | Multi-resolution favicon (16/32/48)              |
| `site.webmanifest` | PWA manifest (name, icons, theme)          |
| `robots.txt` / `sitemap.xml` | Search-engine indexing            |
| `CNAME`       | Custom domain for GitHub Pages                   |
| `.nojekyll`   | Tells GitHub Pages to skip Jekyll and serve as-is|

SEO/social metadata (Open Graph, Twitter card, JSON-LD `Person`/`WebSite`,
canonical, theme-color) lives in the `<head>` of `index.html`. The favicons and
the `assets/og-image.png` social card are generated from the key-art images — to
regenerate, re-crop with ImageMagick (`magick`).

## Local preview

No build needed — serve the folder with any static server:

```sh
python -m http.server 8000
# then open http://localhost:8000
```

## Deploy

GitHub Pages serves the repository root. Push to the default branch and Pages
publishes automatically.

## Performance notes

- **Images** are served as resized WebP (art ~900px, headshot 320px) with the
  original PNGs kept as `<picture>` / `image-set()` fallbacks. Regenerate with
  ImageMagick, e.g. `magick art-about.png -resize 900x900 -quality 80 art-about.webp`.
- **Fonts** are self-hosted (latin subset woff2) instead of Google Fonts, which
  removes an external origin and the render-blocking font CSS. Oswald ships as a
  single variable woff2 (weights 300–700); Poppins is per-weight (400 + 500).
- `data.js` / `app.js` are `<link rel="preload" as="script">`-ed in the `<head>`
  so they fetch immediately rather than being discovered at end-of-body.
- **Caching:** GitHub Pages caps `Cache-Control` at ~10 min and offers no header
  control, so PageSpeed's "efficient cache lifetimes" finding can't be fixed
  directly — it's mitigated by the large payload reductions above.
