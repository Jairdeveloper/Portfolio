# Portfolio SaaS — Documento Maestro de Especificación

### PRD + Software Architecture Specification + Solution Architecture Document

**Versión:** 1.0 · **Fecha:** 2026-07-08 · **Autor del análisis:** Product/Solution/Security/FinTech Architecture (asistido por IA)
**Estado del repositorio base:** SPA estático en Vue 3.5 + Vite 6 + Tailwind 3, con Supabase (persistencia parcial) y EmailJS (contacto), desplegado como sitio estático en GitHub Pages. Rutas actuales: `/` (Home) y `/blog`. No existe backend propio, autenticación, base de datos transaccional, pagos, ni ningún componente de Escrow. Este documento asume que el producto se reconstruye/extiende sustancialmente a partir de esa base, no que se refactoriza incrementalmente sobre ella.

> Este documento es tecnología-agnóstico salvo en la Sección 13, donde se comparan alternativas de stack de forma explícita. No contiene código, SQL, diagramas UML ni diseño de endpoints REST. Está preparado para alimentar, en una fase posterior, el backlog, las historias de usuario, el modelo de datos físico, el diseño de API y la infraestructura.

---

## Índice

0. Resumen ejecutivo
1. Visión del producto
2. Concepto de Portfolio SaaS
3. Concepto Escrow aplicado
4. Actores
5. Casos de uso (115)
6. Requerimientos funcionales
7. Requerimientos no funcionales
8. Flujo completo del servicio
9. Arquitectura funcional (módulos)
10. Modelo conceptual de datos
11. Arquitectura Escrow
12. Seguridad
13. Arquitectura técnica
14. Integraciones
15. Inteligencia Artificial
16. Riesgos
17. Roadmap
18. Recomendaciones técnicas
19. Funcionalidades futuras

---

## 0. Resumen ejecutivo

Portfolio SaaS es la evolución de un portfolio personal hacia una plataforma de contratación de servicios profesionales con un motor de confianza (Escrow) como diferenciador central. El producto compite simultáneamente en tres frentes: (a) presentación profesional de alto standing (mejor que una landing estática), (b) marketplace transaccional de servicios (como Upwork/Fiverr pero verticalizado y con marca propia), y (c) portal de gestión de proyecto cliente-proveedor (como un Basecamp/Linear ligero, acoplado al dinero en custodia).

La tesis central: **la confianza es el producto**. Cualquier plataforma puede listar servicios; pocas pueden garantizar que el dinero, los entregables y las expectativas estén protegidos para ambas partes durante todo el ciclo de vida del contrato. El Escrow no es una feature de pagos, es la columna vertebral de estados que atraviesa contratos, entregables, aprobaciones, disputas y reputación.

El documento está diseñado para permitir dos velocidades de crecimiento:

- **Modo 1 (día 1):** un solo proveedor (el propietario) vendiendo sus propios servicios, con Escrow operando como garantía simple depósito→entrega→liberación.
- **Modo N (multi-tenant):** múltiples proveedores/empresas verificados operando en el mismo marketplace, con comisión de plataforma, arbitraje y reputación agregada.

La arquitectura se diseña desde el día 1 pensando en Modo N, aunque el lanzamiento comercial puede limitarse a Modo 1 para reducir riesgo regulatorio (custodia de fondos de terceros) y complejidad operativa.

---

## 1. Visión del producto

### 1.1 Propósito

Convertir el momento en que un prospecto evalúa "¿le confío mi dinero y mi proyecto a este proveedor?" en un proceso estructurado, transparente y auditable, en lugar de un acto de fe basado en un portfolio bonito y una conversación por email o WhatsApp.

### 1.2 Problema que resuelve

- **Para el cliente:** miedo a pagar por adelantado a un proveedor desconocido; falta de visibilidad sobre el avance; ambigüedad sobre qué se entrega y cuándo; disputas sin mecanismo neutral de resolución.
- **Para el proveedor (freelancer/estudio/empresa):** miedo a trabajar y no cobrar; negociaciones informales sin trazabilidad; fricción para transmitir profesionalismo frente a competidores con "solo un portfolio"; gestión dispersa entre email, WhatsApp, Drive y hojas de cálculo.
- **Para ambos:** la falta de un sistema único que una descubrimiento → cotización → contrato → pago custodiado → entrega → aceptación → liberación → reputación.

### 1.3 Propuesta de valor

"Contrata con la confianza de un banco, la simplicidad de un portfolio y la trazabilidad de un gestor de proyectos." Un único lugar donde el cliente descubre el trabajo, negocia el alcance, paga a una cuenta neutral, sigue el progreso con hitos verificables, aprueba entregables y libera el pago — todo con evidencia y auditoría.

### 1.4 Diferenciadores

- Escrow nativo y transversal (no un plugin de pagos), aplicado no solo a dinero sino a documentos, aprobaciones y evidencias.
- Portfolio-first: la superficie pública es de calidad "agencia premium", no de "perfil de freelancer genérico".
- Configurable por tipo de servicio (desarrollo, diseño, consultoría, legal, etc.) mediante plantillas de flujo de hitos, no código a medida por vertical.
- Camino de crecimiento de "un solo proveedor" a "marketplace multi-proveedor" sin migración de arquitectura.
- IA integrada en los puntos de fricción reales (redacción de propuestas, contratos, resúmenes de avance, detección de riesgo de disputa) en lugar de un chatbot decorativo.

### 1.5 Ventajas competitivas frente al mercado

| Alternativa                                              | Limitación típica                                                                          | Ventaja de Portfolio SaaS                                           |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| Landing page / portfolio estático                        | No transacciona, no genera confianza operativa                                             | Todo el ciclo de vida en un solo lugar                              |
| Upwork/Fiverr                                            | Marca del proveedor diluida bajo la marca del marketplace, comisión alta, soporte genérico | Marca propia, white-label posible, Escrow configurable por vertical |
| CRM genérico (HubSpot, Pipedrive)                        | No custodia dinero ni gestiona entregables/hitos                                           | Escrow y entregables nativos, no add-ons                            |
| Agencia digital tradicional (sitio + facturación aparte) | Procesos manuales, sin portal de cliente                                                   | Portal de cliente en tiempo real con estado de fondos y entregables |

### 1.6 Oportunidades de negocio y monetización

- **Comisión por transacción** sobre el monto en Escrow liberado (modelo marketplace, 5–15% escalonado por volumen/tier).
- **Suscripción SaaS por proveedor** (planes Starter/Pro/Business) con límites de proyectos activos, seats de equipo, automatizaciones IA y branding blanco.
- **Fee de Escrow** independiente de la comisión de marketplace, cobrable también a plataformas de terceros que integren el motor de Escrow vía API (Escrow-as-a-Service).
- **Marketplace de plugins/integraciones** con revenue share.
- **Certificación / verificación de proveedores** (KYC/KYB premium, sello de confianza) como servicio adicional monetizable.
- **Programa de afiliados y partners** (agencias que refieren clientes).
- **White-label** para agencias que quieren su propio marketplace con el motor de Portfolio SaaS por debajo.
- **Datos y analítica agregada anonimizada** (benchmarks de precios por vertical/región) como producto de datos B2B a futuro.

### 1.7 Estrategia de crecimiento del producto

Fase de anclaje (portfolio + cotización + Escrow simple de una sola parte) → fase de expansión (multi-proveedor, reputación, marketplace público) → fase de plataforma (API pública, white-label, IA agencial, ecosistema de plugins). El crecimiento se financia inicialmente con el propio uso del propietario como primer proveedor ("dogfooding"), reduciendo riesgo antes de abrir a terceros.

---

## 2. Concepto de Portfolio SaaS

### 2.1 Definición

Un **Portfolio SaaS** es una plataforma en la que la vitrina profesional (portfolio) y el motor transaccional (contratación, pago, entrega) son la misma superficie, no dos sistemas enlazados por un botón "Contactar". El visitante nunca sale del ecosistema: descubre, cotiza, contrata, paga, sigue el proyecto y deja reseña sin salir de la plataforma ni depender de herramientas externas de terceros no integradas.

### 2.2 Diferencias con otros modelos

| Modelo                                      | Objetivo principal                              | Transacciona dinero          | Gestiona el proyecto post-venta                | Multi-proveedor                 |
| ------------------------------------------- | ----------------------------------------------- | ---------------------------- | ---------------------------------------------- | ------------------------------- |
| Landing Page                                | Generar leads                                   | No                           | No                                             | No                              |
| Página corporativa                          | Comunicar marca/institucional                   | No                           | No                                             | No                              |
| Marketplace (Fiverr/Upwork)                 | Conectar oferta y demanda a escala              | Sí                           | Parcial (chat + milestones básicos)            | Sí, con marca diluida           |
| CRM                                         | Gestionar el pipeline comercial interno         | No (a veces vía integración) | No                                             | No aplica (uso interno)         |
| Plataforma Freelance (Workana, etc.)        | Subasta de proyectos por precio                 | Sí                           | Parcial                                        | Sí                              |
| Agencia Digital (sitio + backoffice manual) | Vender servicios propios                        | Fuera de plataforma          | Manual (email/Drive)                           | No (agencia única)              |
| **Portfolio SaaS (este producto)**          | Vender y **entregar con confianza garantizada** | Sí, vía Escrow nativo        | Sí, con hitos, entregables y aceptación formal | Sí, escalable desde 1 proveedor |

### 2.3 Coexistencia de conceptos dentro del producto

El producto no elige entre estos modelos: los estratifica.

1. **Capa pública (Landing + Portfolio + Catálogo):** SEO, credibilidad, casos de éxito, testimonios — funciona igual que una landing premium para el visitante anónimo.
2. **Capa de descubrimiento (Marketplace):** cuando hay más de un proveedor, el catálogo se convierte en buscador/comparador con filtros, categorías y reputación.
3. **Capa comercial (CRM ligero):** cada lead/prospecto se convierte en una entidad de pipeline con seguimiento, sin necesitar un CRM externo para el propietario o proveedores pequeños.
4. **Capa transaccional (Escrow + Contratos + Pagos):** el corazón fintech, invisible hasta que hay un acuerdo, pero activo desde la primera cotización aceptada.
5. **Capa operativa (Gestión de proyecto + Portal cliente/proveedor):** reemplaza el email/Drive/WhatsApp disperso con hitos, entregables versionados y mensajería contextual al contrato.

Esta estratificación permite que el mismo producto sirva a un freelancer solo (usa capas 1, 3, 4, 5) y a un marketplace con cientos de proveedores (usa las cinco a escala).

---

## 3. Concepto Escrow aplicado

### 3.1 Alcance del Escrow (más allá del dinero)

El Escrow se modela como una **máquina de estados de confianza** que custodia seis tipos de activos simultáneamente y los libera de forma correlacionada:

1. **Financiero:** depósitos, anticipos, hitos, garantías, reembolsos.
2. **Contractual:** el contrato firmado que define las condiciones de liberación.
3. **Documental:** entregables, evidencias, actas de aceptación.
4. **De aprobación:** decisiones humanas (cliente aprueba/objeta) que gatillan transiciones de estado.
5. **De reputación:** una liberación exitosa alimenta el score del proveedor; una disputa lo penaliza condicionalmente.
6. **De garantía post-entrega:** una porción del fondo o una ventana temporal de responsabilidad tras la liberación final.

### 3.2 Escrow a través del ciclo de vida

**Creación del servicio:** el proveedor define el servicio con una plantilla de hitos por defecto (no obligatoria) — el Escrow "sabe" de antemano cómo se espera que se divida el pago (ej. 30% anticipo / 40% entrega intermedia / 30% entrega final).

**Contratación / negociación:** durante la cotización, el sistema simula el desglose de Escrow (cuánto se deposita, cuándo se libera cada tramo) para que ambas partes lo acuerden antes de firmar — evita sorpresas post-contrato.

**Pago (fondeo):** el cliente deposita en la cuenta de custodia (propia o vía proveedor de Escrow/PSP regulado). El dinero queda **retenido**, no es ingreso del proveedor todavía. Se emite un comprobante de depósito.

**Seguimiento:** cada hito tiene un estado visible a ambas partes (pendiente, en progreso, entregado, en revisión, aprobado, objetado). El Escrow no libera fondos por el mero transcurso del tiempo salvo que las reglas del contrato lo definan (auto-liberación tras N días sin respuesta del cliente, con notificación previa).

**Entregables:** el proveedor sube el entregable (archivo, enlace, acceso, credencial) versionado; queda vinculado inmutablemente al hito y timestamped.

**Aceptación:** el cliente revisa y puede aprobar, pedir cambios (dentro del alcance) o objetar formalmente (abre disputa). La aprobación es un evento firmado (registro con identidad, fecha, IP/dispositivo) que constituye la evidencia de conformidad.

**Liberación parcial:** al aprobar un hito, el Escrow libera automáticamente el tramo correspondiente al proveedor (menos comisión de plataforma), sin intervención manual salvo excepción configurada (ej. montos altos requieren doble validación).

**Liberación total:** al aprobar el hito final o al cierre del proyecto, se libera el saldo retenido y opcionalmente se activa la ventana de garantía (holdback) — un porcentaje que se retiene adicionalmente unos días/semanas por si aparecen defectos.

**Soporte y garantías:** durante la ventana de garantía, el cliente puede reportar incidencias vinculadas al entregable sin abrir un nuevo contrato; si no hay reclamos, el holdback se libera automáticamente al vencer el plazo.

**Disputas:** si cliente y proveedor no concilian, el caso escala a arbitraje (humano o asistido por IA con revisión humana obligatoria) que revisa evidencia (mensajes, entregables, historial de hitos) y resuelve: liberar al proveedor, reembolsar al cliente, o liberación parcial proporcional.

**Cierre:** el contrato se marca cerrado, se genera la factura final, se solicita reseña a ambas partes, y el historial queda inmutable para auditoría futura.

### 3.3 Escenarios distintos

- **Servicio de precio fijo con hitos:** el caso base descrito arriba.
- **Servicio por horas/retainer:** el Escrow funciona como una bolsa recargable; se liberan tramos según reportes de horas aprobados semanal/mensualmente.
- **Servicio de suscripción (soporte/mantenimiento):** Escrow rotativo: cada ciclo de facturación deposita, se consume el servicio, se libera al cierre del ciclo salvo disputa.
- **Servicio sin hitos (entrega única, ej. auditoría):** depósito 100% al inicio, liberación 100% a la aceptación única, con opción de holdback de garantía.
- **Cancelación temprana (antes de iniciar trabajo):** reembolso total o parcial automático según política del proveedor (configurable: reembolsable 100% / no reembolsable / reembolso parcial con fee de cancelación).
- **Cancelación a mitad de proyecto:** liberación proporcional a hitos ya aprobados, reembolso del resto, posible negociación asistida o arbitraje si hay desacuerdo sobre el "trabajo en curso".
- **Cliente inactivo (no aprueba ni objeta):** regla de auto-liberación tras ventana configurable con notificaciones escalantes, para no dejar al proveedor indefinidamente sin cobrar.
- **Proveedor incumple plazo:** el contrato puede definir penalizaciones automáticas (reducción del monto liberable) o dar pie a cancelación por parte del cliente con reembolso del tramo no ejecutado.

---

## 4. Actores

| Actor                                | Descripción                                                            | Notas                                                                    |
| ------------------------------------ | ---------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Visitante anónimo                    | Navega el portfolio/catálogo sin cuenta                                | Fuente de leads                                                          |
| Prospecto                            | Visitante identificado (dejó contacto/solicitó cotización)             | Entra al pipeline comercial                                              |
| Cliente                              | Usuario que contrata y paga por un servicio                            | Puede ser individuo o empresa (cuenta corporativa)                       |
| Proveedor / Freelancer               | Ofrece servicios propios                                               | Puede ser el propietario u onboarded de terceros                         |
| Empresa proveedora                   | Persona jurídica con múltiples miembros de equipo                      | Tiene sub-roles internos (owner, miembro, facturación)                   |
| Colaborador interno                  | Miembro de equipo de un proveedor con permisos acotados                | Ej. diseñador que solo ve sus tareas asignadas                           |
| Gestor comercial (Sales)             | Administra el pipeline, cotizaciones y negociación                     | Rol interno de plataforma o de proveedor grande                          |
| Gestor de proyectos (PM)             | Supervisa hitos y entregables de varios contratos                      | Puede ser interno del proveedor o de la plataforma (servicio gestionado) |
| Agente de soporte                    | Atiende tickets de cliente/proveedor                                   | Acceso a conversaciones e historial, no a fondos                         |
| Agente/Árbitro de Escrow             | Resuelve disputas siguiendo evidencia                                  | Rol de alta confianza, auditado                                          |
| Administrador de plataforma          | Gobierna configuración global, comisiones, verificación de proveedores | Súper-rol con RBAC estricto                                              |
| Oficial de cumplimiento (Compliance) | Supervisa KYC/KYB, AML, límites regulatorios                           | Relevante al escalar a multi-tenant financiero                           |
| Auditor (interno/externo)            | Acceso de solo lectura a registros inmutables                          | Para auditorías financieras o de seguridad                               |
| Socio/Partner (afiliado)             | Refiere clientes o proveedores a cambio de comisión                    | Rol de crecimiento, no operativo                                         |
| Sistema/API externa                  | Integraciones (PSP, firma electrónica, calendario, IA)                 | Actor no humano con su propio scope de permisos                          |
| Agente de IA (asistente)             | Ejecuta tareas automatizadas (propuestas, resúmenes, triage)           | Actúa "en nombre de" un rol humano, con límites explícitos               |

El modelo de roles debe ser **extensible**: nuevos roles se agregan por composición de permisos (RBAC/ABAC), no por código nuevo por rol.

---

## 5. Casos de uso (115)

### A. Descubrimiento y marca (8)

1. Visitante navega el portfolio y ve proyectos destacados con filtros por categoría/tecnología/industria.
2. Visitante lee casos de éxito con métricas de impacto (antes/después).
3. Visitante consulta testimonios verificados de clientes reales.
4. Visitante explora el catálogo de servicios con precios orientativos o "desde $X".
5. Visitante lee artículos del blog relacionados a un servicio y es dirigido a la página del servicio.
6. Visitante descarga un recurso (plantilla, guía) a cambio de su email (lead magnet).
7. Buscador interno permite encontrar servicios/proyectos/artículos por palabra clave.
8. Visitante comparte una página de servicio/proyecto en redes sociales con metadatos OG optimizados.

### B. Catálogo y marketplace de servicios (10)

9. Proveedor publica un nuevo servicio con alcance, entregables incluidos, precio y duración estimada.
10. Proveedor define paquetes/tiers de un mismo servicio (básico/estándar/premium).
11. Proveedor define add-ons opcionales sobre un servicio base.
12. Cliente compara dos o más servicios/proveedores lado a lado.
13. Cliente filtra el marketplace por categoría, precio, tiempo de entrega, rating y verificación.
14. Plataforma destaca servicios mediante posicionamiento pagado o algorítmico (a futuro).
15. Proveedor pausa o retira temporalmente un servicio del catálogo.
16. Plataforma marca un servicio como "verificado" tras revisión de calidad.
17. Cliente guarda servicios en una lista de favoritos/comparación.
18. Proveedor duplica un servicio existente como plantilla para uno nuevo.

### C. Cotización y negociación (8)

19. Cliente solicita una cotización personalizada describiendo su necesidad (formulario guiado).
20. Proveedor recibe la solicitud en su pipeline y responde con una propuesta formal (alcance, precio, hitos, plazos).
21. Cliente y proveedor negocian el alcance mediante mensajería estructurada vinculada a la cotización.
22. Sistema genera automáticamente un borrador de propuesta asistido por IA a partir de la descripción del cliente.
23. Cliente acepta una cotización, generando un contrato en estado borrador.
24. Cliente rechaza o solicita ajustes a una cotización con motivo.
25. Cotización expira automáticamente tras N días sin respuesta, con recordatorio previo.
26. Proveedor convierte una conversación de soporte/consulta en una cotización formal.

### D. Contratación y contratos (8)

27. Sistema genera el contrato a partir de la cotización aceptada, con cláusulas estándar configurables por vertical.
28. Cliente y proveedor firman el contrato digitalmente (firma electrónica simple o avanzada según monto).
29. Contrato define el desglose de hitos y condiciones de liberación de Escrow antes de la firma.
30. Proveedor o cliente propone una adenda/cambio de alcance a un contrato en curso.
31. Sistema versiona el contrato y mantiene el historial de cambios con trazabilidad.
32. Cliente descarga copia firmada del contrato en cualquier momento.
33. Sistema aplica una plantilla legal distinta según el tipo de servicio (desarrollo, legal, consultoría).
34. Administrador revisa y aprueba plantillas de contrato antes de su publicación para proveedores.

### E. Escrow y pagos (12)

35. Cliente deposita fondos en Escrow para iniciar el proyecto (pago único o primer hito).
36. Sistema confirma el fondeo y notifica a ambas partes con comprobante.
37. Proveedor solicita liberación de un hito tras marcar el entregable como completo.
38. Cliente aprueba el hito y el sistema libera automáticamente el pago correspondiente.
39. Cliente objeta un entregable y el sistema pausa la liberación del hito en disputa.
40. Sistema aplica auto-liberación tras vencer la ventana de revisión sin respuesta del cliente.
41. Cliente solicita cancelación y el sistema calcula el reembolso según política y hitos completados.
42. Administrador/Árbitro de Escrow resuelve una disputa y ejecuta la liberación/reembolso correspondiente.
43. Sistema retiene un holdback de garantía tras la liberación final por el período configurado.
44. Proveedor visualiza su wallet con fondos disponibles, en tránsito y retenidos.
45. Proveedor solicita retiro de fondos disponibles hacia su cuenta bancaria/método de cobro.
46. Sistema genera reporte de comisiones de plataforma por transacción liberada.

### F. Gestión de proyectos y entregables (10)

47. Proveedor crea el plan de hitos de un contrato con fechas estimadas.
48. Proveedor sube un entregable (archivo, enlace, acceso) vinculado a un hito.
49. Sistema versiona entregables y mantiene historial de revisiones.
50. Cliente comenta directamente sobre un entregable específico (feedback contextual).
51. Proveedor marca un hito como bloqueado por dependencia externa (ej. falta de insumo del cliente).
52. Sistema notifica automáticamente al acercarse una fecha límite de hito.
53. Cliente y proveedor visualizan una línea de tiempo/Gantt simplificado del proyecto.
54. Proveedor solicita extensión de plazo con motivo, sujeta a aprobación del cliente.
55. Sistema calcula automáticamente el % de avance del proyecto según hitos completados.
56. Administrador de plataforma interviene en un proyecto estancado (rol de PM gestionado, plan premium).

### G. Comunicación y colaboración (8)

57. Cliente y proveedor chatean en tiempo real dentro del contexto del contrato/proyecto.
58. Sistema ofrece videollamada integrada para reuniones de kickoff o revisión.
59. Sistema envía notificaciones multicanal (email, push, SMS/WhatsApp) configurables por usuario.
60. Cliente agenda una llamada de descubrimiento desde el calendario público del proveedor.
61. Sistema mantiene un centro de notificaciones unificado por usuario.
62. Proveedor comparte documentación técnica o de proceso dentro del proyecto (gestión documental).
63. Sistema archiva automáticamente conversaciones de contratos cerrados, manteniéndolas consultables.
64. Soporte interviene en una conversación cliente-proveedor cuando se le escala (con consentimiento/registro).

### H. Portal del cliente (6)

65. Cliente visualiza el estado consolidado de todos sus proyectos activos.
66. Cliente descarga todas sus facturas y comprobantes desde un solo lugar.
67. Cliente gestiona sus métodos de pago guardados.
68. Cliente invita a un colega de su empresa a colaborar en un proyecto (cuenta corporativa).
69. Cliente deja una reseña al cierre de un contrato.
70. Cliente exporta el historial completo de un proyecto (contrato, entregables, mensajes, pagos) para sus registros.

### I. Portal del proveedor (6)

71. Proveedor visualiza su dashboard de ingresos, proyectos activos y pipeline comercial.
72. Proveedor configura su disponibilidad y capacidad (cuántos proyectos simultáneos acepta).
73. Proveedor gestiona a su equipo interno y asigna colaboradores a tareas/hitos.
74. Proveedor configura sus plantillas de servicios, contratos y planes de hitos por defecto.
75. Proveedor visualiza analítica de conversión (cotizaciones enviadas vs. aceptadas).
76. Proveedor completa su proceso de verificación (KYC/KYB) para habilitar cobros.

### J. Reputación y reseñas (6)

77. Sistema solicita reseña bidireccional (cliente→proveedor y proveedor→cliente) al cerrar un contrato.
78. Sistema calcula un score de reputación agregado ponderado por volumen, recencia y disputas.
79. Proveedor responde públicamente a una reseña recibida.
80. Plataforma modera reseñas ante sospecha de fraude o manipulación (reseñas falsas).
81. Sistema muestra insignias de confianza (verificado, top rated, respuesta rápida) en el perfil del proveedor.
82. Administrador suspende temporalmente la visibilidad de reseñas en disputa activa hasta su resolución.

### K. Administración y backoffice (8)

83. Administrador configura las comisiones de plataforma por categoría/tier.
84. Administrador aprueba o rechaza el onboarding de un nuevo proveedor.
85. Administrador configura las plantillas de contrato y políticas de cancelación por defecto.
86. Administrador visualiza el dashboard financiero global (volumen en Escrow, liberado, en disputa).
87. Administrador gestiona categorías, etiquetas y taxonomía del catálogo.
88. Administrador configura reglas de auto-liberación y ventanas de garantía por defecto.
89. Administrador exporta reportes regulatorios/contables periódicos.
90. Administrador gestiona feature flags y configuración de planes SaaS.

### L. Seguridad y cumplimiento (6)

91. Usuario activa autenticación multifactor en su cuenta.
92. Sistema fuerza re-autenticación para operaciones sensibles (liberar fondos, cambiar método de cobro).
93. Sistema registra un log de auditoría inmutable de toda acción sobre fondos o documentos.
94. Oficial de cumplimiento revisa alertas de posible fraude o lavado de activos.
95. Sistema aplica verificación de identidad (KYC) antes de habilitar a un proveedor a recibir fondos.
96. Administrador de seguridad revisa un reporte de actividad anómala (login desde ubicación inusual, picos de solicitudes).

### M. IA y automatización (8)

97. Asistente de IA sugiere una propuesta de cotización a partir de la descripción del cliente.
98. Asistente de IA redacta un borrador de contrato ajustado al alcance acordado.
99. Motor de búsqueda semántica recomienda servicios relevantes según la consulta en lenguaje natural del visitante.
100.  IA resume el estado de un proyecto para el cliente ("qué pasó esta semana").
101.  IA clasifica automáticamente tickets de soporte por urgencia y categoría.
102.  IA analiza el sentimiento de la conversación para detectar riesgo temprano de disputa.
103.  IA realiza OCR y extracción de datos sobre documentos subidos (facturas, identificaciones para KYC).
104.  IA detecta patrones de fraude en solicitudes de liberación o reembolso.

### N. Analítica y reportes (6)

105. Administrador visualiza cohortes de retención de clientes y proveedores.
106. Proveedor visualiza el embudo de conversión desde visita a contrato firmado.
107. Sistema genera reporte de tiempo promedio de resolución de disputas.
108. Sistema genera reporte de NPS/satisfacción por servicio y proveedor.
109. Administrador segmenta ingresos por categoría de servicio, región y tier de plan.
110. Sistema alerta proactivamente sobre proyectos en riesgo (atraso, comunicación caída, hitos vencidos).

### O. Integraciones y API (5)

111. Proveedor conecta su calendario externo (Google/Outlook) para sincronizar disponibilidad.
112. Proveedor conecta su cuenta de almacenamiento externo (Drive/Dropbox) para adjuntar entregables grandes.
113. Sistema emite webhooks a sistemas externos ante eventos clave (contrato firmado, fondos liberados).
114. Empresa cliente integra la plataforma con su propio ERP/CRM vía API para reconciliar facturación.
115. Partner de white-label configura su propia instancia con marca propia sobre la misma plataforma base.

---

## 6. Requerimientos funcionales

Organizados por módulo funcional. Cada bloque asume las capacidades mínimas necesarias; el detalle de historias de usuario se desarrolla en una fase posterior.

**Landing / Portfolio:** páginas de inicio configurables por bloques (hero, propuesta de valor, servicios destacados, prueba social), gestión de proyectos de portfolio con galería multimedia, casos de éxito con métricas cuantificadas, sección de clientes/logos, SEO técnico (metadatos, sitemap, datos estructurados), soporte multiidioma.

**Servicios y categorías:** CRUD de servicios con tiers/add-ons, taxonomía jerárquica de categorías y etiquetas, precios fijos/desde/por cotizar, disponibilidad y capacidad del proveedor, estados (borrador/publicado/pausado/archivado).

**Blog y recursos:** editor de contenido enriquecido, programación de publicación, relación contenido↔servicio, recursos descargables con captura de lead, buscador full-text.

**Testimonios y reseñas:** captura post-cierre de contrato, moderación, respuesta pública del proveedor, ponderación en score de reputación.

**Contacto, cotizaciones y agenda:** formulario de contacto con enrutamiento a pipeline, formulario de cotización guiado (wizard) con captura estructurada del alcance, calendario de disponibilidad pública para agendar llamadas, recordatorios automáticos.

**CRM y pipeline comercial:** pipeline visual de prospectos/oportunidades por etapa, asignación a gestor comercial, historial de interacciones, tareas de seguimiento, conversión prospecto→cliente.

**Mensajería, chat y videollamadas:** mensajería contextual a contrato/proyecto, notificaciones de nuevo mensaje, videollamada integrada o vía integración (Zoom/Meet), historial persistente y buscable, archivado al cierre de contrato.

**Contratos y firma digital:** generación de contrato desde plantilla y cotización, versionado con historial de cambios, firma electrónica (simple/avanzada según jurisdicción y monto), almacenamiento inmutable del documento firmado.

**Escrow, pagos, wallet y facturación:** depósito y custodia de fondos, desglose por hitos, liberación parcial/total (manual y automática), disputas y arbitraje, wallet por proveedor con fondos disponibles/en tránsito/retenidos, retiro a cuenta bancaria/método de cobro, generación automática de facturas y comprobantes fiscales, gestión de comisiones de plataforma.

**Entregables, versionado y workflow:** carga de entregables versionados por hito, comentarios contextuales, estados de revisión (pendiente/en revisión/aprobado/objetado), workflow configurable de aprobación (uno o múltiples aprobadores).

**Gestión documental:** repositorio de documentos del proyecto (contratos, entregables, evidencias, actas), control de acceso por rol, retención y expiración configurable.

**Notificaciones:** motor multicanal (email, push web/app, SMS, WhatsApp), preferencias por usuario y por tipo de evento, digestión (resumen diario/semanal) opcional.

**Portal del cliente y portal del proveedor:** dashboards diferenciados por rol con la información y acciones relevantes a cada uno (ver Sección 5, bloques H e I).

**Marketplace:** buscador y filtros de servicios/proveedores, comparación, favoritos, posicionamiento y destacados, verificación de proveedores.

**Sistema de reseñas y reputación:** captura bidireccional, score agregado, insignias de confianza, moderación anti-fraude.

**Reportes y analítica:** dashboards financieros, de conversión, de satisfacción y de riesgo de proyecto (ver Sección 5, bloque N).

**Administración y configuración:** gestión de comisiones, políticas de cancelación/garantía, plantillas de contrato, taxonomía, feature flags, planes SaaS y límites por plan.

**API e integraciones:** API pública para partners/white-label, webhooks salientes, conectores a PSPs, firma electrónica, calendario, almacenamiento, comunicación y CRMs/ERPs externos (detalle en Sección 14).

---

## 7. Requerimientos no funcionales

- **Disponibilidad:** objetivo de 99.9% para los servicios core (autenticación, Escrow, pagos); degradación elegante del resto (blog, portfolio) ante incidentes parciales.
- **Rendimiento:** tiempos de respuesta objetivo <300ms p95 en operaciones de lectura del catálogo/portfolio; <1s p95 en operaciones transaccionales (crear cotización, registrar aprobación); páginas públicas optimizadas para Core Web Vitals (LCP <2.5s).
- **Resiliencia:** aislamiento de fallos entre módulos (un fallo en mensajería no debe bloquear el Escrow); reintentos idempotentes en operaciones financieras; colas de eventos con dead-letter para eventos no procesados.
- **Escalabilidad:** escalado horizontal de los servicios sin estado; particionamiento de datos por tenant a futuro (multi-tenant); diseño que soporte de decenas a decenas de miles de proveedores sin rediseño de arquitectura.
- **Seguridad:** ver Sección 12 en detalle.
- **Observabilidad:** trazabilidad distribuida end-to-end de cada transacción de Escrow; métricas de negocio (volumen en custodia, tasa de disputas) y técnicas (latencia, error rate) en el mismo panel; alertas proactivas ante anomalías financieras.
- **Mantenibilidad:** módulos con límites de dominio claros (ver Sección 18, DDD); cobertura de pruebas automatizadas priorizada en el núcleo de Escrow y pagos; documentación de decisiones arquitectónicas (ADRs).
- **Accesibilidad:** cumplimiento WCAG 2.2 AA en las superficies públicas y en el portal de cliente/proveedor.
- **Internacionalización:** soporte multiidioma y multi-moneda desde el modelo de datos (no como parche posterior); formato de fecha/hora/número localizado; plantillas legales y fiscales adaptables por país.
- **Recuperación ante desastres:** RPO objetivo ≤15 minutos y RTO ≤1 hora para los datos financieros y contractuales; backups cifrados con prueba de restauración periódica.
- **Privacidad:** cumplimiento de GDPR (si opera en UE) y normativas equivalentes (ej. LGPD, leyes locales de protección de datos), con soporte a derecho de acceso, rectificación y borrado, salvo obligaciones de retención financiera/fiscal.
- **Cumplimiento normativo:** consideración de regulación de servicios de pago/custodia de fondos de terceros (posible necesidad de licencia de dinero electrónico/EMI, asociación con un PSP/banco licenciado, o modelo de "pass-through" donde un tercero regulado retiene los fondos legalmente). Este punto es un riesgo regulatorio de primer orden (ver Sección 16).

---

## 8. Flujo completo del servicio

**Descubrimiento** → visitante llega vía SEO/redes/referido, explora portfolio/catálogo.
**Contacto** → deja datos vía formulario de contacto o solicitud de cotización; se crea prospecto en el pipeline.
**Cotización** → proveedor (o IA asistiendo al proveedor) responde con propuesta formal: alcance, precio, hitos, plazos, condiciones de Escrow.
**Negociación** → mensajería estructurada ajusta alcance/precio; se registran versiones de la propuesta.
**Contrato** → cliente acepta; se genera contrato desde plantilla; firma digital de ambas partes.
**Depósito Escrow** → cliente deposita el monto correspondiente al primer hito (o total, según modelo).
**Inicio del proyecto** → proveedor confirma inicio; se activa el plan de hitos.
**Entregables** → proveedor sube avances/entregables versionados por hito.
**Revisiones** → cliente comenta, pide ajustes dentro de alcance.
**Aceptación** → cliente aprueba el hito formalmente (evento firmado).
**Liberación parcial** → Escrow libera el tramo correspondiente al proveedor.
**(Repetición de Entregables→Liberación parcial por cada hito)**
**Liberación total** → al aprobar el hito/entrega final, se libera el saldo, con holdback de garantía opcional.
**Facturación** → se emite la factura final y comprobantes fiscales correspondientes.
**Garantía** → ventana post-entrega para reclamos vinculados al entregable.
**Soporte** → canal para incidencias post-cierre, potencialmente derivando en un nuevo contrato de mantenimiento.
**Cierre** → contrato marcado como cerrado, solicitud de reseña bidireccional, archivado consultable.

### Variantes por modelo de negocio

- **Precio fijo con hitos:** flujo estándar arriba descrito.
- **Retainer/soporte recurrente:** el ciclo "depósito→consumo→liberación" se repite cada período de facturación sin generar un contrato nuevo cada vez.
- **Marketplace multi-proveedor con comisión:** se añade el paso de cálculo y retención de comisión de plataforma en cada liberación.
- **Servicio gestionado por la plataforma (PM as a service):** se inserta un actor Gestor de Proyectos de plataforma entre cliente y proveedor, con visibilidad total y capacidad de mediar antes de escalar a disputa formal.
- **Cancelación anticipada:** el flujo se interrumpe entre "Depósito Escrow" e "Inicio" o durante "Entregables", disparando la lógica de reembolso/liberación proporcional descrita en la Sección 3.3.

---

## 9. Arquitectura funcional (módulos)

- **Landing/CMS:** contenido público configurable por bloques.
- **Portfolio:** proyectos, casos de éxito, galería.
- **Catálogo de Servicios:** definición de oferta, tiers, add-ons.
- **Marketplace:** búsqueda, filtros, comparación, destacados.
- **Identidad y Usuarios:** cuentas, roles, perfiles, verificación (KYC/KYB).
- **Clientes / Empresas:** cuentas corporativas, miembros, permisos delegados.
- **CRM / Pipeline Comercial:** prospectos, oportunidades, seguimiento.
- **Proyectos:** hitos, tareas, línea de tiempo, estado de avance.
- **Contratos:** plantillas, versionado, cláusulas, firma digital.
- **Escrow (núcleo):** estados financieros/documentales/de aprobación (detalle en Sección 11).
- **Pagos / PSP Gateway:** abstracción sobre proveedores de pago externos.
- **Wallet:** saldo por proveedor, movimientos, retiros.
- **Facturación:** generación y gestión de comprobantes fiscales.
- **Documentos / Entregables:** repositorio versionado, control de acceso.
- **Workflow / Aprobaciones:** motor de estados configurable por tipo de servicio.
- **Mensajería:** chat contextual, videollamadas, historial.
- **Notificaciones:** motor multicanal, preferencias, plantillas de mensajes.
- **Portal Cliente / Portal Proveedor:** capas de presentación por rol sobre los módulos anteriores.
- **Reputación y Reseñas:** captura, scoring, moderación.
- **Administración:** configuración global, comisiones, políticas, taxonomía.
- **Seguridad e Identidad de Acceso:** autenticación, MFA, RBAC/ABAC, auditoría.
- **IA / Automatización:** asistentes, búsqueda semántica, clasificación, detección de riesgo/fraude.
- **Motor de Búsqueda:** indexación de servicios, portfolio, blog, con búsqueda semántica y por filtros.
- **Reportes y Analítica:** dashboards de negocio, financieros y operativos.
- **Configuración / Feature Flags / Planes SaaS:** gestión de tiers de producto y límites.
- **API Gateway:** punto de entrada unificado para clientes propios y de terceros.
- **Integraciones:** conectores a PSPs, firma electrónica, calendario, almacenamiento, comunicación, CRMs/ERPs (Sección 14).

Estos módulos se agrupan, a nivel de dominio (no de despliegue), en cuatro grandes bounded contexts: **Presencia/Marketing** (Landing, Portfolio, Catálogo, Blog, Marketplace, Búsqueda), **Comercial** (CRM, Cotizaciones, Contratos), **Confianza/Fintech** (Escrow, Pagos, Wallet, Facturación, Disputas) y **Operación/Entrega** (Proyectos, Documentos, Workflow, Mensajería, Notificaciones). Esta agrupación es la base de la recomendación arquitectónica de la Sección 18.

---

## 10. Modelo conceptual de datos

Solo entidades y relaciones a nivel conceptual, sin esquema físico.

**Identidad:** Usuario (persona física, credenciales, rol base), Empresa (persona jurídica, agrupa Usuarios como miembros), Perfil (extensión pública de Usuario/Empresa: bio, portfolio, verificación).

**Comercial:** Prospecto (lead capturado, vinculado opcionalmente a Usuario), Oportunidad (etapa de pipeline), Cotización (propuesta formal: alcance, precio, hitos propuestos, versión), Servicio (oferta publicada por un Proveedor), Categoría/Etiqueta (taxonomía del catálogo).

**Contractual:** Contrato (acuerdo formal derivado de una Cotización aceptada; referencia a Cliente, Proveedor, Servicio, plantilla legal, versión), Firma (evento de firma electrónica vinculado a un Usuario y un Contrato/versión).

**Proyecto y entrega:** Proyecto (instancia operativa de un Contrato), Hito (unidad de alcance y pago dentro de un Proyecto, con condiciones de liberación), Entregable (artefacto versionado vinculado a un Hito), Revisión (evento de comentario/feedback sobre un Entregable), Aprobación (evento formal de aceptación/objeción de un Hito, con evidencia).

**Fintech / Escrow:** CuentaEscrow (contenedor de fondos custodiados asociado a un Contrato), Depósito (evento de fondeo), Liberación (evento de pago hacia el Proveedor, parcial o total), Reembolso (evento de devolución hacia el Cliente), Disputa (caso abierto sobre un Hito/Contrato, con evidencia y resolución), Garantía/Holdback (retención temporal post-liberación), Wallet (saldo agregado por Proveedor), MovimientoWallet (histórico de créditos/débitos), Comisión (cálculo aplicado por la plataforma sobre una Liberación), Factura (comprobante fiscal derivado de una Liberación/ciclo de facturación).

**Comunicación:** Conversación (hilo vinculado a un Contrato/Proyecto/Cotización), Mensaje, Notificación (evento dirigido a un Usuario, multicanal), PreferenciaNotificacion.

**Confianza:** Reseña (evaluación bidireccional vinculada a un Contrato cerrado), ScoreReputacion (agregado calculado por Usuario/Empresa proveedora), Verificacion (resultado de proceso KYC/KYB vinculado a Usuario/Empresa).

**Gobierno y auditoría:** Documento (repositorio general: contratos, entregables, evidencias, actas), EventoAuditoria (registro inmutable de toda acción sensible), Rol/Permiso (definición RBAC/ABAC), ConfiguracionPlataforma (comisiones, políticas por defecto, feature flags), PlanSaaS (definición de tiers y límites), Suscripcion (vínculo Proveedor/Empresa↔PlanSaaS).

**Contenido:** ProyectoPortfolio (caso mostrado públicamente, puede o no derivar de un Contrato real), CasoDeExito, Articulo (blog), Recurso (descargable), Testimonio.

Relaciones clave a resaltar para la fase de modelado físico: un **Contrato** es la entidad bisagra entre lo comercial y lo fintech; la **CuentaEscrow** vive en relación 1:1 con el Contrato pero su historial de Depósitos/Liberaciones/Reembolsos es 1:N; un **Hito** es el punto de unión entre Proyecto (operación) y CuentaEscrow (dinero) — este acoplamiento es intencional y es el corazón del producto.

---

## 11. Arquitectura Escrow

### 11.1 Estados principales de una Cuenta Escrow

`CREADA → FONDEADA_PARCIAL / FONDEADA_TOTAL → EN_CUSTODIA → LIBERACION_PARCIAL (N veces) → EN_DISPUTA (posible, pausa transiciones) → LIBERADA_TOTAL → EN_GARANTIA → CERRADA`
Rutas alternativas: `CREADA → CANCELADA` (antes de fondeo), `FONDEADA_* → REEMBOLSADA_PARCIAL/TOTAL` (cancelación post-depósito), `EN_DISPUTA → RESUELTA_A_FAVOR_PROVEEDOR / RESUELTA_A_FAVOR_CLIENTE / RESUELTA_PROPORCIONAL`.

### 11.2 Estados de un Hito (dentro de un Contrato)

`PENDIENTE → EN_PROGRESO → ENTREGADO → EN_REVISION → APROBADO | OBJETADO`. `OBJETADO` puede volver a `EN_PROGRESO` (corrección dentro de alcance) o escalar a `EN_DISPUTA` a nivel de Escrow.

### 11.3 Reglas y validaciones core

- No hay liberación sin fondeo previo verificado (validación de idempotencia y de saldo disponible antes de cualquier transición de liberación).
- Toda transición de estado de Escrow genera un evento de auditoría inmutable con actor, timestamp, evidencia y firma criptográfica del evento (hash encadenado, tipo ledger).
- Las liberaciones por montos superiores a un umbral configurable requieren doble aprobación (cliente + validación automática de riesgo, o cliente + supervisor humano).
- La auto-liberación por inactividad del cliente solo aplica si hubo notificación previa con ventana mínima (ej. 3 avisos en 7 días) — protege al proveedor sin eliminar el derecho de revisión del cliente.
- Una Disputa abierta congela únicamente el tramo en conflicto, no la totalidad del Escrow del contrato (evita penalizar hitos ya aprobados).
- Los reembolsos y liberaciones son operaciones **idempotentes** e **irreversibles** una vez confirmadas por el proveedor de pagos subyacente; toda corrección posterior se modela como una operación compensatoria nueva, nunca como edición del registro histórico.

### 11.4 Depósitos, hitos, revisión y aprobación

El desglose de hitos se fija en el Contrato antes del primer depósito. Cada hito tiene: monto o porcentaje asociado, criterios de aceptación (texto libre o checklist configurable), plazo estimado, y política de auto-liberación propia (puede diferir por hito, ej. el hito final requiere aprobación explícita sin auto-liberación).

### 11.5 Liberaciones parciales y liberación final

Las liberaciones parciales se ejecutan hito por hito. La liberación final puede incluir un remanente no distribuido en hitos (ej. ajustes) y dispara, si está configurado, el paso a `EN_GARANTIA` en lugar de `CERRADA` directamente.

### 11.6 Reembolsos

Tres políticas configurables por el proveedor a nivel de servicio: reembolso total antes de inicio, reembolso proporcional a hitos no ejecutados, sin reembolso post-inicio (solo aplicable si se comunica explícitamente al cliente antes de la contratación, por requisitos de transparencia/regulación de protección al consumidor).

### 11.7 Disputas y arbitraje

Flujo: **Apertura** (cualquiera de las partes, con motivo y evidencia) → **Conciliación asistida** (ventana corta para que las partes resuelvan directamente, con o sin mediación de IA sugiriendo términos) → **Escalamiento a arbitraje** (Agente/Árbitro humano revisa evidencia: mensajes, versiones de entregables, historial de aprobaciones) → **Resolución** (liberación a favor de una parte, reembolso, o split proporcional) → **Registro** (la resolución y su justificación quedan en el log inmutable y pueden afectar el score de reputación de la parte responsable).

### 11.8 Auditoría y trazabilidad

Todo evento relevante (depósito, cambio de estado de hito, aprobación, liberación, apertura/resolución de disputa) se registra en un log de solo-append, con integridad verificable (encadenamiento de hashes), accesible en modo lectura para Auditores y Compliance, y exportable para requerimientos regulatorios o contables.

### 11.9 Interacción del Escrow con otros módulos

- **Contratos:** define las reglas de liberación antes de existir la Cuenta Escrow.
- **Proyectos/Hitos:** dispara transiciones de Escrow al cambiar de estado.
- **Documentos:** todo entregable relevante a una liberación queda enlazado como evidencia.
- **Wallet/Facturación:** toda Liberación genera un movimiento de Wallet y, según configuración, una Factura.
- **Reputación:** el cierre de un Contrato (con o sin disputa) alimenta el ScoreReputacion.
- **Notificaciones:** cada transición relevante dispara notificación multicanal a las partes.
- **IA:** análisis de riesgo de disputa y de fraude se ejecuta sobre eventos de Escrow en tiempo real o cuasi real.

---

## 12. Seguridad

- **Autenticación:** password + MFA obligatorio para roles con acceso a fondos o datos sensibles (proveedor, admin, compliance); soporte de passkeys/WebAuthn como objetivo de UX+seguridad superior a MFA por SMS.
- **Autorización:** RBAC como base (roles descritos en Sección 4) combinado con ABAC para reglas contextuales (ej. "solo el proveedor asignado a este contrato puede subir entregables de ese contrato").
- **OAuth/OIDC:** para login social opcional de clientes y para integraciones de terceros (API pública, partners white-label) como consumidores delegados con scopes acotados.
- **Cifrado:** en tránsito (TLS 1.3) y en reposo (cifrado de base de datos y de almacenamiento de documentos), con cifrado a nivel de campo para datos financieros/PII especialmente sensibles (identificadores fiscales, datos bancarios).
- **Gestión de secretos:** vault dedicado para credenciales de integraciones (PSPs, firma electrónica), rotación periódica, sin secretos en código ni configuración de despliegue en texto plano.
- **Protección documental:** control de acceso granular por documento, marca de agua/registro de descarga para entregables sensibles, expiración de enlaces compartidos.
- **Prevención de fraude:** reglas y modelos de detección sobre patrones anómalos (múltiples cuentas del mismo proveedor, disputas repetidas, velocidad inusual de depósito/retiro), verificación de identidad (KYC) previa a habilitar cobros, límites de retiro configurables con revisión manual sobre umbrales.
- **Auditoría y monitoreo:** logs inmutables (Sección 11.8) correlacionados con monitoreo de seguridad (SIEM) para detectar accesos indebidos, brute force, escalamiento de privilegios.
- **Detección de anomalías:** scoring de riesgo en tiempo real sobre eventos de autenticación y financieros, con respuesta automática (paso a revisión manual, congelamiento temporal de una operación) ante señales de alto riesgo.
- **Cumplimiento:** diseño alineado a principios de PCI DSS (aunque el manejo directo de tarjetas se delegue a un PSP certificado para reducir alcance de cumplimiento), GDPR/leyes locales de privacidad, y consideración de regulación de servicios de pago (ver Sección 16).
- **Gestión de vulnerabilidades:** ciclo de dependencias con escaneo automatizado, política de divulgación responsable, pruebas de penetración periódicas sobre el núcleo de Escrow y autenticación.

---

## 13. Arquitectura técnica

> Sección explícitamente tecnológica por solicitud del alcance. Se presentan alternativas viables y una recomendación justificada, no una imposición única salvo donde la justificación técnica es clara.

### 13.1 Frontend

| Alternativa            | Cuándo tiene sentido                                                                                                                                 |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vue 3 + Nuxt (SSR/SSG) | Continuidad directa con el stack actual (Vue 3 ya en uso); Nuxt aporta SSR/SEO necesario para la capa pública, algo que el SPA puro actual no ofrece |
| React + Next.js        | Mayor ecosistema de componentes y talento disponible; curva de reescritura total del frontend actual                                                 |
| SvelteKit              | Rendimiento superior y menor bundle; ecosistema más pequeño, mayor riesgo de contratación de talento                                                 |

**Recomendación:** migrar de Vue SPA a **Nuxt 3** (mantiene Vue, Composition API y gran parte del código de UI actual) para obtener SSR/SSG en las páginas públicas (crítico para SEO del portfolio/catálogo) sin descartar la inversión ya hecha. Las áreas transaccionales (portal cliente/proveedor) pueden operar como SPA autenticado dentro del mismo framework.

### 13.2 Backend

| Alternativa                                          | Cuándo tiene sentido                                                                                                               |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Node.js (NestJS)                                     | Continuidad de lenguaje con el frontend (TypeScript full-stack), buen soporte de arquitectura modular/hexagonal out-of-the-box     |
| Backend gestionado (Supabase/Firebase-like) para MVP | Válido para Modo 1 (un proveedor) por velocidad, pero insuficiente para las reglas de negocio complejas del Escrow a mediano plazo |
| Go                                                   | Mejor rendimiento y concurrencia para el núcleo de Escrow/pagos si se separa como servicio independiente                           |
| Java/Kotlin (Spring)                                 | Ecosistema maduro para sistemas financieros, mayor verbosidad y tiempo de desarrollo                                               |

**Recomendación:** **NestJS (Node/TypeScript)** como backend principal para velocidad de desarrollo y coherencia de lenguaje con el frontend, con la opción de aislar el núcleo de Escrow como servicio independiente en un lenguaje con mejores garantías de concurrencia/tipado estricto (Go o Kotlin) si el volumen transaccional lo justifica más adelante. No se recomienda depender indefinidamente de un backend 100% gestionado (Supabase) para el núcleo financiero por la necesidad de lógica de negocio compleja, auditoría a medida y control fino de transacciones — sí se recomienda **reutilizar Supabase (Postgres gestionado + Auth) como punto de partida en Modo 1**, con camino de migración claro hacia infraestructura propia al escalar.

### 13.3 BFF / API Gateway

Un **BFF por tipo de cliente** (web pública, portal autenticado, futura app móvil) reduce sobre-fetching y desacopla la evolución de UI del dominio. Un **API Gateway** (Kong, AWS API Gateway, o gestión propia sobre NestJS) centraliza autenticación, rate limiting y observabilidad para consumidores externos (partners, API pública).

### 13.4 Base de datos relacional

**PostgreSQL** es la recomendación clara y sin alternativa igualmente justificada para el núcleo transaccional (Contratos, Escrow, Pagos): soporta transacciones ACID estrictas, extensiones maduras (particionamiento, `pgcrypto`, `pg_partman`), y es la base ya usada vía Supabase — continuidad tecnológica real.

### 13.5 Base documental / NoSQL

MongoDB o DynamoDB para contenido semi-estructurado de alto volumen y bajo requerimiento transaccional: mensajería, logs de eventos de UI, borradores de propuestas generadas por IA. No debe usarse para datos financieros core.

### 13.6 Motor de búsqueda

Meilisearch o Typesense para búsqueda rápida y tipográficamente tolerante del catálogo/portfolio/blog (más simple de operar); Elasticsearch/OpenSearch si se requiere búsqueda semántica avanzada combinada con analítica de logs a gran escala.

### 13.7 Cache

Redis: cache de sesión, rate limiting, colas ligeras, y cache de resultados de catálogo/búsqueda.

### 13.8 Mensajería y eventos

Para un **modelo dirigido por eventos** (recomendado, ver Sección 18): Apache Kafka si se anticipa alto volumen y necesidad de replay de eventos (auditoría de Escrow se beneficia de esto); RabbitMQ o un servicio gestionado (AWS SQS/SNS, Google Pub/Sub) si el volumen inicial no justifica operar Kafka. **Recomendación para el arranque:** cola gestionada (SQS/Pub/Sub) por menor costo operativo, con diseño de eventos ya preparado para migrar a Kafka si el volumen de auditoría/replay lo exige.

### 13.9 Object Storage y CDN

S3-compatible (AWS S3, Cloudflare R2, Backblaze B2) para entregables y documentos, con cifrado en reposo y políticas de acceso firmadas (URLs temporales). CDN (Cloudflare, CloudFront) para activos públicos del portfolio/catálogo — ya alineado con el hosting estático actual en GitHub Pages, que debe evolucionar a un hosting con SSR (Vercel, Netlify Edge, o infraestructura propia) al adoptar Nuxt.

### 13.10 Contenedores y orquestación

Contenedores (Docker) desde el día 1 para paridad dev/prod. Kubernetes se justifica solo a partir de un número de servicios y necesidad de autoscaling que un MVP no tiene: **recomendación de arranque** con plataformas gestionadas de contenedores (AWS ECS Fargate, Google Cloud Run) por menor sobrecarga operativa, migrando a Kubernetes (EKS/GKE) si la organización crece a un equipo de plataforma dedicado.

### 13.11 Cloud

AWS, GCP y Azure son todos viables; **AWS** tiene la mayor madurez en servicios financieros/fintech de terceros (y el mayor ecosistema de partners de cumplimiento), lo que reduce fricción al integrar KYC/AML y PSPs. GCP es una alternativa válida si el equipo ya tiene experiencia previa o se prioriza su oferta de IA/BigQuery para analítica.

### 13.12 CI/CD

GitHub Actions (continuidad con el repositorio ya en GitHub) para build/test/deploy; despliegues progresivos (canary/blue-green) para los servicios del núcleo de Escrow dado su criticidad.

### 13.13 Observabilidad

OpenTelemetry como estándar de instrumentación (agnóstico de backend), con Grafana + Prometheus + Loki/Tempo (stack open-source, menor costo) o Datadog/New Relic (gestionado, menor esfuerzo operativo) según presupuesto y madurez del equipo de plataforma.

### 13.14 Infraestructura como código

Terraform (multi-cloud, mayor portabilidad) frente a CloudFormation/CDK (nativo AWS, más integrado si se elige AWS de forma definitiva). **Recomendación:** Terraform, para no acoplar la infraestructura a un único proveedor mientras el modelo de negocio de custodia de fondos aún puede requerir cambiar de proveedor de infraestructura financiera.

### 13.15 Servicios administrados vs. propios

Priorizar servicios administrados (bases de datos, colas, búsqueda, KYC, firma electrónica, PSP) en todo lo que no sea el diferenciador del producto. El diferenciador — la lógica de estados y reglas del Escrow — debe ser código propio, nunca delegado a un tercero como caja negra.

### 13.16 Integración con IA

Arquitectura de IA desacoplada del núcleo transaccional: los modelos de lenguaje (vía proveedor de API, ej. Anthropic Claude) operan sobre una capa de servicios de IA que consulta el dominio pero no escribe directamente sobre el Escrow — toda acción de IA que afecte dinero o contratos pasa por la misma capa de validación y auditoría que una acción humana equivalente (principio de "IA como actor auditado", no como bypass).

---

## 14. Integraciones

- **Pagos/PSP:** Stripe (Connect, ideal para modelos marketplace con split payments y KYC integrado), PayPal (alcance de usuarios finales amplio, menor flexibilidad para Escrow custom), proveedores de Open Banking (pagos directos de cuenta a cuenta, útil en mercados donde tarjeta tiene fees altos), y opcionalmente un proveedor de Escrow-as-a-Service regulado (ej. Escrow.com-like) para reducir el alcance de licenciamiento propio en etapas tempranas.
- **Facturación electrónica:** conectores a proveedores de facturación fiscal locales según jurisdicción (varían por país; se abstraen tras una interfaz de dominio "EmisorFiscal").
- **Firma electrónica:** DocuSign, HelloSign/Dropbox Sign, o soluciones locales según validez legal requerida por jurisdicción y monto del contrato.
- **Calendarios:** Google Calendar, Outlook/Microsoft 365, vía protocolos estándar (CalDAV) o APIs nativas.
- **Comunicación:** email transaccional (SendGrid/Postmark/SES), SMS (Twilio), WhatsApp Business API, Slack/Discord para notificaciones internas de equipo de proveedor.
- **Repositorios de código (para servicios de desarrollo):** GitHub/GitLab, para vincular entregables técnicos a commits/PRs como evidencia adicional.
- **Almacenamiento externo:** Google Drive, OneDrive, Dropbox, como fuente alterna de entregables para proveedores que ya operan con estas herramientas.
- **CRMs/ERPs externos:** conectores/webhooks hacia HubSpot, Salesforce, sistemas contables, para clientes corporativos que requieren reconciliar la plataforma con su propio backoffice.
- **Automatización:** Zapier/Make como puente de integración de bajo código para proveedores pequeños sin necesitar la API pública directamente.
- **Plataformas de IA:** proveedor de modelos de lenguaje (Anthropic Claude u otros) para las capacidades descritas en la Sección 15, y servicios de OCR/verificación de identidad especializados para KYC (ej. proveedores dedicados de identity verification).

---

## 15. Inteligencia Artificial

- **Generación automática de propuestas:** a partir de la descripción en lenguaje natural del cliente, borrador de alcance, hitos sugeridos y precio orientativo, siempre editable y aprobado por el proveedor antes de enviarse.
- **Asistente comercial:** ayuda al gestor comercial/proveedor a priorizar prospectos y sugerir siguiente acción en el pipeline.
- **Chat inteligente (pre-venta):** responde preguntas frecuentes del visitante sobre servicios/proceso antes de escalar a un humano.
- **Recomendación de servicios:** sugiere servicios relevantes al perfil/necesidad del visitante o cliente recurrente.
- **Búsqueda semántica:** permite consultas en lenguaje natural sobre el catálogo/portfolio ("necesito ayuda con mi tienda online") en vez de depender solo de filtros exactos.
- **Generación de contratos:** ensambla cláusulas desde plantillas según el tipo de servicio y el alcance acordado, siempre con revisión humana antes de la firma.
- **Análisis documental y OCR:** extracción de datos de documentos de identidad/fiscales para KYC/KYB, y de entregables (ej. extraer requisitos de un PDF de brief).
- **Clasificación automática:** de tickets de soporte por urgencia/categoría, y de prospectos por probabilidad de conversión.
- **Resúmenes de avance:** genera actualizaciones legibles para el cliente a partir de la actividad técnica/operativa del proyecto.
- **Análisis de satisfacción:** sentiment analysis sobre conversaciones y reseñas para detectar riesgo temprano de churn o disputa.
- **Detección de fraude:** modelos sobre patrones de comportamiento (múltiples cuentas, disputas repetidas, velocidad anómala de transacciones).
- **Predicción de riesgo de proyecto:** señales combinadas (atrasos, caída de comunicación, hitos vencidos) para alertar proactivamente a soporte/PM antes de que escale a disputa.
- **Automatización de soporte:** respuestas sugeridas y resolución de tickets de primer nivel, con escalamiento a humano cuando la confianza del modelo es baja o el ticket involucra dinero en disputa.

**Principio rector:** ninguna acción de IA libera fondos, firma contratos o resuelve disputas de forma autónoma sin una acción humana de confirmación explícita — la IA propone, un actor humano (o una regla determinística ya aprobada por humanos, como la auto-liberación) dispone.

---

## 16. Riesgos

| Categoría               | Riesgo                                                                                                                              | Mitigación                                                                                                                                                       |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Regulatorio             | Custodiar fondos de terceros puede requerir licencia de dinero electrónico/EMI o asociación con entidad regulada, variable por país | Empezar con un PSP/Escrow-as-a-Service regulado como intermediario legal de los fondos (pass-through), evaluando licencia propia solo si el volumen lo justifica |
| Financiero              | Disputas mal resueltas erosionan confianza en ambos lados del marketplace                                                           | Reglas de Escrow transparentes desde la cotización, arbitraje con evidencia auditable, holdback de garantía                                                      |
| Seguridad               | El núcleo de Escrow es el objetivo de mayor valor para atacantes                                                                    | Aislamiento del servicio de Escrow, auditoría inmutable, MFA obligatorio, revisión de seguridad periódica                                                        |
| Fraude                  | Colusión cliente-proveedor para simular servicio y liberar fondos de tarjetas robadas ("lavado" vía marketplace)                    | KYC/KYB, límites de retiro, modelos de detección de patrones anómalos, retención inicial más larga para cuentas nuevas                                           |
| Operativo               | Dependencia de terceros críticos (PSP, firma electrónica, KYC)                                                                      | Diseño con capa de abstracción por integración para poder sustituir proveedor sin rediseño                                                                       |
| Escalabilidad           | Picos de tráfico en el catálogo público no deben afectar la disponibilidad del núcleo financiero                                    | Separación de dominios (Sección 18), escalado independiente por bounded context                                                                                  |
| UX                      | Complejidad del proceso de Escrow puede generar fricción y abandono en clientes primerizos                                          | Wizard guiado, simulación de desglose de hitos antes de comprometer el pago, soporte proactivo en el primer contrato                                             |
| Disponibilidad          | Un incidente en el PSP externo bloquea nuevos depósitos/liberaciones                                                                | Colas con reintento y notificación de estado degradado, sin pérdida de eventos (outbox pattern)                                                                  |
| Dependencia de terceros | Cambios de términos/tarifas de PSPs o plataformas de IA afectan margen o funcionalidad                                              | Contratos multi-proveedor donde sea viable (ej. dos PSPs), revisión periódica de términos                                                                        |
| Reputacional            | Una disputa mal gestionada públicamente daña la marca de "plataforma de confianza"                                                  | Comunicación proactiva, SLA de resolución de disputas, canal de escalamiento claro                                                                               |
| Técnico                 | Acoplamiento excesivo entre Escrow y Proyectos puede dificultar evolución futura                                                    | Bounded contexts explícitos con contratos de eventos, no llamadas directas a base de datos entre dominios                                                        |
| Privacidad              | Manejo de datos de identidad (KYC) y financieros bajo múltiples jurisdicciones                                                      | Cifrado a nivel de campo, minimización de datos, política de retención por jurisdicción                                                                          |

---

## 17. Roadmap

**Fase 0 — Fundación (objetivo: reemplazar el portfolio estático actual por una base capaz de crecer)**
Módulos: Landing/CMS, Portfolio, Blog, Catálogo de Servicios (sin marketplace multi-proveedor), Contacto/Cotización básica, Identidad/Usuarios con MFA.
Dependencias: ninguna previa; reemplaza el SPA actual.
Prioridad: crítica. Complejidad: media. Riesgos: mínimos (no hay dinero de terceros en juego todavía).

**Fase 1 — Confianza mínima viable (objetivo: primer contrato real con Escrow simple, un solo proveedor)**
Módulos: Contratos (plantilla única), Escrow básico (depósito único + liberación total, sin hitos múltiples aún), integración con un PSP (Stripe), Wallet simple, Facturación básica, Mensajería contextual.
Dependencias: Fase 0.
Prioridad: crítica. Complejidad: alta (aquí vive el riesgo regulatorio y de seguridad más importante). Riesgos: regulatorio, seguridad, fraude.

**Fase 2 — Operación completa del ciclo de proyecto**
Módulos: Hitos múltiples con liberación parcial, Entregables versionados, Workflow de aprobación, Garantía/holdback, Notificaciones multicanal, Portal Cliente y Portal Proveedor completos.
Dependencias: Fase 1.
Prioridad: alta. Complejidad: alta. Riesgos: UX (fricción del proceso), operativo.

**Fase 3 — Disputas, reputación y confianza pública**
Módulos: Disputas y arbitraje, Sistema de reseñas y reputación, Verificación de proveedores (KYC/KYB), auditoría inmutable completa.
Dependencias: Fase 2.
Prioridad: alta. Complejidad: media-alta. Riesgos: reputacional, fraude.

**Fase 4 — Marketplace multi-proveedor**
Módulos: onboarding de proveedores externos, Marketplace con búsqueda/filtros/comparación, comisiones de plataforma, CRM/pipeline comercial completo, planes SaaS y suscripciones.
Dependencias: Fase 3 (la confianza pública debe existir antes de abrir a terceros).
Prioridad: media-alta (es el salto a "SaaS" real). Complejidad: alta. Riesgos: regulatorio (ahora custodia fondos de muchos terceros), fraude, escalabilidad.

**Fase 5 — Inteligencia y automatización**
Módulos: asistentes de IA (propuestas, contratos, resúmenes), búsqueda semántica, detección de fraude/riesgo asistida por IA, analítica predictiva.
Dependencias: Fase 4 (se necesita volumen de datos real para que la IA aporte valor y para entrenar/calibrar detección de fraude).
Prioridad: media. Complejidad: media-alta. Riesgos: técnico (calidad de modelo), UX (confianza del usuario en decisiones asistidas por IA).

**Fase 6 — Plataforma y ecosistema**
Módulos: API pública, white-label, marketplace de plugins, programa de afiliados/partners, multi-tenant completo.
Dependencias: Fase 5 y validación de product-market fit en Fase 4.
Prioridad: media-baja (crecimiento, no supervivencia). Complejidad: alta. Riesgos: operativo, dependencia de terceros.

---

## 18. Recomendaciones técnicas

- **Domain-Driven Design (sí, con foco selectivo):** modelar explícitamente los bounded contexts identificados en la Sección 9 (Presencia/Marketing, Comercial, Confianza/Fintech, Operación/Entrega), con especial rigor de DDD táctico (agregados, invariantes, lenguaje ubicuo) en el contexto Confianza/Fintech, donde los errores de modelado son más caros. No es necesario aplicar el mismo rigor al contexto de Presencia/Marketing, que es mayormente CRUD de contenido.

- **Monolito modular vs. microservicios:** se recomienda **arrancar con un monolito modular** (módulos con límites de dominio claros dentro de un mismo despliegue), extrayendo como **servicio independiente únicamente el núcleo de Escrow/Pagos** desde el principio, dado que tiene requisitos de seguridad, auditoría y escalado distintos al resto. Fragmentar todo en microservicios desde el día 1 añade costo operativo sin beneficio demostrado a esta escala. La extracción incremental de más servicios (Búsqueda, Mensajería, IA) se justifica cuando su carga o ciclo de despliegue diverge claramente del resto.

- **Arquitectura hexagonal / Clean Architecture:** aplicar puertos y adaptadores especialmente en el núcleo de Escrow y en las integraciones (PSP, firma electrónica, KYC), de forma que un cambio de proveedor externo (ej. cambiar de Stripe a otro PSP, o de un proveedor de KYC a otro) no requiera tocar la lógica de dominio. Esto es más una necesidad de negocio (riesgo de dependencia de terceros, Sección 16) que una preferencia estilística.

- **CQRS (selectivo, no generalizado):** justificado en los módulos con alta divergencia entre patrones de lectura y escritura — por ejemplo, el dashboard financiero/analítico (lecturas agregadas complejas) frente a las transacciones de Escrow (escrituras estrictas y validadas). No se recomienda aplicar CQRS al catálogo de servicios o al blog, donde no aporta valor proporcional a su complejidad.

- **Event-Driven Architecture:** recomendada como columna vertebral de integración entre bounded contexts (ej. "HitoAprobado" dispara reacciones en Escrow, Notificaciones, Reputación y Analítica sin acoplar esos módulos entre sí). Combinar con el patrón **Outbox** para garantizar que un cambio de estado en la base de datos y la publicación de su evento correspondiente sean atómicos — crítico en el núcleo financiero para evitar eventos perdidos o duplicados.

- **Escalabilidad:** diseñar el modelo de datos pensando en particionamiento por tenant/proveedor desde el día 1 (aunque no se implemente física mente todavía), para que la Fase 4 (multi-tenant) no requiera una migración de esquema traumática.

- **Observabilidad y DevSecOps:** instrumentar desde la Fase 1 (no como algo "para después") dado que el núcleo financiero exige trazabilidad desde el primer contrato real. Integrar escaneo de dependencias y análisis estático en el pipeline de CI/CD desde el inicio, no como iniciativa posterior.

- **Pruebas automatizadas:** priorizar cobertura exhaustiva (incluyendo pruebas de propiedades/invariantes, no solo casos felices) en el núcleo de Escrow y en el motor de reglas de liberación/reembolso — es el código donde un bug se traduce directamente en pérdida de dinero o de confianza. El resto del sistema puede tener una estrategia de pruebas más convencional.

- **CI/CD y estrategia de despliegue:** despliegues progresivos (canary o blue-green) para el servicio de Escrow/Pagos, con capacidad de rollback inmediato; el resto de módulos puede usar despliegue continuo estándar.

- **Optimización de costos:** priorizar servicios administrados fuera del diferenciador (Sección 13.15); revisar el costo por transacción de Escrow (comisión del PSP + infraestructura) contra la comisión cobrada al proveedor para asegurar margen positivo desde el volumen mínimo viable.

- **Seguridad continua (DevSecOps):** revisión de seguridad obligatoria antes de cada release que toque el núcleo de Escrow, autenticación o manejo de datos de KYC, no solo auditorías periódicas genéricas.

- **Evolución del producto:** mantener el mismo modelo de dominio (Sección 10) desde Modo 1 hasta Modo N — la diferencia entre "un proveedor" y "un marketplace" debe ser configuración y datos, no una reescritura de arquitectura.

---

## 19. Funcionalidades futuras

- **Marketplace de plugins/extensiones:** terceros construyen integraciones o automatizaciones sobre la API pública, con revenue share.
- **Agentes inteligentes autónomos (con límites auditados):** un agente de IA que gestiona proactivamente el seguimiento de un proyecto (recordatorios, resúmenes, detección de riesgo) actuando "en nombre de" el proveedor, siempre dentro del principio de la Sección 15 (no dispone de fondos).
- **Constructor visual de servicios:** el proveedor arma su servicio, hitos y flujo de aprobación con un editor visual sin intervención técnica.
- **Sistema de afiliados y programa de partners:** referidos de clientes/proveedores con comisión recurrente.
- **API pública documentada:** para que empresas integren cotización/contratación/Escrow dentro de sus propios sistemas.
- **White-label completo:** agencias despliegan su propia instancia de marca sobre la infraestructura del producto (multi-tenant real).
- **Multi-tenant a nivel de infraestructura:** aislamiento fuerte de datos por tenant para clientes empresariales/white-label con requisitos de compliance propios.
- **Marketplace de expertos verificados:** capa premium de proveedores certificados por la plataforma, con mayor visibilidad y garantías reforzadas.
- **Sistema de certificaciones propias:** la plataforma certifica competencias o calidad de proceso de un proveedor (más allá de KYC de identidad).
- **Analítica predictiva avanzada:** predicción de LTV de cliente, probabilidad de renovación, y de éxito de un proyecto antes de iniciarlo, en base a patrones históricos.
- **Automatización empresarial (workflow builder):** clientes corporativos configuran sus propias reglas de aprobación interna antes de que un pago corporativo entre a Escrow (ej. doble aprobación de un gerente de compras).
- **Escrow-as-a-Service:** exponer el motor de Escrow como producto independiente vía API para plataformas de terceros que no son marketplaces de servicios profesionales (ej. e-commerce C2C, alquiler de equipos).
- **App móvil nativa:** portal cliente/proveedor con notificaciones push nativas y firma/aprobación biométrica de hitos.
- **Modo offline/asistido para proveedores no técnicos:** onboarding asistido por IA o humano para verticales con menor alfabetización digital (ej. servicios legales tradicionales, oficios).

---

_Fin del documento maestro. Este documento debe usarse como insumo de entrada para: backlog priorizado, historias de usuario detalladas, diseño de arquitectura técnica detallada, diseño de API, modelo de datos físico, diseño de infraestructura, especificación de UI/UX, plan de pruebas e implementación._
