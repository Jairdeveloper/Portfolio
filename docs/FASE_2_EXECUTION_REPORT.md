# Reporte de Ejecución — Fase 2

### Acciones realizadas: acabado profesional (SEO, accesibilidad, responsive, tooling)

**Fecha:** 2026-08-02
**Basado en:** [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md) (Fase 2)

---

## Resumen

Se ejecutaron las **5 tareas de Fase 2** (2.1 a 2.5). Todas están completas — a diferencia
de Fase 1, ninguna dependía del contenido real que sigues recopilando (Fase 0), salvo dos
detalles puntuales (favicon y `og:image`) que quedan explícitamente marcados como
pendientes por decisión tuya. `npm run build` y `npx eslint .` corren limpios después de
todos los cambios. Los cambios quedaron en **4 commits separados**, siguiendo la misma
lógica de Fase 1: cada uno revisable de forma independiente.

---

## Decisiones tomadas interactivamente

1. **Favicon** → pendiente. No se generó ninguno; queda un `TODO` en `index.html` para
   cuando tengas un logo/imagen que prefieras usar.
2. **`og:image`** → se añaden `og:title`/`og:description`/`og:type`/`og:url` ahora (mejora
   inmediata de la vista previa al compartir el link); `og:image` queda con `TODO`
   explícito hasta que tengas una foto real (Fase 0).
3. **Quitar `dist/` de git (2.4)** → confirmado, se ejecutó.
4. **ESLint + Prettier (2.5)** → confirmado instalar y aplicar `--fix`/`--write` en esta
   misma sesión, no solo dejar la configuración lista.

---

## 2.1 — SEO básico en `index.html`

- `<html lang="en">` → `<html lang="es">` (el contenido real está en español).
- `<title>Portfolio</title>` → `<title>Jair Flores — Desarrollador Frontend</title>`.
- Se añadió `<meta name="description">` con una frase real (no copiada del Hero, que
  sigue siendo un placeholder pendiente de Fase 0).
- Se añadieron `og:type`, `og:url`, `og:title`, `og:description`.
- `og:image` y el favicon quedan con comentarios `TODO` explícitos en el propio
  `index.html`, señalando qué falta y por qué (necesitan un asset real).
- **Nota técnica para cuando se complete el TODO de imagen:** cualquier ruta absoluta en
  `index.html` (favicon, `og:image`) debe incluir el prefijo `/Portfolio/` o ser relativa,
  por el `base: '/Portfolio/'` de `vite.config.js` — el mismo gotcha que ya rompió el CV
  en algún momento si no se tiene en cuenta.

## 2.2 — Accesibilidad

- **Contraste (verificado con cálculo real WCAG, no solo a ojo):** se detectó que el
  estado `hover` de los botones del Hero (`hover:bg-graydark` + `text-dark`) daba
  **3.53:1**, por debajo del mínimo AA de 4.5:1 para texto normal. Se cambió a
  `hover:bg-dark hover:text-lightgray` (**10.31:1**, cómodamente AA). El resto de combos
  de la paleta custom (`dark` sobre `lightgray`/`gray`/blanco) ya estaban en 8:1–14:1, sin
  cambios necesarios.
- **Foco visible:** se añadieron clases `focus:ring` a todos los enlaces/botones que no
  tenían ningún estado de foco: nav del Header, enlaces del Footer, `SocialIcon`, botones
  del Hero, links "Ver proyecto" de Projects, "Leer más" de Blog, botón "Enviar" de
  Contacto.
- **Teclado:** la miniatura de proyecto en `Projects.vue` reaccionaba solo a click de
  mouse (`<img @click="...">`, sin foco ni rol semántico) — ahora tiene
  `role="button" tabindex="0"` y responde también a Enter/Espacio.
- **`alt` descriptivo:** `Hero.vue` tenía `alt=""` vacío → ahora describe lo que la imagen
  mostrará ("Foto de Jair Flores, desarrollador Frontend"). `Contacto.vue` tenía
  `alt="Contacto"` (genérico) → "Ilustración de la sección de contacto". Los demás
  `<img>` (Projects, Blog) ya usaban `:alt` dinámico y descriptivo desde Fase 1.
- Mejora menor adicional, no pedida explícitamente pero de bajo riesgo: se añadió
  `rel="noopener noreferrer"` a los links de `SocialIcon.vue` (usan `target="_blank"` sin
  esa protección, a diferencia de los links de Projects.vue que ya la tenían).

## 2.3 — Menú responsive en el Header

- `Header.vue` (antes sin ningún `<script>`, plantilla estática) ahora usa
  `<script setup>` con un `ref(false)` (`open`) de Composition API. El nav de escritorio
  (`hidden md:flex`) no cambia; aparece un botón de hamburguesa (`md:hidden`) que
  despliega un segundo `<nav>` apilado verticalmente por debajo del breakpoint `md`,
  con `aria-expanded`/`aria-controls` para lectores de pantalla.
- El nav mobile se cierra automáticamente al hacer click en cualquier link
  (`@click="open = false"` en el contenedor), para que no quede abierto tras navegar.

## 2.4 — `dist/` fuera del control de versiones

- `git rm -r --cached dist/` + `dist/` añadido a `.gitignore`, en un commit separado
  (confirmado explícitamente antes de ejecutarse). Los archivos siguen en disco;
  `npm run deploy` los sigue regenerando y publicando en `gh-pages` exactamente igual,
  solo dejan de aparecer en los commits de código fuente.

## 2.5 — ESLint + Prettier

- Instalado `eslint`, `eslint-plugin-vue`, `prettier`, `eslint-config-prettier` según
  `docs/LINTING_RECOMMENDATIONS.md`. Config añadida: `eslint.config.mjs` (se usó `.mjs` en
  vez de `.js` para evitar un warning de Node sobre tipo de módulo, sin tener que añadir
  `"type": "module"` a `package.json` — eso habría roto `tailwind.config.js` y
  `postcss.config.js`, que usan CommonJS) y `.prettierrc`. Scripts `npm run lint` /
  `npm run format` añadidos.
- **Corrida de `eslint --fix`:** encontró 8 errores reales de la regla
  `vue/multi-word-component-names` (evita que un componente tenga el mismo nombre que un
  futuro elemento HTML nativo). Se corrigieron añadiendo un nombre explícito multi-palabra
  a cada componente (`AboutSection`, `BlogSection`, `ContactForm`, `AppFooter`,
  `AppHeader`, `HeroSection`, `HomeView`, `ProjectsSection`) **sin renombrar ningún
  archivo ni tocar imports** — es un cambio interno del componente, no de su ubicación.
- **Bug real encontrado de paso:** al corregir esto se detectó que `Foother.vue` **seguía**
  con `name: "Contacto"` — el bug de copiar/pegar exacto que señalaba
  `OBSERVATIONS.md` y que la tarea 1.8 de Fase 1 debía haber corregido junto con las URLs
  sociales. Se corrigió a `name: "AppFooter"` en esta sesión.
- **Corrida de `prettier --write .`:** al no acotar el alcance, tocó de más:
  `.github/workflows/deploy.yml` (pipeline de CI/CD) y dos archivos ajenos al proyecto
  (`prompt.md`, `.claude/skills/deploy/SKILL.md`). Se revirtió el cambio al workflow de
  CI/CD (no estaba autorizado tocar eso en esta sesión) y se creó `.prettierignore`
  (`dist/`, `.github/`, `.claude/`, `prompt.md`) para que no vuelva a pasar. Se verificó
  que el contenido de `prompt.md`/`.claude/` no perdió información (solo pudo normalizarse
  espaciado/wrap de línea, no hay forma de "revertir" esos dos porque nunca estuvieron
  versionados en git, pero se confirmó que el contenido sigue íntegro).

---

## Verificación técnica

- `npm run build` — compila sin errores tras cada uno de los 4 commits.
- `npx eslint .` — sin errores ni warnings.
- Cálculo manual de contraste WCAG (fórmula de luminancia relativa) sobre los 4 colores
  custom de Tailwind (`gray`, `graydark`, `lightgray`, `dark`) y sus combinaciones reales
  en el código — no una revisión solo visual.
- No se ejecutó `npm run deploy`, ni se hizo push a `origin`. Todo quedó en 4 commits
  locales sobre `main`.

## Commits de esta sesión

1. `Fase 2: SEO básico, accesibilidad y menú responsive` (2.1, 2.2, 2.3)
2. `Fase 2 (2.4): quitar dist/ del control de versiones`
3. `Fase 2 (2.5a): instalar y configurar ESLint + Prettier`
4. `Fase 2 (2.5b): aplicar ESLint --fix y Prettier --write`

## Pendientes explícitos (requieren tu contenido o decisión, no código)

| Ítem | Dónde | Qué falta |
|---|---|---|
| Favicon | `index.html` | Logo/imagen que quieras usar en la pestaña |
| `og:image` | `index.html` | Foto/imagen real para la vista previa al compartir |

Ambos son de una línea cuando tengas el asset — no requieren tocar más código.

## Nota

Fase 2 completa el checklist técnico de "listo para compartir el link" del spec §11 en lo
que depende de código. Lo que falta para marcar ese checklist como 100% completo sigue
siendo el contenido real de Fase 0 (frase del Hero, CV, proyectos, fotos, redes sociales),
ya identificado en `docs/FASE_1_EXECUTION_REPORT.md`.
