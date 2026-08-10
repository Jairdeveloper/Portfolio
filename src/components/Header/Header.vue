<template>
  <header class="fixed top-0 inset-x-0 z-50 bg-dark/80 backdrop-blur border-b border-darkborder">
    <div class="max-w-6xl mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <a href="#inicio" class="font-display text-xl font-bold tracking-tight">
          Jair<span class="text-accent">.</span>Flores
        </a>

        <!-- Nav de escritorio: siempre visible desde el breakpoint md hacia arriba -->
        <nav class="hidden md:flex items-center space-x-8">
          <a
            href="#inicio"
            class="text-sm text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded"
            >Inicio</a
          >
          <a
            href="#about"
            class="text-sm text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded"
            >Sobre mí</a
          >
          <a
            href="#project"
            class="text-sm text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded"
            >Proyectos</a
          >
          <a
            href="#contact"
            class="text-sm bg-gradient-to-r from-accent to-accent2 px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-dark"
            >Contacto</a
          >
        </nav>

        <!-- Botón hamburguesa: solo visible por debajo de md (pantallas pequeñas) -->
        <button
          type="button"
          class="md:hidden text-2xl leading-none p-2 text-lightgray focus:outline-none focus:ring-2 focus:ring-accent rounded"
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
        class="md:hidden flex flex-col space-y-4 mt-4 pb-2"
        @click="open = false"
      >
        <a href="#inicio" class="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent rounded">Inicio</a>
        <a href="#about" class="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent rounded">Sobre mí</a>
        <a href="#project" class="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent rounded">Proyectos</a>
        <a href="#contact" class="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent rounded">Contacto</a>
      </nav>
    </div>
  </header>
</template>

<script setup>
defineOptions({ name: 'AppHeader' })

import { ref } from 'vue'

const open = ref(false)
</script>
