# Profile SVG generator

`gen-profile-svgs.js` builds every animated SVG in `assets/` (header banner, neofetch terminal card, four project cards, footer). No dependencies.

```sh
node scripts/gen-profile-svgs.js .
```

Run it from the repo root. It overwrites `assets/*.svg` and prints each file's size and SHA-256 prefix. Commit the regenerated SVGs together with any script change.

## Where to edit

- Terminal info lines: `INFO` in `terminal()`
- Banner name, subtitle, typed command: `NAME`, `SUB`, `TYPED` in `header()` (the pixel font only has the letters it currently uses; add glyphs to `GLYPHS` for new ones)
- Project cards: `nxp()`, `sda()`, `doodle()`, `ghoti()`; title, tagline and chips are the `frame(...)` arguments
- Palette: constants at the top of `buildAll()` (brand greens from `docs/portfolio_memory.md`)

The ASCII portrait (`MAP` in `terminal()`) was sampled from the GitHub avatar at 64x35 cells: letters `a` (darkest) to `l` (brightest), `_` is background.

Everything is plain SVG with CSS/SMIL animation, so GitHub renders it in the README without scripts or external services.
