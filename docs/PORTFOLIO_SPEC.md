# Portfolio Personal de Jair Flores — Especificación Adaptada

### Documento de producto para un sitio de presentación profesional

**Versión:** 1.0 · **Fecha:** 2026-08-01
**Estado del repositorio base:** SPA en Vue 3.5 + Vite 6 + Tailwind 3, desplegado como sitio
estático en GitHub Pages (`https://jairdeveloper.github.io/Portfolio/`). Sin backend propio.
Contacto vía EmailJS. Supabase presente pero no conectado (credenciales placeholder).

> Este documento **reemplaza, para efectos prácticos, a
> [`PORTFOLIO_SAAS_MASTER_SPEC.md`](./PORTFOLIO_SAAS_MASTER_SPEC.md)** como guía de trabajo
> para este repositorio. Ese documento describe una plataforma SaaS de marketplace con
> Escrow — un producto distinto, de alcance multi-año, que no corresponde a lo que existe
> hoy ni a lo que se necesita a corto/medio plazo. Se conserva como visión de largo plazo
> (ver §9), pero no debe usarse como referencia para decidir qué construir a continuación.
> Para el detalle de bugs y hallazgos concretos del código actual, ver
> [`OBSERVATIONS.md`](./OBSERVATIONS.md).

---

## Índice

0. Resumen ejecutivo
1. Propósito real del proyecto
2. Público objetivo
3. Qué debe lograr el sitio (objetivos medibles)
4. Arquitectura de información y contenido por sección
5. Contenido: qué información real hace falta reunir
6. Diseño y UX
7. SEO, metadatos y accesibilidad
8. Arquitectura técnica recomendada
9. Relación con la visión "Portfolio SaaS"
10. Roadmap por fases
11. Checklist de "listo para compartir el link"

---

## 0. Resumen ejecutivo

Este proyecto es, y debe seguir siendo por ahora, **un portfolio personal de una sola
página**: la carta de presentación digital de Jair Flores como desarrollador. Su función no
es demostrar arquitectura de software compleja, sino **convertir una visita de 30 segundos
en una impresión de "esta persona es seria y sabe lo que hace"** — sea quien la visite un
reclutador, un cliente potencial u otro desarrollador evaluando el código.

Hoy el sitio tiene la estructura correcta (Header, Hero, Sobre mí, Proyectos, Blog,
Contacto, Footer) pero el contenido es en buena parte de relleno/plantilla: experiencia
laboral duplicada y genérica, un proyecto de ejemplo, enlaces sociales que apuntan a
dominios genéricos, y algunas roturas funcionales (anclas que no coinciden, imágenes sin
`src`, un formulario que escribe a una base de datos sin autenticación). Ninguno de estos
problemas requiere una reescritura — son ajustes puntuales de contenido y código.

La prioridad no es añadir funcionalidad nueva (blog dinámico, backend, IA); es **llenar el
esqueleto que ya existe con contenido real, corregir lo que está roto, y pulir el
acabado** (SEO, metadatos, accesibilidad, responsive) para que el sitio se vea y funcione
como corresponde a alguien que se presenta profesionalmente.

---

## 1. Propósito real del proyecto

Dos propósitos coexisten y no están en conflicto:

1. **Proyecto de aprendizaje** — es donde practicas Vue, Vite, Tailwind, integración con
   servicios externos (EmailJS, potencialmente Supabase) y despliegue. Está bien que el
   código muestre ese recorrido.
2. **Carta de presentación profesional** — es el enlace que vas a compartir con
   reclutadores, clientes o en un CV/LinkedIn. Ese uso exige que lo que se vea funcione sin
   errores y no contradiga la impresión de profesionalismo que buscas transmitir.

El punto (2) impone un requisito no negociable: **nada de contenido de relleno visible en
producción** (datos duplicados, "Lorem ipsum" disfrazado, proyectos de ejemplo genéricos,
enlaces sociales que no son los tuyos). El punto (1) significa que puedes seguir
experimentando — pero detrás de una rama, no en lo que la gente ve al entrar al link.

---

## 2. Público objetivo

| Perfil                                             | Qué busca al entrar                                        | Qué debe encontrar                                                                                   |
| -------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Reclutador / responsable de RRHH                   | Evidencia rápida de habilidades y seriedad, CV descargable | Resumen claro en 5 segundos, stack tecnológico real, CV actualizado, forma fácil de contactar        |
| Cliente freelance potencial                        | Pruebas de trabajo entregado, forma de contactar           | Proyectos reales con resultado/capturas, testimonios si existen, formulario de contacto que funcione |
| Otro desarrollador (revisando el código en GitHub) | Calidad de código, buenas prácticas                        | Código sin bugs evidentes, sin credenciales hardcodeadas, estructura consistente                     |

Los tres perfiles comparten un mismo requisito silencioso: **que nada se vea roto**. Un
enlace social que va a `twitter.com` en vez de tu perfil, o una imagen vacía, cuesta más
credibilidad que la ausencia de una función avanzada.

---

## 3. Qué debe lograr el sitio (objetivos medibles)

- Un visitante entiende en menos de 10 segundos quién eres y qué haces (Hero).
- Puede descargar tu CV actualizado en un clic.
- Puede ver 2–4 proyectos reales, con lo que hiciste y por qué importa (no solo una
  captura y un link).
- Puede contactarte por un formulario que efectivamente llega a tu correo (verificado, no
  solo "parece funcionar").
- Puede llegar a tus perfiles reales de GitHub/LinkedIn (no dominios genéricos).
- El sitio pasa una auditoría básica de Lighthouse (Performance/Accessibility/SEO) en
  verde o casi verde.
- El título de la pestaña y la vista previa al compartir el link (Open Graph) muestran tu
  nombre y una descripción real, no "Portfolio" a secas.

---

## 4. Arquitectura de información y contenido por sección

La estructura de secciones actual es correcta y no necesita cambiar. Lo que necesita cada
una:

### Header

- Corregir los anclas de navegación para que apunten a los `id` reales de cada sección
  (ver `OBSERVATIONS.md` — hoy "Inicio" no lleva a ningún lado).
- Considerar un menú responsive (hamburguesa) para pantallas pequeñas; hoy el `nav` no
  tiene comportamiento mobile.

### Hero

- Mensaje de una frase, específico: qué tipo de desarrollador eres y qué problema
  resuelves (evitar frases genéricas de plantilla tipo "ayudándote a mejorar tu presencia
  digital" si no es literalmente tu propuesta de valor).
- Foto o ilustración real en el `<img>` actualmente vacío — una sección Hero sin imagen se
  ve inacabada.
- CV descargable: mantenerlo, pero renombrar el archivo (`Tech_Engineer_Resume_Template.pdf`
  es visiblemente una plantilla sin renombrar) y verificar que la ruta funcione también
  bajo el `base: '/Portfolio/'` de producción.

### Sobre mí (About)

- Reemplazar los bloques duplicados de "Programador independiente / 2022 - actualidad" en
  Experiencia **y** Formación (son copias del mismo texto) con datos reales: empleos,
  estudios/cursos, certificaciones.
- Las barras de progreso de habilidades (HTML, CSS, JS) actualmente tienen un valor fijo
  arbitrario (`w-2/3`) sin relación con nivel real — o se calibran con criterio propio, o
  se reemplazan por una lista simple de tecnologías (más honesto y más fácil de mantener).
- El idioma (Inglés, barra al 50%) — igual, decidir si refleja tu nivel real o se quita.

### Proyectos

- Mostrar proyectos reales terminados (o en progreso, marcados como tal), con: qué
  problema resolvían, qué hiciste tú específicamente, stack usado, y un link funcionando
  (demo y/o repo).
- El formulario "Añadir proyecto" que hoy existe en `Projects.vue` es una función de
  demostración (solo en memoria, se pierde al recargar) y no debe estar visible en el
  sitio público — un visitante no debería poder "editar tu portfolio". Ver
  `OBSERVATIONS.md` para la recomendación concreta.

### Blog

- Decisión pendiente (ver §10, Fase 2): si vas a mantener un blog activo, vale la pena
  como muestra de comunicación técnica y SEO (contenido nuevo indexable). Si no vas a
  escribir con regularidad, un blog con 3 posts falsos y enlaces `href="#"` resta más
  credibilidad de la que suma — mejor quitarlo hasta tener contenido real, o dejarlo pero
  con posts reales aunque sean pocos.

### Contacto

- Mantener EmailJS (funciona bien para sitios estáticos sin backend), pero mover
  Service ID / Template ID / Public Key a variables de entorno en vez de tenerlos
  hardcodeados en el componente.
- Añadir protección básica anti-spam (honeypot es suficiente para este volumen de tráfico;
  no hace falta CAPTCHA).
- Imagen vacía junto al formulario — mismo caso que el Hero.

### Footer

- Enlaces sociales deben apuntar a tus perfiles reales, no a `twitter.com`/`github.com`/
  `linkedin.com` genéricos.
- Corregir el `name: "Contacto"` interno del componente (bug de copiar/pegar, no afecta
  visualmente pero es confuso para cualquiera que lea el código).

---

## 5. Contenido: qué información real hace falta reunir

Antes de tocar código, esto es lo que se necesita decidir/recopilar (puede hacerse en
paralelo):

- 2–4 proyectos reales con: nombre, descripción de 2–3 frases, tu rol específico, stack,
  link a demo y/o repo, y una imagen o captura real (no `picsum.photos` aleatorio).
- Historial real de experiencia laboral/estudios (puede ser breve — mejor 2 líneas
  verídicas que 4 líneas genéricas).
- Una frase de posicionamiento para el Hero (qué tipo de desarrollador eres, qué te
  diferencia).
- CV actualizado en PDF, con nombre de archivo propio.
- URLs reales de GitHub/LinkedIn (y Twitter si lo usas activamente).
- Una foto o avatar para el Hero.
- Decisión sobre el Blog: ¿mantenerlo activo o retirarlo por ahora?

---

## 6. Diseño y UX

- La paleta actual (grises + `dark`) es sobria y funciona para un portfolio técnico —
  mantenerla, pero verificar contraste de texto sobre `graydark`/`lightgray` con una
  herramienta de contraste (WCAG AA como mínimo).
- Añadir estados de foco visibles en enlaces/botones (accesibilidad de teclado) — hoy no
  se ve ningún `focus:` en Header/Footer/Hero.
- Espaciado y tipografía son consistentes entre secciones; mantener esa consistencia al
  añadir contenido real (no introducir tamaños de fuente ad-hoc nuevos).
- Considerar transiciones suaves entre secciones al hacer scroll (ya existen algunas
  transiciones en botones/tarjetas — extender el mismo criterio, sin exagerar con
  animación).
- Modo oscuro es opcional — no es prioritario para un portfolio de una página, pero es una
  mejora visible si sobra tiempo.

---

## 7. SEO, metadatos y accesibilidad

Actualmente `index.html` tiene solo `<title>Portfolio</title>` y `lang="en"` (el contenido
real está en español). Recomendado:

- `<html lang="es">` (o gestionar el idioma real del contenido si se planea bilingüe).
- `<title>` con tu nombre y rol: p. ej. "Jair Flores — Desarrollador Frontend".
- `<meta name="description">` con una frase real de una línea.
- Etiquetas Open Graph (`og:title`, `og:description`, `og:image`) para que compartir el
  link en LinkedIn/WhatsApp muestre una vista previa decente.
- Favicon (hoy no existe ninguno — la pestaña del navegador queda con el ícono genérico).
- Todas las imágenes con `alt` descriptivo (hoy varias tienen `alt=""` o etiquetas `<img>`
  vacías).
- Etiquetas semánticas ya presentes (`<header>`, `<footer>`, `<section>`) — mantener ese
  criterio al añadir contenido nuevo.

---

## 8. Arquitectura técnica recomendada

**No cambiar el stack.** Vue 3 + Vite + Tailwind es apropiado para este tipo de sitio:
liviano, rápido de desplegar en GitHub Pages, y suficiente para las necesidades reales del
proyecto. Recomendaciones puntuales:

- **Supabase**: hoy está instalado y referenciado (`composables/supabase.js`,
  `ProjectForm.vue`) pero no conectado a nada real, y `ProjectForm.vue` ni siquiera está
  importado en ninguna vista (código muerto). Decisión recomendada: **quitarlo** a menos
  que haya un plan concreto de corto plazo para usarlo (p. ej. un blog con posts
  gestionados desde una tabla). Mantener dependencias y código sin usar aumenta la
  superficie de mantenimiento sin aportar nada hoy.
- **EmailJS**: adecuado para contacto sin backend — mantener, pero mover credenciales a
  variables de entorno (`import.meta.env.VITE_*`) en vez de hardcodearlas en el
  componente.
- **Testing/Linting**: fuera del alcance de este documento — ver
  `docs/LINTING_RECOMMENDATIONS.md` para el plan de ESLint/Prettier ya preparado.
- **`dist/` en git**: el repositorio versiona la carpeta de build junto al código fuente.
  Es redundante (`npm run deploy` la regenera) y aumenta el ruido en el historial de git.
  Recomendado quitarla del control de versiones y dejar que solo `npm run deploy` la
  publique (ya está protegida de ediciones manuales por el hook configurado en
  `.claude/settings.local.json`).

No se recomienda introducir backend propio, autenticación de usuarios, ni base de datos
transaccional para este proyecto en su forma actual — eso es exactamente el salto de
alcance que describe `PORTFOLIO_SAAS_MASTER_SPEC.md`, y no es lo que un portfolio personal
necesita para cumplir su función.

---

## 9. Relación con la visión "Portfolio SaaS"

`PORTFOLIO_SAAS_MASTER_SPEC.md` sigue siendo un documento válido como **ejercicio de
visión a largo plazo** — describe cómo este portfolio podría evolucionar, en un futuro
lejano y opcional, hacia una plataforma de contratación con Escrow. No hay nada malo en
haberlo escrito. El problema es tratarlo como la especificación activa del repositorio
cuando lo que existe hoy —y lo que se necesita en los próximos meses— es un sitio de una
página bien terminado.

Recomendación: dejarlo donde está, sin borrarlo, pero no usarlo como referencia de trabajo
hasta que el portfolio actual esté terminado, publicado, y efectivamente cumpliendo su
función de carta de presentación. Si en el futuro decides perseguir esa visión, será una
decisión de producto nueva y separada — no una continuación natural de "arreglar el
portfolio".

---

## 10. Roadmap por fases

### Fase 1 — Corrección y contenido real (prioridad alta)

- Corregir anclas de navegación rotas (Header/Footer → secciones).
- Reemplazar contenido de relleno en "Sobre mí" con datos reales.
- Reemplazar el proyecto de ejemplo con 2–4 proyectos reales.
- Quitar o esconder el formulario público de "Añadir proyecto".
- Corregir enlaces sociales del Footer.
- Añadir imágenes reales donde hoy hay `<img src="">` vacíos.
- Mover credenciales de EmailJS a variables de entorno.
- Decidir el destino del Blog (mantener con contenido real, o retirar por ahora).

### Fase 2 — Acabado profesional (prioridad media)

- SEO: título, descripción, Open Graph, favicon, `lang="es"`.
- Accesibilidad: `alt` en todas las imágenes, estados de foco visibles, contraste.
- Responsive: menú mobile en el Header.
- Quitar `dist/` del control de versiones; quitar Supabase si no se va a usar.
- Aplicar `docs/LINTING_RECOMMENDATIONS.md` (ESLint + Prettier).

### Fase 3 — Opcional / si sobra tiempo

- Dominio propio en vez de `github.io` (mejora percepción profesional).
- Analítica básica (Plausible/GA) para saber si el link se está usando.
- Modo oscuro.
- Blog real conectado a Supabase o a archivos Markdown, si se decidió mantenerlo en Fase 1.

---

## 11. Checklist de "listo para compartir el link"

Antes de poner este link en un CV, LinkedIn, o enviarlo a un cliente, verificar:

- [ ] Todos los enlaces de navegación (Header y Footer) llevan a la sección correcta.
- [ ] Ningún dato visible es de ejemplo/plantilla (experiencia, proyectos, redes sociales).
- [ ] El CV descargable es el actual, con tu nombre en el archivo.
- [ ] El formulario de contacto fue probado end-to-end (llega el correo).
- [ ] No hay formularios públicos que escriban a una base de datos sin protección.
- [ ] El título de la pestaña y la vista previa al compartir muestran tu nombre.
- [ ] El sitio se ve bien en un celular real (no solo en el inspector del navegador).
- [ ] No quedan credenciales (API keys, IDs de servicio) visibles en el código fuente sin
      necesidad.
