---
name: deploy
description: Build and publish the portfolio site to GitHub Pages via the gh-pages branch. User-triggered only — this pushes to a public branch.
disable-model-invocation: true
---

Run `npm run deploy` from the repo root. This runs `vite build` (output to `dist/`) and
then publishes `dist/` to the `gh-pages` branch via the `gh-pages` npm package, which
GitHub Pages serves from.

Before running:

- Check `git status` — uncommitted changes to source files won't be part of the deploy
  unless committed first (the deploy only publishes the build output, not source).
- Confirm the user actually wants to publish now; this is a real push to a branch GitHub
  Pages serves live traffic from.

After running, report success/failure and remind the user the live site is at
https://jairdeveloper.github.io/Portfolio/ (may take a minute to update via GitHub Pages'
CDN cache).
