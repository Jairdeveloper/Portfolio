# Observaciones — Auditoría del Portfolio

Notas de análisis del estado actual del código, generadas al escribir
[`PORTFOLIO_SPEC.md`](./PORTFOLIO_SPEC.md). Es un listado concreto de lo que se encontró
al leer cada componente; el spec explica el "por qué" y el plan, esto es el detalle
técnico de respaldo.

No se modificó código de la aplicación en esta pasada — solo se generaron los dos
documentos (`PORTFOLIO_SPEC.md` y este archivo).

---

## 1. El documento existente no encaja con el proyecto

`docs/PORTFOLIO_SAAS_MASTER_SPEC.md` especifica una plataforma de marketplace con Escrow,
multi-tenant, con 115 casos de uso, backend transaccional, pagos en custodia, etc. El
código real es una SPA estática de una sola página (`/` y `/blog`), sin backend, sin
autenticación, sin pagos. La brecha entre ambos es total — no es un desalineamiento menor,
es un documento para un producto distinto. Por eso se creó `PORTFOLIO_SPEC.md` como
reemplazo funcional, dejando el original intacto como nota de visión a futuro (ver spec
§9).

## 2. Bugs funcionales encontrados

- **Navegación rota**: `Header.vue` enlaza a `#Inicio` (con mayúscula) y `Foother.vue`
  enlaza a `#inicio` (minúscula); ninguno de los dos coincide con el `id` real de la
  sección Hero, que es `id="portfolio"` (asignado en `Home.vue`). Ningún ancla de "Inicio"
  funciona hoy.
- **`About.vue`**: los bloques de "Experiencia laboral" y "Formación/estudios" tienen
  exactamente el mismo texto duplicado ("Programador independiente" / "2022 - actualidad")
  copiado dos veces en cada sección — visiblemente contenido de plantilla sin completar.
- **`Foother.vue`**: el componente se llama internamente `name: "Contacto"` (bug de
  copiar/pegar desde `Contacto.vue`). No tiene efecto visual pero es una señal de calidad
  de código para cualquiera que revise el repo.
- **Imágenes vacías**: `Hero.vue` (línea 13) y `Contacto.vue` (línea 8) tienen
  `<img src="" alt="...">` — un elemento de imagen roto, visible como ícono de imagen
  rota en el navegador.
- **Enlaces sociales genéricos**: `Foother.vue` apunta a `https://twitter.com`,
  `https://github.com`, `https://linkedin.com` — dominios genéricos, no perfiles reales.
- **CV con nombre de plantilla**: `public/Tech_Engineer_Resume_Template.pdf` es
  visiblemente un archivo de plantilla sin renombrar ni, presumiblemente, personalizar.

## 3. Riesgo de seguridad / diseño: formulario público sin protección

`Projects.vue` incluye un formulario "Añadir proyecto" visible en la sección pública que
modifica el estado del componente en memoria (se pierde al recargar, así que hoy es
inofensivo). Pero además existe `ProjectForm.vue` — **no importado en ninguna vista, por
lo tanto código muerto** — que sí escribe directamente a una tabla de Supabase
(`supabase.from('projects').insert(...)`) sin autenticación ni validación server-side. Si
en algún momento se conectan credenciales reales de Supabase y este componente se activa
sin añadir autenticación/reglas de seguridad (RLS), cualquier visitante del sitio podría
insertar filas arbitrarias en la base de datos. Recomendación en el spec: eliminar
`ProjectForm.vue` si no hay plan de usarlo pronto, y quitar el formulario visible de
`Projects.vue` del sitio público (Fase 1).

## 4. Contenido de relleno / no personalizado

- `Blog.vue`: tres posts hardcodeados con `url: '#'` (enlaces que no llevan a ningún
  lado) — contenido de ejemplo, no un blog real.
- `Projects.vue`: un solo proyecto real referenciado ("Food finder"), con imagen de
  `picsum.photos/400/200?random=1` (placeholder aleatorio, no una captura real del
  proyecto).
- `About.vue`: barras de progreso de habilidades con anchos fijos arbitrarios (`w-2/3`,
  `w-1/2`) sin relación aparente con un nivel real autoevaluado.

## 5. Credenciales y configuración en código fuente

- `Contacto.vue` tiene el Public Key, Service ID y Template ID de EmailJS hardcodeados
  directamente en el componente (líneas 82, 89–90). Funcionalmente no es un secreto crítico
  (EmailJS está diseñado para exponer la Public Key en frontend), pero mezclar
  configuración con código dificulta cambiarla entre entornos y es mejor práctica
  moverla a variables de entorno.
- `composables/supabase.js` tiene URL y anon key placeholder (`your-project.supabase.co`,
  `your-anon-key`) — no funcional, pero confirma que Supabase no está realmente conectado
  pese a estar instalado como dependencia y referenciado en código.

## 6. SEO / metadatos / accesibilidad

- `index.html`: `<html lang="en">` pero todo el contenido visible está en español; sin
  `<meta name="description">`, sin Open Graph, sin favicon; `<title>` genérico
  ("Portfolio").
- Ningún componente usa clases `focus:` — no hay indicación visual de foco de teclado en
  enlaces/botones.
- Varias imágenes sin `alt` significativo o con `alt=""`.

## 7. Estructura y nombres

- El directorio/componente `Foother` está mal escrito (debería ser `Footer`) — ya en
  producción y referenciado en varios sitios; renombrarlo es un cambio mecánico pero
  toca varios archivos, se deja como decisión del usuario (no incluido en el roadmap del
  spec por ser cosmético y de bajo impacto en la experiencia del visitante).
- `src/assets/Sin título.png` — archivo de imagen con nombre por defecto (probablemente
  de una captura de pantalla), sin uso aparente en el código; candidato a limpieza.

## 8. Lo que ya estaba bien y no necesita cambios

- La estructura de secciones (Header/Hero/About/Projects/Blog/Contacto/Footer) es la
  correcta para un portfolio de una página — no hace falta reestructurar.
- Tailwind está bien aplicado de forma consistente (paleta custom `gray`/`graydark`/
  `dark` reutilizada en todos los componentes).
- El formulario de contacto (`Contacto.vue`) maneja estados de éxito/error correctamente
  y usa `@submit.prevent` — la lógica en sí está bien escrita, solo falta mover
  credenciales a env vars.
- El stack (Vue 3 + Vite + Tailwind, desplegado a GitHub Pages) es apropiado para este
  proyecto y no se recomienda cambiarlo.

---

## Resumen

El proyecto no tiene problemas de arquitectura — tiene problemas de **contenido sin
terminar y algunos bugs puntuales de integración** (anclas, imágenes vacías, un formulario
público que no debería estar expuesto). Es un trabajo de acabado, no una reconstrucción.
El plan completo, con fases y priorización, está en `PORTFOLIO_SPEC.md` §10.
