<template>
  <header class="p-6 max-w-5xl mx-auto">
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-bold">Portfolio de Jair Flores</h1>

      <!-- Nav de escritorio: siempre visible desde el breakpoint md hacia arriba -->
      <nav class="hidden md:flex space-x-4">
        <a href="#inicio" class="focus:outline-none focus:ring-2 focus:ring-dark rounded">Inicio</a>
        <a href="#about" class="focus:outline-none focus:ring-2 focus:ring-dark rounded"
          >Sobre mí</a
        >
        <a href="#contact" class="focus:outline-none focus:ring-2 focus:ring-dark rounded"
          >Contacto</a
        >
      </nav>

      <!-- Botón hamburguesa: solo visible por debajo de md (pantallas pequeñas) -->
      <button
        type="button"
        class="md:hidden text-2xl leading-none p-2 focus:outline-none focus:ring-2 focus:ring-dark rounded"
        :aria-expanded="open"
        aria-controls="main-nav-mobile"
        aria-label="Abrir menú de navegación"
        @click="open = !open"
      >
        {{ open ? '✕' : '☰' }}
      </button>
    </div>

    <!-- Nav mobile: colapsable, controlada por `open` -->
    <nav
      v-show="open"
      id="main-nav-mobile"
      class="md:hidden flex flex-col space-y-3 mt-4"
      @click="open = false"
    >
      <a href="#inicio" class="focus:outline-none focus:ring-2 focus:ring-dark rounded">Inicio</a>
      <a href="#about" class="focus:outline-none focus:ring-2 focus:ring-dark rounded">Sobre mí</a>
      <a href="#contact" class="focus:outline-none focus:ring-2 focus:ring-dark rounded"
        >Contacto</a
      >
    </nav>
  </header>
</template>

<script setup>
defineOptions({ name: 'AppHeader' })

import { ref } from 'vue'

// `ref` crea un valor reactivo: cuando `open` cambia, Vue vuelve a renderizar
// automáticamente cualquier parte del template que lo use (el botón, el v-show del nav).
// En el <script> se lee/escribe con `.value` (open.value); en el template Vue lo
// "desenvuelve" solo, por eso ahí se usa `open` directamente.
const open = ref(false)
</script>
