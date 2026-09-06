<template>
  <section id="inicio" class="relative min-h-screen flex items-center overflow-hidden bg-grid">
    <!-- Glow decorativo -->
    <div
      class="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-accent/20 blur-[120px] pointer-events-none"
    ></div>
    <div
      class="absolute -bottom-48 -right-40 w-[600px] h-[600px] rounded-full bg-accent2/20 blur-[120px] pointer-events-none"
    ></div>

    <div class="relative max-w-6xl mx-auto px-6 pt-28 pb-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <!-- Texto -->
      <div class="order-2 md:order-1">
        <span
          class="inline-flex items-center gap-2 text-sm text-accentlight bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 mb-6"
        >
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          Disponible para proyectos
        </span>

        <h1 class="font-display text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
          Hola, soy
          <span class="text-gradient">Jair Flores</span>
        </h1>
        <p class="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed max-w-lg">
          Desarrollador de software te puedo ayudar a digitalizar tus ideas y convertirlas en experiencias únicas
        </p>

        <div class="flex flex-row flex-wrap items-center gap-4">
          <a
            href="#about"
            class="bg-gradient-to-r from-accent to-accent2 text-white px-7 py-3 rounded-lg font-medium shadow-lg shadow-accent/30 hover:opacity-90 hover:-translate-y-0.5 transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-dark"
            >Saber más</a
          >
          <a
            href="Tech_Resume_Jair.pdf"
            download="cvJairFlores.pdf"
            class="border border-darkborder text-lightgray px-7 py-3 rounded-lg font-medium hover:border-accent/60 hover:text-white hover:-translate-y-0.5 transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-dark"
            >Descargar CV</a
          >
        </div>
      </div>

      <!-- Foto -->
      <div class="order-1 md:order-2 flex justify-center">
        <div
          class="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-tr from-accent via-accent2 to-cyan-400 p-1 shadow-2xl shadow-accent/30"
        >
          <img
            :src="photo"
            alt="Foto de Jair Flores, desarrollador de software"
            class="w-full h-full object-cover rounded-full ring-4 ring-dark"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import photo from '../../assets/photo_2026-08-08_15-05-20.jpg'

defineOptions({ name: 'HeroSection' })
</script>
