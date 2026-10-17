# atlas. — redesign concept

Local, standalone prototype inspired by Spline's restrained typography and interface style, with the compact personal-site feel of a bio page.

## Run

1. Unzip the archive.
2. Double-click **index.html**. Open in Chrome, Firefox, or Edge.

No npm, server, build step, or dependencies required.

## Files

- `index.html` — page structure.
- `styles.css` — design and responsive layout.
- `site.config.js` — project data, descriptions, links, stacks. **Edit this file to update projects.**
- `app.js` — project switcher, SVG artwork, animated highlighted word, live Moscow clock, scroll reveal, public GitHub events.
- `favicon.svg` — icon.

## Notes

- Everything except the live GitHub public activity works **offline**, including the Moscow clock (Europe/Moscow time zone, with seconds and date).
- Live activity fetches public GitHub events only when internet access is available; it displays a fallback link otherwise.
- SVG artwork in the interactive preview is procedural and local, not actual product screenshots.
- All existing public project descriptions and contact URLs came from `atlasru/atlasru.github.io`'s published `site.config.js` as of October 2026; descriptions are paraphrased for this design.
- Motion respects OS/browser **Reduce motion** preference.
- Prototype only. Your existing site or GitHub repo was **not modified**.

## Revision notes (v2)

- Replaced decorative `a.` card with actual Moscow time and date.
- Removed repetitive copy and unnecessary labels in header, hero, project switcher, about and footer.
- Replaced misaligned decorative diamond icons with aligned project numbers.
- Simplified mobile project preview controls; project tabs remain functional.