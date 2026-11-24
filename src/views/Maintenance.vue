<script setup>
defineOptions({ name: 'MaintenanceView' })
</script>

<template>
  <main class="bg-grid relative flex min-h-screen items-center justify-center bg-dark px-6 py-16">
    <div
      class="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-accent/20 blur-[120px] pointer-events-none"
    ></div>
    <div
      class="absolute -right-40 -bottom-48 h-[600px] w-[600px] rounded-full bg-accent2/20 blur-[120px] pointer-events-none"
    ></div>

    <section
      class="relative w-full max-w-xl rounded-2xl border border-darkborder bg-dark/80 p-8 text-center shadow-2xl shadow-accent/10 md:p-12"
    >
      <span
        class="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accentlight"
      >
        <span class="relative flex h-2 w-2">
          <span
            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
          ></span>
          <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
        </span>
        Mantenimiento programado
      </span>

      <h1 class="font-display mt-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
        Sitio en <span class="text-gradient">mantenimiento</span>
      </h1>

      <p class="mt-6 text-base leading-relaxed text-gray-400 md:text-lg">
        El portfolio de Jair Flores está temporalmente en pausa mientras se realizan
        actualizaciones. Volverá a estar disponible próximamente.
      </p>

      <p class="mt-8 text-sm text-gray-500">Gracias por tu paciencia.</p>
    </section>
  </main>
</template>
