# Priti Waradkar — Portfolio

An interactive personal portfolio with two complete looks, dark and light, switched by pulling a hanging cord in the top-right corner.

Built with React, TypeScript, Vite, Tailwind CSS, GSAP, Framer Motion and Lenis.

## Run it

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

## Build for hosting

```bash
npm run build
```

The finished site is written to `dist/`. Upload the contents of `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages). No server code is needed.

## Edit the content

Every fact on the site lives in **`src/data/portfolio.ts`**: name, links, roles, stats, skills, projects, experience and education. Change it there and the whole site follows.

Other things you may want to change:

| What | Where |
|---|---|
| Résumé PDF (download buttons) | `public/assets/Priti_Waradkar_Resume.pdf` |
| Theme colours (dark and light) | top of `src/index.css` |
| Hero portrait (transparent cut-out, 930 × 1359) | `public/assets/hero-priti.webp` |
| Figure in the Skills orbits (transparent cut-out, 544 × 1505) | `public/assets/orbit-priti.webp` |

## How the site is put together

| File | What it does |
|---|---|
| `src/components/PullCord.tsx` | The pull cord that switches dark / light mode |
| `src/lib/theme.ts` | Theme switching, saved between visits, with the circular reveal |
| `src/components/Hero.tsx`, `HeroFigure.tsx` | Hero with the giant name and the portrait |
| `src/components/Expertise.tsx`, `fx/TechOrbit.tsx` | Skills, with the figure at the centre of three skill orbits |
| `src/components/Projects.tsx`, `ProjectVisual.tsx` | Project cards and detail overlays |
| `src/components/Experience.tsx` | Work timeline, education and core competencies |
| `src/components/Contact.tsx` | Contact links and footer |

## Notes

- The portraits are transparent cut-outs, so they sit directly on the page in both themes.
- Visitors who have "reduce motion" turned on get no auto-animation; the cord still works.
