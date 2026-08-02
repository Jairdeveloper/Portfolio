# Linting & Formatting Recommendations

Status: **not yet applied** — this document describes what to set up when ready, it does
not change the project now. The repo currently has no ESLint, Prettier, or any other
lint/format tooling.

## Recommended stack

- **ESLint** with `eslint-plugin-vue` (Vue 3 rules) — catches unused variables, missing
  `key` in `v-for`, reactivity mistakes, and other Vue-specific bugs early.
- **Prettier** — consistent formatting (quotes, semicolons, indentation) without manual
  bikeshedding.
- **eslint-config-prettier** — disables ESLint's own formatting rules so it doesn't fight
  with Prettier.

## Packages to add (devDependencies)

```
npm install -D eslint eslint-plugin-vue prettier eslint-config-prettier
```

## Suggested config: `eslint.config.js` (flat config, matches ESLint 9+)

```js
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  ...pluginVue.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    rules: {
      // project-specific overrides go here
    },
  },
]
```

## Suggested config: `.prettierrc`

```json
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100
}
```

Adjust `semi`/`singleQuote` to match whatever style already dominates `src/` — the
codebase currently mixes conventions across files.

## npm scripts to add to `package.json`

```json
"lint": "eslint . --fix",
"format": "prettier --write ."
```

## Rollout notes

- The current codebase has some inconsistency (mixed Composition/Options API style,
  Spanish/English mixed naming, a stray asset file). Running `--fix` for the first time
  will likely touch most files — do that as its own commit, separate from feature work,
  so the diff is reviewable.
- Once installed, a `PostToolUse` hook running `eslint --fix`/`prettier --write` on
  edited files would be a natural follow-up (see `.claude/settings.local.json` for the
  existing hook pattern used in this repo).
