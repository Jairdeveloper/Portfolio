# Plan de puesta en mantenimiento (moratoria) — Portfolio

### Propuesta para mostrar un aviso de mantenimiento en la URL pública

**Versión:** 1.0 · **Fecha:** 2026-11-24 · **Estado:** propuesta (no se ha modificado código)

> Alcance: la URL pública `https://jairdeveloper.github.io/Portfolio/` debe mostrar un
> mensaje claro de mantenimiento durante la moratoria, sin sacar el sitio fuera de servicio
> ni borrar el historial de la rama `gh-pages`. Este documento describe **cómo** hacerlo;
> su ejecución queda para una sesión posterior.

---

## 1. Resumen ejecutivo

| Decisión               | Detalle                                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Estrategia recomendada | Flag de compilación `VITE_MAINTENANCE_MODE` + vista `Maintenance.vue`, desplegada por el workflow existente.                    |
| Tiempo de ejecución    | 30–45 min (Fases 1–3), sin contar la espera de propagación de caché de GitHub Pages (hasta ~10 min).                            |
| Reversibilidad         | Alta: cambiar una variable del repositorio, relanzar el workflow y verificar. Sin borrar nada.                                  |
| Riesgo principal       | Un `push` a `main` o un `npm run deploy` local puede republicar el sitio completo y tapar el aviso. Se neutraliza en la Fase 3. |
| Limitación del hosting | GitHub Pages no permite devolver HTTP `503` ni `Retry-After`; el aviso es una página `200` con `noindex`.                       |

Si se necesita **ya** (menos de 10 min) y no da tiempo a tocar el código, existe el
[procedimiento de emergencia](#7-procedimiento-de-emergencia) en el §7.

---

## 2. Contexto verificado en el repositorio

| Hecho                                                      | Archivo / evidencia                                                                                                               | Implicación para el plan                                                                                                                                                    |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vite usa `base: '/Portfolio/'`                             | `vite.config.js:5`                                                                                                                | Toda ruta absoluta generada en el build lleva el prefijo `/Portfolio/`. No se puede publicar un `index.html` ajeno al build con `<link href="/assets/...">`: quedaría roto. |
| El router usa `createWebHistory(import.meta.env.BASE_URL)` | `src/router/index.js:10-12`                                                                                                       | Las rutas `/` y `/blog` (`src/router/index.js:5-8`) se resuelven bajo `/Portfolio/`.                                                                                        |
| Entrada única de la app                                    | `src/main.js:6`, `src/App.vue:1-3` (`<router-view />`)                                                                            | El punto de interceptación más simple para mostrar otra vista es `src/main.js`.                                                                                             |
| Deploy automático en cada push a `main`                    | `.github/workflows/deploy.yml:3-6,29-39` (`npm ci` → `npm run build` → `peaceiris/actions-gh-pages@v3` con `publish_dir: ./dist`) | Publicar la rama `gh-pages` a mano es temporal: el próximo push a `main` lo sobrescribe.                                                                                    |
| Existe además deploy manual                                | `package.json:9` (`npm run build && gh-pages -d dist`)                                                                            | Hay que prohibir explícitamente este comando durante la moratoria.                                                                                                          |
| `.env` está ignorado                                       | `.gitignore:7`                                                                                                                    | No sirve para activar el flag en CI; la variable debe definirse en GitHub Actions.                                                                                          |
| No hay `404.html` en `public/`                             | solo `public/Tech_Resume_Jair.pdf`                                                                                                | GitHub Pages no hace fallback SPA: `/Portfolio/blog/` hoy no cae en `index.html`. Si se quiere que esa URL también muestre el aviso, hay que añadir `public/404.html`.      |
| No hay tests ni workflow de CI separado                    | sin script `test` en `package.json:5-12`                                                                                          | La verificación es manual (build + HTTP + navegador).                                                                                                                       |

---

## 3. Restricciones de GitHub Pages que condicionan el plan

1. **No hay control de cabeceras ni de código de estado.** Pages sirve archivos estáticos:
   no se puede configurar `503 Service Unavailable` ni `Retry-After`. El aviso se servirá
   con `200`. Si el requisito legal/SEO exige un `503` real, hace falta un proxy o proveedor
   distinto (Cloudflare/Netlify) y este plan no cubre ese cambio de infraestructura.
2. **Caché de CDN.** Pages puede servir una versión cacheada durante ~10 minutos. Tras
   desplegar, verificar con URL con parámetro (`?v=fecha`) y con recarga forzada; no dar por
   fallido el deploy por ver la versión antigua en los primeros minutos.
3. **Build time, no runtime.** Las variables `VITE_*` se sustituyen al compilar. Cambiar la
   variable en GitHub **no** cambia el sitio hasta que se relanza un build. Por eso el
   workflow debe admitir `workflow_dispatch` (Fase 1).
4. **Los deep links no son como en un servidor SPA.** Sin `404.html`, una URL como
   `/Portfolio/blog/` muestra la página 404 de GitHub. Decidir en la Fase 0 si se añade
   `public/404.html` (copia de `index.html`) para que también muestre el aviso.

---

## 4. Opciones evaluadas

| Opción                                                               | Ventajas                                                                                                                                     | Inconvenientes                                                                                                                                              | Cuándo usarla                                                    |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **A. Flag de build + vista de mantenimiento** (recomendada)          | Un solo mecanismo, reversible por variable, el build sigue siendo el oficial, funciona con `base: '/Portfolio/'`, se puede ensayar en local. | Requiere tocar `src/main.js`, `index.html` y el workflow; el bundle sigue conteniendo el código de la app (no es un problema para un portfolio público).    | Moratoria planificada, como en este caso.                        |
| **B. Reemplazar `dist/` de la rama `gh-pages` por un HTML estático** | Muy rápido; cero cambios en `main`.                                                                                                          | Lo sobrescribe el próximo push a `main`; exige congelar el workflow antes o al mismo tiempo; el HTML debe llevar CSS en línea por el prefijo `/Portfolio/`. | Emergencia o si no se puede mergear código en `main`.            |
| **C. Desactivar GitHub Pages en Settings**                           | Rápido y definitivo.                                                                                                                         | Muestra 404 en vez de un mensaje; pierde el enlace público y hay que reactivar todo.                                                                        | Solo si se quiere retirar el sitio, no ponerlo en mantenimiento. |
| **D. Redirección 301/302 a otra página**                             | Centraliza el mensaje en otro sitio.                                                                                                         | Pages no permite reglas de redirección; habría que usar meta refresh/JS y el usuario ve una URL intermedia.                                                 | Si ya existe una página de estado externa.                       |

La opción A es la recomendada; la B queda como plan de contingencia.

---

## 5. Plan recomendado por fases

### Fase 0 — Decisiones previas (sin código)

| #   | Decisión                                                                                   | Por qué bloquea                                       |
| --- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| 0.1 | Texto exacto del aviso (borrador en §8) e idioma (español / bilingüe).                     | Bloquea la vista.                                     |
| 0.2 | ¿Fecha de retorno estimada o solo "próximamente"?                                          | Evita compromisos concretos que luego se incumplan.   |
| 0.3 | ¿Se mantiene el PDF del CV accesible? (`public/Tech_Resume_Jair.pdf`)                      | Define si se desactiva también el enlace de descarga. |
| 0.4 | ¿Debe `/Portfolio/blog/` mostrar el aviso (añadir `public/404.html`)?                      | Bloquea la Fase 1.                                    |
| 0.5 | ¿`noindex` temporal en `index.html`? Recomendado si la moratoria dura más de unas semanas. | Afecta a SEO; si es corta, se omite.                  |
| 0.6 | Responsable de ejecutar y responsable de la reversión.                                     | Evita que nadie reactive el sitio por accidente.      |

**Criterio de aceptación:** las seis respuestas están escritas antes de abrir el editor.

### Fase 1 — Implementar el modo mantenimiento (sin publicar)

| #   | Tarea                                                                                                                                                                                                                                             | Archivos                                 | Criterio de aceptación                                                                                                                                          |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.1 | Crear la vista de aviso:componente simple, sin router, sin formularios y sin llamadas a la API de EmailJS. Usa las clases Tailwind ya configuradas (`tailwind.config.js`).                                                                        | nuevo `src/views/Maintenance.vue`        | `npm run dev` con `VITE_MAINTENANCE_MODE=true` muestra solo el aviso; sin el flag muestra el portfolio normal.                                                  |
| 1.2 | Interceptar el arranque: `const maintenance = import.meta.env.VITE_MAINTENANCE_MODE === 'true'`; si es true, montar `Maintenance` en `#app` sin `.use(router)`; si no, conservar `createApp(App).use(router).mount('#app')` exactamente como hoy. | `src/main.js:1-6`                        | Las dos ramas funcionan; con flag=false el diff del build es solo el literal sustituido.                                                                        |
| 1.3 | Adaptar metadatos mientras dure la moratoria: `title`, `description`, `og:title`, `og:description` y (si aplica 0.5) `<meta name="robots" content="noindex,nofollow">`. Recordar el prefijo `/Portfolio/` en cualquier URL absoluta.              | `index.html:12-32`                       | `curl` del HTML del build muestra los metadatos de mantenimiento; ninguna ruta absoluta rota.                                                                   |
| 1.4 | Si se decidió 0.4, copiar `index.html` a `public/404.html` (Vite copia `public/` a `dist/`). Anotar que es temporal y debe borrarse al salir.                                                                                                     | nuevo `public/404.html`                  | `dist/404.html` existe tras el build y contiene el mismo mensaje.                                                                                               |
| 1.5 | Añadir `workflow_dispatch:` al bloque `on` y pasar la variable al paso de build: `env: VITE_MAINTENANCE_MODE: ${{ vars.VITE_MAINTENANCE_MODE }}`.                                                                                                 | `.github/workflows/deploy.yml:3-6,32-33` | YAML válido; el workflow puede lanzarse a mano desde Actions.                                                                                                   |
| 1.6 | Crear en GitHub: Settings → Secrets and variables → Actions → Variables → `VITE_MAINTENANCE_MODE` = `false` (valor seguro por defecto).                                                                                                           | configuración del repositorio            | La variable existe y no está marcada como secret (no contiene datos sensibles).                                                                                 |
| 1.7 | Verificación local completa: `npm ci && VITE_MAINTENANCE_MODE=true npm run build && npm run serve`.                                                                                                                                               | —                                        | Build limpio; en `http://localhost:4173/Portfolio/` se ve el aviso y no la home. Ejecutar también con flag=false para confirmar que el portfolio sigue intacto. |
| 1.8 | `npx eslint .` y `npx prettier --check .` (no `npm run lint` / `npm run format`: `--fix` y `--write` modificarían archivos).                                                                                                                      | —                                        | Sin errores nuevos.                                                                                                                                             |

**No publicar todavía:** el workflow sigue con trigger `push`, así que conviene hacer el
merge de Fase 1 con la variable en `false` (build normal) y activar en la Fase 2.

### Fase 2 — Activar y desplegar el aviso

1. Poner `VITE_MAINTENANCE_MODE` = `true` en las variables del repositorio.
2. Lanzar Actions → "Deploy to GitHub Pages" → **Run workflow** (por eso se añadió
   `workflow_dispatch`). Esperar a que el job termine en verde.
3. Comprobar el artifact publicado (rama `gh-pages`): `index.html` debe contener el texto
   del aviso y las referencias a `/Portfolio/assets/...`.
4. Verificación funcional:

   | Comprobación                                                           | Esperado                                                                          |
   | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
   | `https://jairdeveloper.github.io/Portfolio/?v=check` en modo incógnito | Solo el aviso, sin Header/Footer/contacto.                                        |
   | `https://jairdeveloper.github.io/Portfolio/blog/?v=check`              | Aviso también, o 404 de GitHub si se rechazó el punto 0.4 (decisión documentada). |
   | DevTools → Network                                                     | Sin 404 en JS/CSS; sin peticiones a EmailJS.                                      |
   | `curl -s <url> \| grep -i 'robots'`                                    | Etiqueta `noindex` si se aprobó en 0.5.                                           |

5. Anotar en un issue o en este documento la hora de activación y el commit desplegado.

**Criterio de aceptación:** cualquiera que abra la URL pública ve el mensaje de mantenimiento
en menos de 10 minutos desde el deploy (margen de caché), y la navegación por el portfolio
no es accesible desde esa URL.

### Fase 3 — Congelar el despliegue (crítico)

Sin este paso, cualquier push a `main` repone el portfolio completo y anula el aviso.

| #   | Acción                                                                                                                                                                    | Detalle                                                                                                               |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 3.1 | Cambiar el trigger de `.github/workflows/deploy.yml:3-6` a `on: workflow_dispatch:` (quitar `push` a `main`) o añadir `if: ${{ vars.DEPLOY_ENABLED != 'false' }}` al job. | Opción recomendada: solo `workflow_dispatch`, porque evita despliegues accidentales y obliga a una acción consciente. |
| 3.2 | Mergear ese cambio en `main`.                                                                                                                                             | El push ya no dispara deploy; el sitio publicado sigue siendo el de la Fase 2.                                        |
| 3.3 | Prohibir `npm run deploy` en local (`package.json:9`). Si el equipo lo usa, eliminar temporalmente el script o documentar la prohibición en `CLAUDE.local.md`.            | El script publica `dist/` aunque el workflow esté congelado.                                                          |
| 3.4 | Proteger la rama `gh-pages` (Settings → Branches → rule) para que nadie escriba directamente.                                                                             | Cierra la última vía de sobrescritura manual.                                                                         |
| 3.5 | No mergear en `main` cambios de dependencias ni de contenido durante la moratoria. Si son imprescindibles, ir a una rama y no desplegar.                                  | Mantiene `main` como estado recuperable.                                                                              |

**Criterio de aceptación:** un push inocuo a `main` **no** crea una ejecución de
"Deploy to GitHub Pages"; el pipeline solo se puede iniciar a mano.

### Fase 4 — Seguimiento durante la moratoria

- Revisar semanalmente que la URL sigue mostrando el aviso (2 minutos).
- No renovar dependencias sobre `main`; agrupar los cambios para la salida.
- Si se usó `noindex`, revisar Search Console por si hace falta eliminación urgente de
  URLs cacheadas (el `noindex` solo afecta al recrawl).
- Mantener un registro de incidencias: fecha, quién lo detectó, si hubo despliegues
  accidentales.

### Fase 5 — Salida de la moratoria y reversión

1. Restaurar el trigger `push` en `.github/workflows/deploy.yml` (o poner
   `DEPLOY_ENABLED=true` si se eligió esa variante) y mergear.
2. Restaurar metadatos en `index.html` (`title`, `description`, `og:*`, quitar `robots`).
3. Borrar `public/404.html` si se añadió temporalmente.
4. Poner `VITE_MAINTENANCE_MODE` = `false` y lanzar el workflow a mano una última vez.
   (Si se quiere conservar el mecanismo, dejar `Maintenance.vue` y el flag para el futuro;
   si no, revertir Fase 1 por completo.)
5. Verificar: home y `/blog` cargan, assets bajo `/Portfolio/` sin 404, metadatos
   originales, formulario de contacto operativo.
6. Si la reversión es urgente antes de restaurar el trigger: ejecutar solo el paso 4 y
   lanzar el workflow manual; el sitio vuelve en minutos.

**Objetivo de reversión (RTO):** ~5 min de trabajo + propagación de caché.

---

## 6. Matriz de riesgos

| Riesgo                                        | Probabilidad                       | Impacto                                | Mitigación                                                          |
| --------------------------------------------- | ---------------------------------- | -------------------------------------- | ------------------------------------------------------------------- |
| Push a `main` sobrescribe el aviso            | Alta si no se hace la Fase 3       | Alto (URL pública vuelve al portfolio) | Fase 3.1–3.3.                                                       |
| Caché de Pages muestra la versión antigua     | Alta en los primeros minutos       | Medio (confusión al verificar)         | Esperar ~10 min, URL con query, incógnito, recarga forzada.         |
| Assets rotos por el prefijo `/Portfolio/`     | Media si se publica HTML artesanal | Alto (página sin estilos)              | Usar siempre el build de Vite; si es emergencia, CSS en línea (§7). |
| `noindex` afecta al posicionamiento al volver | Media si la moratoria es larga     | Medio                                  | Decisión explícita en 0.5; quitarlo en Fase 5.4.                    |
| Formulario/EmailJS sigue recibiendo mensajes  | Media si solo se oculta con CSS    | Medio                                  | Montar `Maintenance.vue` en lugar de `App`, no ocultar componentes. |
| Deep link `/blog` muestra 404 de GitHub       | Alta (hoy no hay `404.html`)       | Bajo/medio                             | Decisión 0.4 y punto 1.4.                                           |

---

## 7. Procedimiento de emergencia

Solo si se necesita el aviso **antes** de poder mergear la Fase 1:

1. **Primero** cambiar el trigger del workflow a `workflow_dispatch` (Fase 3.1) para que
   ningún push pueda tapar el cambio.
2. Crear una carpeta temporal fuera del repo (o en una rama `maintenance-static`) con un
   `index.html` **autocontenido**: CSS en línea, sin `<link>` ni `<script>` a `/assets/`, sin
   fuentes externas. Texto del §8.
3. Publicarlo con `npx gh-pages -d <carpeta> -b gh-pages` (o con un workflow temporal
   `peaceiris/actions-gh-pages@v3` apuntando a esa carpeta). El prefijo `/Portfolio/` no
   afecta porque no hay assets relativos al build.
4. Verificar con URL con query y en incógnito.
5. Después, ejecutar la Fase 1 con calma y desplegar desde el build oficial: eso reemplaza
   el HTML artesanal y deja el estado reproducible.

**Advertencia:** este procedimiento deja la rama `gh-pages` divergente de `main` hasta el
paso 5. No omitir el paso 1.

---

## 8. Borrador del mensaje

> **Sitio en mantenimiento**
>
> El portfolio de Jair Flores está temporalmente en pausa mientras se realizan
> actualizaciones. Volverá a estar disponible próximamente.
>
> Si necesitas contactar mientras tanto, puedes hacerlo en
> LinkedIn _(rellenar con la URL real aprobada en 0.1)_.
>
> Gracias por tu paciencia.

Recomendación de diseño: una sola tarjeta centrada, sin navegación, sin formulario y sin
enlaces al resto del sitio. Evitar texto que prometa una fecha concreta si no está decidida
en 0.2.

---

## 9. Checklist final (para imprimir)

- [ ] Fase 0 completada (texto, idioma, retorno, CV, `/blog`, `noindex`, responsables).
- [ ] `Maintenance.vue` creado y `src/main.js` con el guard; flag=false intacto.
- [ ] Metadatos de `index.html` adaptados; `404.html` si aplica.
- [ ] Workflow con `workflow_dispatch` y variable `VITE_MAINTENANCE_MODE` en GitHub.
- [ ] Build local verificado con flag=true y flag=false; ESLint/Prettier sin errores.
- [ ] Variable en `true` + workflow ejecutado + URL pública verificada (incógnito, query).
- [ ] Trigger `push` eliminado; rama `gh-pages` protegida; `npm run deploy` prohibido.
- [ ] Hora de activación y commit registrados.
- [ ] Plan de salida (Fase 5) conocido por el responsable.

---

## 10. Registro de ejecución

**Fecha:** 2026-11-24 · **Responsable:** Jair (confirmado en Fase 0.6).

### Decisiones de Fase 0

| #       | Decisión tomada                                                                                |
| ------- | ---------------------------------------------------------------------------------------------- |
| 0.1/0.2 | Aviso en español, sin enlace de contacto y sin fecha concreta («próximamente»).                |
| 0.3     | Retirar `Tech_Resume_Jair.pdf` del sitio publicado durante la moratoria (restaurar en Fase 5). |
| 0.4     | `/Portfolio/blog/` debe mostrar el aviso; se genera `dist/404.html` desde `dist/index.html`.   |
| 0.5     | `noindex` temporal, aplicado en Fase 2 para no publicarlo sobre la app normal.                 |
| 0.6     | Jair: activación de la variable, verificación de la URL y revisión semanal.                    |

### Desviaciones autorizadas respecto al plan original

1. **1.4:** no se copia `index.html` a `public/404.html` (el HTML fuente referencia
   `./src/main.js`, que no existe en `dist/`). El workflow copia `dist/index.html` a
   `dist/404.html` después del build, solo cuando el flag es `true`.
2. **1.3:** los metadatos de mantenimiento (`title`, `description`, `og:*`, `robots`) se
   aplican en Fase 2, no en Fase 1, porque Fase 1 se despliega con el flag en `false`.
3. **0.3:** el PDF se elimina de `dist/` en el mismo paso condicional del workflow; el
   archivo fuente se conserva en `public/` para restaurarlo sin recuperarlo de git.
4. **3.4:** se omite la protección de la rama `gh-pages`: sin una excepción para Actions
   bloquearía el deploy de Fase 2 y la reversión de Fase 5. La congelación se apoya en
   3.1–3.3.
5. **Entorno:** el remoto SSH no autentica en esta sesión; los pushes se hacen por HTTPS
   usando la credencial de `gh` (permiso ADMIN verificado).

### Activación (Fase 2)

| Dato                                | Valor                                                                 |
| ----------------------------------- | --------------------------------------------------------------------- |
| Variable `VITE_MAINTENANCE_MODE`    | `true` desde 2026-11-24T17:36:36Z                                     |
| Commit activo                       | `ebab6ed` — metadatos de mantenimiento en `index.html`                |
| Deploy por push                     | run `45450574843` (correcto)                                          |
| Deploy manual (`workflow_dispatch`) | run `45450743376` (correcto)                                          |
| Artifact en `gh-pages`              | `index.html` con título y `noindex`; `404.html` presente; PDF ausente |
| Verificación pública                | correcta tras expirar `cache-control: max-age=600` (aprox. 17:49Z)    |

Comprobaciones finales en la URL pública (con parámetro anti-caché y Chrome headless):

| URL                               | Resultado                                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `/Portfolio/`                     | `200`, título «Sitio en mantenimiento — Jair Flores», `noindex,nofollow`; solo el aviso, sin home ni footer. |
| `/Portfolio/blog/`                | `404` de GitHub Pages, pero el cuerpo renderiza el aviso (gracias a `404.html`).                             |
| `/Portfolio/Tech_Resume_Jair.pdf` | `404`.                                                                                                       |
| `/Portfolio/index.html`           | `200`, mismo aviso (confirmación anticipada antes de que expirara la caché de `/`).                          |

El push de Fase 3 (`11189d8`) **no** generó una ejecución nueva del workflow: la
congelación quedó verificada.

### Revisión semanal (Fase 4)

Responsable: Jair. Revisar que `/Portfolio/` siga mostrando el aviso y que no aparezcan
ejecuciones de deploy. Primera comprobación: 2026-11-24T17:49Z, correcta.

### Notas para la Fase 5 (salida)

1. Restaurar `on: push: branches: [main]` en `.github/workflows/deploy.yml`.
2. Restaurar el script `deploy` en `package.json`.
3. Restaurar `index.html`: título «Jair Flores — Desarrollador Frontend», descripción y
   `og:*` originales («Portfolio de Jair Flores, desarrollador Frontend enfocado en Vue.js
   y Tailwind CSS.») y quitar `<meta name="robots" ...>`.
4. Poner `VITE_MAINTENANCE_MODE=false` y lanzar el workflow a mano. El PDF vuelve solo
   (la eliminación es condicional) y `404.html` deja de generarse.

### Estado

- [x] Fase 0 — decisiones tomadas con el operador.
- [x] Fase 1 — vista, guard, workflow y variable en `false`; build verificado en ambos
      modos con navegador headless; ESLint limpio y Prettier limpio en archivos tocados.
- [x] Fase 2 — activación, artifact y verificación pública correctos.
- [x] Fase 3 — trigger `push` eliminado y script `npm run deploy` retirado temporalmente;
      protección de `gh-pages` omitida por decisión del operador.
- [x] Fase 4 — verificación inicial completada; revisiones semanales a cargo de Jair.
