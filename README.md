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
| `assets/`     | Images (key art, headshot, OG card)              |
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
