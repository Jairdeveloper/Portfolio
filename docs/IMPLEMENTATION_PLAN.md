# Plan de Implementación — Portfolio de Jair Flores

### Cómo ejecutar lo especificado en `PORTFOLIO_SPEC.md`

**Versión:** 1.0 · **Fecha:** 2026-08-02
**Basado en:** [`PORTFOLIO_SPEC.md`](./PORTFOLIO_SPEC.md) (qué y por qué) y
[`OBSERVATIONS.md`](./OBSERVATIONS.md) (hallazgos técnicos concretos).

> Este documento es un plan de **ejecución**: convierte el roadmap de tres fases del spec
> (§10) en tareas concretas, con archivos/líneas exactas, estimación de esfuerzo y
> criterios de aceptación verificables. No se ha modificado ningún archivo de código
> durante la sesión en la que se escribió este plan — es solo el documento de trabajo para
> las sesiones siguientes.

---

## Cómo leer este documento

Cada tarea tiene:

- **Archivo(s)** — dónde se toca el código (o qué hay que reunir fuera del código).
- **Esfuerzo** — S (< 30 min), M (30–90 min), L (medio día o más), y una razón si no es
  obvia. Son estimaciones para alguien aprendiendo Vue/Tailwind sobre la marcha, no para un
  desarrollador senior a máxima velocidad.
- **Criterio de aceptación** — cómo se comprueba que la tarea está realmente terminada (no
  "se ve bien", sino algo verificable).
- **Bloqueada por** — si depende de que el usuario reúna información/decisiones antes de
  tocar código.

Las tareas están agrupadas en las mismas tres fases del spec, pero cada fase empieza con
un bloque **"Contenido a reunir antes de programar"** — son decisiones/datos que no
requieren código y que conviene resolver en paralelo o antes, para no bloquear la sesión de
implementación a mitad de camino.

---

## Fase 0 — Reunir contenido (prerrequisito, sin código)

Nada de lo siguiente requiere abrir un editor; es investigación/decisión personal. Bloquea
varias tareas de la Fase 1, así que conviene resolverlo primero o en paralelo.

| #   | Qué reunir                                                                                                       | Por qué bloquea                              |
| --- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| 0.1 | 2–4 proyectos reales: nombre, descripción (2–3 frases), tu rol específico, stack, link a demo/repo, captura real | Bloquea 1.5 (reemplazar proyecto de ejemplo) |
| 0.2 | Historial real de experiencia laboral y formación/estudios (aunque sea breve)                                    | Bloquea 1.2 (About)                          |
| 0.3 | Frase de posicionamiento para el Hero (qué tipo de developer eres, qué te diferencia)                            | Bloquea 1.3 (Hero)                           |
| 0.4 | CV actualizado en PDF con nombre de archivo propio                                                               | Bloquea 1.4 (CV)                             |
| 0.5 | URLs reales de GitHub/LinkedIn (y Twitter si lo usas activamente)                                                | Bloquea 1.7 (Footer)                         |
| 0.6 | Foto/avatar para el Hero, e imagen para Contacto                                                                 | Bloquea 1.6 (imágenes vacías)                |
| 0.7 | Decisión: ¿blog activo con contenido real, o se retira por ahora?                                                | Bloquea 1.8 (Blog)                           |

**Esfuerzo:** L (esto es trabajo de reflexión/recopilación personal, no de código — puede
tomar varios días en paralelo con otras cosas).
**Criterio de aceptación:** tienes una nota (aunque sea un documento aparte, no
necesariamente en el repo) con las 7 respuestas antes de empezar la Fase 1.

---

## Fase 1 — Corrección y contenido real (prioridad alta)

Esta es la fase que determina si el link es "compartible". Nada aquí es arquitectura
nueva — son ediciones puntuales sobre componentes que ya existen y funcionan.

### 1.1 — Corregir anclas de navegación rotas

**Archivos:** `src/components/Header/Header.vue:6`, `src/components/Foother/Foother.vue:36`
**Problema concreto:** `Home.vue:3` define `id="portfolio"` en `<Hero>`, pero
`Header.vue` enlaza a `#Inicio` (con mayúscula) y `Foother.vue` enlaza a `#inicio`
(minúscula) — ninguno coincide, así que "Inicio" no funciona hoy en ningún lado.
**Cambio:** unificar los tres a un mismo valor (recomendado: cambiar `id="portfolio"` en
`Home.vue:3` a `id="inicio"` para que sea legible, y actualizar ambos enlaces a `#inicio`).
**Esfuerzo:** S.
**Criterio de aceptación:** hacer clic en "Inicio" desde el Header y desde el Footer
lleva al tope de la sección Hero, en `npm run dev` y también en `npm run build` +
`npm run serve` (para confirmar que sigue funcionando bajo el `base: '/Portfolio/'`).

### 1.2 — Reemplazar contenido duplicado/plantilla en "Sobre mí"

**Archivo:** `src/components/About/About.vue:18–25` (Experiencia) y `:49–56` (Formación)
**Problema concreto:** ambos bloques tienen el texto exacto "Programador independiente" /
"2022 - actualidad" repetido dos veces en cada sección — plantilla sin completar.
**Cambio:** sustituir por los datos reunidos en 0.2. Si son menos de dos entradas reales,
está bien mostrar solo una — no rellenar con más plantilla para "llenar espacio".
**Decisión incluida:** qué hacer con las barras de progreso (`About.vue:35–37` para
Inglés, `:68–85` para HTML/CSS/JS, todas con anchos fijos `w-1/2`/`w-2/3` sin relación con
nivel real) — o se calibran con una autoevaluación honesta, o se reemplazan por una lista
simple de tecnologías sin barra (más fácil de mantener y más honesto).
**Esfuerzo:** M (edición de contenido + decisión de diseño de las barras).
**Criterio de aceptación:** ningún texto en la sección "Sobre mí" es idéntico entre
Experiencia y Formación; las barras (si se mantienen) reflejan un criterio explicable, no
un valor arbitrario.

### 1.3 — Reescribir el mensaje del Hero

**Archivo:** `src/components/Hero/Hero.vue:5–6`
**Problema concreto:** "Te doy la bienvenida a mi pagina web" y "ayudandote crear
experiencias web únicas y mejorar tu presencia digital" son frases genéricas de plantilla,
no una propuesta de valor específica.
**Cambio:** usar la frase de posicionamiento de 0.3 — debe responder en una frase qué tipo
de developer eres y qué problema resuelves.
**Esfuerzo:** S (una vez resuelto el contenido en Fase 0).
**Criterio de aceptación:** un desconocido que lee solo esa frase entiende en menos de 10
segundos qué haces (pídele a alguien que no sea tú que lo lea y lo repita con sus palabras
— es la prueba real del objetivo medible del spec §3).

### 1.4 — Renombrar y verificar el CV descargable

**Archivos:** `public/Tech_Engineer_Resume_Template.pdf`,
`src/components/Hero/Hero.vue:9`
**Problema concreto:** el archivo se llama visiblemente como una plantilla sin
personalizar; el atributo `download="cvJairFlores.pdf"` ya renombra la descarga en el
navegador, pero el nombre del archivo fuente en el repo sigue siendo genérico.
**Cambio:** reemplazar el PDF por el CV real de 0.4, con un nombre de archivo propio (p.
ej. `CV_Jair_Flores.pdf`), y actualizar el `href` en `Hero.vue:9` para que coincida.
**Esfuerzo:** S.
**Criterio de aceptación:** descargar el CV desde `npm run build` + `npm run serve`
(sirviendo bajo `/Portfolio/`, no solo `npm run dev`) descarga el PDF correcto — esto
importa porque una ruta relativa que funciona en dev puede romperse bajo el `base` de
producción.

### 1.5 — Reemplazar el proyecto de ejemplo con proyectos reales

**Archivo:** `src/components/Projects/Projects.vue:112–119`
**Problema concreto:** un único proyecto ("Food finder") con imagen
`picsum.photos/400/200?random=1` (placeholder aleatorio, cambia en cada carga) en vez de
una captura real.
**Cambio:** reemplazar el array `projects` con los 2–4 proyectos reales de 0.1, cada uno
con `title`, `description` (tu rol específico, no solo qué hace el proyecto), `image`
(capturas reales servidas desde `src/assets/` o `public/`, no un servicio de placeholders
aleatorios) y `url`.
**Esfuerzo:** M (edición de datos + conseguir/recortar capturas reales).
**Criterio de aceptación:** cada proyecto mostrado tiene una imagen que no cambia al
recargar la página, un link que funciona (`target="_blank"` ya está bien puesto), y una
descripción que menciona qué hiciste tú, no solo qué es el proyecto.

### 1.6 — Quitar o esconder el formulario público "Añadir proyecto" y limpiar código muerto

**Archivos:** `src/components/Projects/Projects.vue:66–103` (formulario visible),
`src/components/Projects/ProjectForm.vue` (no importado en ninguna vista — código muerto),
`src/composables/supabase.js` (credenciales placeholder, sin uso real)
**Problema concreto:** el formulario visible en `Projects.vue` solo modifica estado en
memoria (inofensivo hoy, se pierde al recargar), pero un visitante no debería poder ver un
botón de "editar tu portfolio" en la página pública. Además `ProjectForm.vue` sí escribe a
Supabase sin autenticación — es código muerto hoy, pero un riesgo real si alguna vez se
conectan credenciales reales sin añadir reglas de seguridad (RLS).
**Cambio recomendado (spec §8):** eliminar el `<form>` de `Projects.vue:66–103` y el
`data()`/`methods` asociados (`newProject`, `addProject`); eliminar
`ProjectForm.vue` y `composables/supabase.js` si no hay plan concreto de corto plazo para
usar Supabase; quitar `@supabase/supabase-js` de `package.json` si se elimina el uso.
**Esfuerzo:** M (es más "borrar con cuidado y probar que nada más lo importaba" que
escribir código nuevo).
**Criterio de aceptación:** `grep -r "supabase" src/` no devuelve nada (o solo el archivo
que se decidió mantener, con justificación); la sección Proyectos ya no tiene un
formulario visible para el público; `npm run build` sigue funcionando sin errores de
imports rotos.

### 1.7 — Corregir imágenes vacías en Hero y Contacto

**Archivos:** `src/components/Hero/Hero.vue:13`, `src/components/Contacto/Contacto.vue:8`
**Problema concreto:** ambos son `<img src="" alt="...">` — se renderizan como ícono de
imagen rota en el navegador.
**Cambio:** usar la foto/avatar de 0.6, importada como asset de Vite
(`import fotoHero from '../../assets/foto-hero.jpg'` y `:src="fotoHero"`, no una ruta de
string suelta) para que el bundler la procese y el hash de caché funcione correctamente.
**Esfuerzo:** S por imagen (S+S).
**Criterio de aceptación:** ninguna sección muestra el ícono de imagen rota; ambas
imágenes tienen `alt` descriptivo (ver también 2.2).

### 1.8 — Corregir enlaces sociales genéricos y bug de nombre interno en el Footer

**Archivo:** `src/components/Foother/Foother.vue:12,17,22` (URLs), `:55` (`name:
"Contacto"`)
**Problema concreto:** los tres `SocialIcon` apuntan a `https://twitter.com`,
`https://github.com`, `https://linkedin.com` — dominios genéricos, no perfiles reales.
Además el componente se llama internamente `"Contacto"` (bug de copiar/pegar desde
`Contacto.vue`), sin efecto visual pero confuso para quien lea el código.
**Cambio:** reemplazar las tres URLs con los perfiles reales de 0.5 (quitar el
`SocialIcon` de Twitter si no se usa activamente); cambiar `name: "Contacto"` a
`name: "Foother"` (o el nombre correcto que se decida al considerar el rename completo del
directorio, ver `OBSERVATIONS.md` §7 — ese rename queda fuera de este plan, es cosmético y
de bajo impacto).
**Esfuerzo:** S.
**Criterio de aceptación:** cada ícono social lleva al perfil real correspondiente,
verificado con clic real (no solo lectura del código).

### 1.9 — Decidir el destino del Blog

**Archivo:** `src/components/Blog/Blog.vue:29–47`, `src/views/Home.vue:5`
**Problema concreto:** tres posts hardcodeados con `url: '#'` — no llevan a ningún lado.
**Cambio, según la decisión de 0.7:**

- Si se retira: quitar `<Blog />` de `Home.vue:5` y su import; el componente puede quedar
  sin usar en `src/components/Blog/` o eliminarse — decidir según si se planea retomarlo
  en Fase 3.
- Si se mantiene: reemplazar los 3 posts con contenido real (aunque sean pocos) y `url`
  reales, no `#`.
  **Esfuerzo:** S (retirar) o L (escribir contenido real de blog).
  **Criterio de aceptación:** ningún link del Blog visible en producción apunta a `#`; si se
  retiró, no queda ninguna referencia rota a `<Blog />` en `Home.vue`.

### 1.10 — Mover credenciales de EmailJS a variables de entorno

**Archivo:** `src/components/Contacto/Contacto.vue:82,89–90`
**Problema concreto:** Public Key (`e3uPhfao4A6-lkdut`), Service ID (`service_se5o8vr`) y
Template ID (`template_jbkzocd`) hardcodeados directamente en el componente. No es un
secreto crítico (EmailJS expone la Public Key en frontend por diseño), pero mezclar
config con código dificulta cambiarla entre entornos.
**Cambio:** crear `.env` (gitignored) con `VITE_EMAILJS_PUBLIC_KEY`,
`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`; reemplazar los tres valores en
`Contacto.vue` por `import.meta.env.VITE_EMAILJS_*`; añadir un `.env.example` (sin
valores reales) para que el repo documente qué variables hacen falta.
**Esfuerzo:** S.
**Criterio de aceptación:** `grep -r "e3uPhfao4A6\|service_se5o8vr\|template_jbkzocd"
src/` no devuelve nada; el formulario de contacto sigue enviando correos correctamente
después del cambio (probar end-to-end, no solo que compile).

### 1.11 — Añadir protección anti-spam básica al formulario de contacto

**Archivo:** `src/components/Contacto/Contacto.vue`
**Cambio:** añadir un campo honeypot (un `<input>` oculto vía CSS —no `type="hidden"`,
que los bots detectan fácil— que un humano nunca llena; si llega con contenido,
`handleSubmit` aborta silenciosamente sin llamar a EmailJS).
**Esfuerzo:** S.
**Criterio de aceptación:** el formulario sigue funcionando para un envío normal; un envío
con el campo honeypot relleno (simulado, por ejemplo llenándolo desde la consola del
navegador) no dispara el envío a EmailJS.

**Resumen de esfuerzo Fase 1 (excluyendo Fase 0):** ~2–3 sesiones de trabajo de una tarde
para alguien aprendiendo sobre la marcha, asumiendo que el contenido de Fase 0 ya está
resuelto.

---

## Fase 2 — Acabado profesional (prioridad media)

### 2.1 — SEO básico en `index.html`

**Archivo:** `index.html:2,6`
**Problema concreto:** `<html lang="en">` con contenido real en español; `<title>Portfolio
</title>` genérico; sin `<meta name="description">`, sin Open Graph, sin favicon.
**Cambio:**
```html
<html lang="es">
  <head>
    ...
    <title>Jair Flores — Desarrollador Frontend</title>
    <meta name="description" content="[una frase real, no la del Hero copiada literal]" />
    <meta property="og:title" content="Jair Flores — Desarrollador Frontend" />
    <meta property="og:description" content="..." />
    <meta property="og:image" content="[URL absoluta a una imagen, considerando el base '/Portfolio/']" />
    <link rel="icon" href="/Portfolio/favicon.ico" />
```
**Nota técnica:** cualquier ruta absoluta en `index.html` (favicon, `og:image`) debe
incluir el prefijo `/Portfolio/` o resolverse con una ruta relativa — es el mismo gotcha
del `base` de Vite que ya rompió el CV en algún momento; verificar en `npm run serve`, no
solo en `npm run dev` (dev no usa el `base`).
**Esfuerzo:** M (incluye conseguir/generar un favicon si no existe ninguno).
**Criterio de aceptación:** compartir el link en una herramienta de vista previa (o
`view-source:` + inspección manual) muestra título/descripción/imagen reales; la pestaña
del navegador muestra un favicon, no el ícono genérico.

### 2.2 — Accesibilidad: `alt` descriptivo, foco visible, contraste

**Archivos:** todos los componentes con `<img>` o `<a>`/`<button>`
**Cambios:**

- Revisar cada `<img>` (`Hero.vue`, `Contacto.vue`, `Projects.vue`) y asegurar `alt`
  descriptivo, no vacío ni genérico.
- Añadir clases `focus:` (p. ej. `focus:outline-none focus:ring-2 focus:ring-blue-500`,
  el mismo patrón que ya existe en los `<input>` de `Contacto.vue:22,34`) a los enlaces de
  `Header.vue:6–8` y `Foother.vue:36–39`, y a los botones/links interactivos que hoy no
  tienen ningún estado de foco.
- Verificar contraste de texto sobre `graydark`/`lightgray` con una herramienta de
  contraste (p. ej. el panel de accesibilidad de las devtools de Chrome/Firefox), objetivo
  WCAG AA.
  **Esfuerzo:** M.
  **Criterio de aceptación:** navegar todo el sitio solo con Tab muestra un indicador visual
  de foco en cada elemento interactivo; Lighthouse (categoría Accessibility) reporta 90+.

### 2.3 — Menú responsive (hamburguesa) en el Header

**Archivo:** `src/components/Header/Header.vue`
**Problema concreto:** el `<nav>` (`Header.vue:5–9`) no tiene ningún comportamiento
mobile — en pantallas pequeñas los tres links quedan apretados o desbordan.
**Cambio:** añadir estado local (`ref` de Composition API o `data()` si se mantiene
Options API para consistencia con el resto del componente) para mostrar/ocultar el `<nav>`
en pantallas `sm`, con un botón de hamburguesa visible solo bajo el breakpoint `md`.
**Esfuerzo:** M (es el primer componente con estado interactivo de UI que el usuario
escribiría desde cero — buen ejercicio para entender `ref`/`v-if` en Vue).
**Criterio de aceptación:** probado en un dispositivo móvil real (no solo el inspector del
navegador, por instrucción explícita del spec §11) — el menú se abre/cierra
correctamente y los links funcionan igual que en desktop.

### 2.4 — Quitar `dist/` del control de versiones

**Archivos:** `.gitignore`, `dist/` (todo el directorio, ya trackeado en git)
**Problema concreto:** el repo versiona la carpeta de build junto al código fuente;
`npm run deploy` la regenera igual, así que es ruido redundante en el historial.
**Cambio:**

```bash
git rm -r --cached dist/
echo "dist/" >> .gitignore
git commit -m "Remove build output from version control"
```

**Esfuerzo:** S, pero **requiere confirmación del usuario antes de ejecutarse** — es un
cambio que reescribe qué hay trackeado en el repo remoto y debe hacerse como su propio
commit, no mezclado con cambios de contenido.
**Criterio de aceptación:** `git status` después de `npm run build` no muestra `dist/`
como modificado; `npm run deploy` sigue publicando correctamente a `gh-pages` (verificar
con un deploy real después del cambio).

### 2.5 — Aplicar `docs/LINTING_RECOMMENDATIONS.md`

**Archivos:** nuevo `eslint.config.js`, nuevo `.prettierrc`, `package.json`
**Cambio:** seguir exactamente lo ya documentado en
[`LINTING_RECOMMENDATIONS.md`](./LINTING_RECOMMENDATIONS.md) — instalar
`eslint`/`eslint-plugin-vue`/`prettier`/`eslint-config-prettier`, añadir la config y los
scripts `lint`/`format`.
**Nota:** ese documento ya advierte que el primer `--fix`/`--write` tocará casi todos los
archivos — hacerlo como commit separado de cualquier cambio de contenido de Fase 1, para
que el diff de cada uno sea revisable por separado.
**Esfuerzo:** M (instalación + primer fix + revisar que no rompió nada visualmente).
**Criterio de aceptación:** `npm run lint` y `npm run format` corren sin error; el sitio
se ve igual después del primer `--fix` (comparación visual antes/después).

**Resumen de esfuerzo Fase 2:** ~1–2 sesiones de tarde.

---

## Fase 3 — Opcional / si sobra tiempo

Ninguna de estas tareas es necesaria para el checklist de "listo para compartir el link"
(spec §11). Se listan con el mismo nivel de detalle para cuando decidas retomarlas, pero
no deberían bloquear la Fase 1/2.

| Tarea                                     | Esfuerzo                                     | Nota                                                                                                                                                                 |
| ----------------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dominio propio en vez de `github.io`      | S (compra) + M (config DNS + `base` de Vite) | Cambiar `base` a `/` si el dominio no usa subruta; revisar que no rompa assets                                                                                       |
| Analítica básica (Plausible/GA)           | S                                            | Añadir script/snippet; decidir por privacidad si Plausible (sin cookies) es preferible a GA                                                                          |
| Modo oscuro                               | L                                            | Ya existe la clase `dark` en la paleta Tailwind actual — investigar si es solo un color o si hay que implementar el toggle completo con `class` strategy de Tailwind |
| Blog real conectado a Supabase o Markdown | L (multi-sesión)                             | Solo si en la Fase 1 (tarea 1.9) se decidió mantener el blog; si se optó por Markdown estático, evaluar `vite-plugin-md` o similar antes de reinstalar Supabase      |

---

## Checklist de "listo para compartir el link" (spec §11) — mapeado a tareas

| Ítem del checklist                                          | Tarea(s) que lo resuelve                        |
| ----------------------------------------------------------- | ----------------------------------------------- |
| Enlaces de navegación llevan a la sección correcta          | 1.1                                             |
| Ningún dato visible es de plantilla                         | 1.2, 1.3, 1.5, 1.9                              |
| CV descargable actual, con tu nombre en el archivo          | 1.4                                             |
| Formulario de contacto probado end-to-end                   | 1.10, 1.11 (probar después de mover a env vars) |
| No hay formularios públicos escribiendo a BD sin protección | 1.6                                             |
| Título de pestaña y vista previa muestran tu nombre         | 2.1                                             |
| Se ve bien en un celular real                               | 2.3                                             |
| No quedan credenciales visibles sin necesidad               | 1.10                                            |

Este mapeo es la forma más rápida de verificar, al final de la Fase 1 + 2.1/2.3, que el
sitio ya cumple el criterio mínimo para publicarse en un CV/LinkedIn.

---

## Resumen de esfuerzo total

| Fase                            | Esfuerzo estimado          | Bloqueante                                                                         |
| ------------------------------- | -------------------------- | ---------------------------------------------------------------------------------- |
| Fase 0 (reunir contenido)       | Variable, días en paralelo | Bloquea 1.2, 1.3, 1.4, 1.5, 1.7, 1.8, 1.9                                          |
| Fase 1 (corrección + contenido) | ~2–3 tardes                | Depende de Fase 0                                                                  |
| Fase 2 (acabado profesional)    | ~1–2 tardes                | Independiente de Fase 0, puede empezar en paralelo a Fase 1 en tareas como 2.4/2.5 |
| Fase 3 (opcional)               | No estimado — bajo demanda | Ninguno de los anteriores                                                          |

**Orden recomendado de ejecución:** empezar Fase 0 en paralelo con las tareas de Fase 1 y
2 que no dependen de contenido nuevo (1.1, 1.6, 1.10, 1.11, 2.4, 2.5) — son puramente
técnicas y se pueden hacer ya. Las tareas de contenido (1.2, 1.3, 1.4, 1.5, 1.7, 1.8, 1.9)
esperan a que Fase 0 esté resuelta.
