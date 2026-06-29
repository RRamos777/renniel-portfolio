# Renniel Ramos — Polished Developer Portfolio

A polished, minimalist developer portfolio for Renniel Ramos, built with React, Vite, and plain CSS.

This version is intentionally less template-looking than a basic portfolio. It uses a strong editorial layout, sticky navigation, large typography, selected work cards, experience timeline, stack matrix, and process section.

## Local Development

```bash
npm install
npm run dev
```

Open the local URL shown in your terminal, usually `http://localhost:5173`.

## Build

```bash
npm run build
```

The production build will be generated in the `dist` folder.

## Deploy to Vercel

Recommended settings:

```txt
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

## Edit Portfolio Content

Most content is inside:

```txt
src/main.jsx
```

Update these fields when needed:

```js
const profile = {
  email: 'renniel.ramos0701@gmail.com',
  github: 'https://github.com/RRamos777',
  linkedin: 'https://www.linkedin.com/in/renniel-ramos-78853123a/',
}
```

## Notes

- The phone number from the resume is intentionally hidden for public safety.
- GitHub is linked, but project cards are written as case studies because the GitHub profile currently has no public repositories.
- The design avoids heavy gradients, flashy effects, and generic "vibe-coded" visuals.
