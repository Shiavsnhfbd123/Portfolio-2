# Shivansh Aggarwal — Developer Portfolio

An upgrade of the existing React + TypeScript + Vite portfolio. All original profile data, projects, skills, education, certifications, contact details, and external URLs are retained in `src/data.ts`. The original résumé PDF is included without alteration.

## Run locally

Use Node.js 22.12+ (recommended) or 20.19+.

```bash
npm ci
npm run dev
```

Open the URL printed by Vite. If dependencies are already installed, start with `npm run dev`.

```bash
npm run check    # TypeScript validation
npm test         # TypeScript, production build, and four artifact checks
npm run build    # Production static site in dist/
npm run preview  # Preview dist/ locally
```

Serve the site over HTTP; opening `index.html` directly from the filesystem does not run the app.

## What changed

- A stronger editorial hero with sage accents, serif display typography, an updated portrait frame, and social icons.
- Download Resume and View Resume controls in both the Hero and About sections, plus a header résumé link.
- Coordinated dark and light themes with saved preferences and a small pre-paint script to prevent theme flashes.
- Responsive education cards, categorized skill panels, project cards with lightweight interface illustrations, a featured QueryPilot request diagram, certification rows, and a dedicated contact panel.
- Subtle entrance/reveal animations, pointer-only portrait tilt, hover feedback, an ambient gradient, reading progress, and a floating back-to-top link.
- Keyboard-accessible mobile navigation, Escape-to-close with focus restoration, labelled sections, active navigation, skip link, visible focus, and reduced-motion support.
- Metadata, Person structured data, a favicon, a no-JavaScript contact fallback, and relative asset paths for root and repository hosting.

No runtime or development dependencies were added. Prettier was used as a temporary authoring tool only. No services, forms, trackers, or backend are needed. Email controls open a chooser with Gmail, the default email application, and a copy-address option.

## Files

| File                                  | Purpose                                                                     |
| ------------------------------------- | --------------------------------------------------------------------------- |
| `src/App.tsx`                         | Sections, reusable controls, navigation, theme persistence, and progress    |
| `src/PhotoCard3D.tsx`                 | Existing portrait interaction, improved frame, base-aware photo path        |
| `src/index.css`                       | Theme tokens, responsive layouts, effects, reduced-motion rules             |
| `src/EmailContactDialog.tsx` | Shared accessible email chooser and clipboard fallback |
| `src/main.tsx`                        | Existing entry point plus bundled italic Fraunces font                      |
| `src/data.ts`                         | Original personal content, unchanged                                        |
| `public/Shivansh_Aggarwal_Resume.pdf` | Original supplied résumé, copied unchanged                                  |
| `public/favicon.svg`                  | Lightweight monogram favicon                                                |
| `index.html`                          | SEO metadata, theme initialization, and no-JavaScript fallback              |
| `vite.config.ts`                      | Existing plugins with `base: './'` for portable static assets               |
| `scripts/build.test.mjs`              | Checks relative build assets, PDF integrity, portrait/favicon, and metadata |
| `docs/VALIDATION.md`                  | Verification results and remaining limits                                   |

Existing screenshot files in `docs/` are retained as historical previews. Use the new preview images provided with the delivery to see the upgraded design.

## Content and design edits

Edit `src/data.ts` to update your profile, skills, schools, projects, credentials, or GitHub snapshot. Project descriptions and technology labels belong to their original projects; the existing Personal Developer Portfolio entry still describes the previously linked Next.js project, while this checkout uses Vite. The GitHub numbers are intentionally labelled as a manually maintained snapshot.

Replace `public/Shivansh_Aggarwal_Resume.pdf` to update your résumé later, keeping the filename. The build integrity test compares the public and deployed files, so replacing it does not require changing a hardcoded hash. Both résumé actions use this one file. Download uses the native same-origin `download` attribute; View opens it in a new tab. Mobile browser PDF and download handling follows the visitor's browser settings.

Theme colors live in `@theme` and `:root[data-theme="light"]` in `src/index.css`. Fonts are bundled locally through the existing Fontsource packages. Project visuals are CSS illustrations, not screenshots or claims about the exact live UI.

## Deploy

Run `npm test` before deploying. Publish the **contents of `dist/`**, including the PDF, photo, favicon, and assets folder.

### Vercel

1. Push the updated source to your repository and import it into Vercel.
2. Choose the Vite preset, build command `npm run build`, and output directory `dist`.
3. Deploy. No environment variables are required.

### Netlify

Import your repository, use `npm run build` and publish directory `dist`. Alternatively, build locally and drag the `dist` folder into Netlify's manual deploy interface.

### GitHub Pages (manual)

1. Run `npm run build`.
2. Put the contents of `dist/` at the root of a dedicated publishing branch such as `gh-pages`, keeping the source on your existing branch.
3. In repository Settings → Pages, select **Deploy from a branch**, choose that publishing branch and `/ (root)`, then save.

The relative Vite base and base-aware résumé/photo links support a repository URL such as `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`. No deployment workflow or additional repository permissions are included. This task prepares local source and build artifacts; it does not publish a live site.

Once you have your final deployment URL, add a canonical link and `og:url` in `index.html`, and change `og:image` / `twitter:image` to the absolute hosted photo URL for reliable social previews. Rebuild after those edits.

