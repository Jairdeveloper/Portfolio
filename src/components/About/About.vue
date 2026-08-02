<template>
  <section >
    <div class="p-8 max-w-5xl mx-auto">


    <h2 class="text-3xl font-bold mb-6 pb-2 border-b">Sobre mí</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

    <!-- Experiencia Laboral -->
    <div>
      <div class="flex items-center gap-2 mb-4">
        <span class="text-xl">💼</span>
        <h3 class="text-lg font-semibold">EXPERIENCIA LABORAL</h3>
      </div>

      <div class="border-l-2 border-gray-300 pl-4 space-y-4">
        <div v-for="(job, index) in experience" :key="index">
          <p class="font-medium">{{ job.role }}</p>
          <p class="text-sm text-gray-500">{{ job.period }}</p>
        </div>
      </div>

      <!-- Idiomas -->
      <div class="mt-8">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xl">🗣️</span>
          <h3 class="text-lg font-semibold">IDIOMAS</h3>
        </div>
        <p v-for="(lang, index) in languages" :key="index">
          {{ lang.name }} <span class="text-sm text-gray-500">— {{ lang.level }}</span>
        </p>
      </div>
    </div>

    <!-- Formación y habilidades -->
    <div>
      <div class="flex items-center gap-2 mb-4">
        <span class="text-xl">🎓</span>
        <h3 class="text-lg font-semibold">FORMACIÓN/ESTUDIOS</h3>
      </div>

      <div class="border-l-2 border-gray-300 pl-4 space-y-4">
        <div v-for="(edu, index) in education" :key="index">
          <p class="font-medium">{{ edu.title }}</p>
          <p class="text-sm text-gray-500">{{ edu.period }}</p>
        </div>
      </div>

      <!-- Otras habilidades -->
      <div class="mt-8">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xl">📊</span>
          <h3 class="text-lg font-semibold">OTRAS HABILIDADES</h3>
        </div>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="skill in skills"
            :key="skill"
            class="inline-block bg-gray text-dark text-sm px-3 py-1 rounded-full"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </div>
  </div>

  </section>
</template>

<script>
// TODO (Fase 0 pendiente): reemplazar `experience`, `education` y `languages` con datos
// reales (empleos, estudios/certificaciones, nivel real de idiomas). Ver
// docs/IMPLEMENTATION_PLAN.md tarea 1.2. `skills` ya refleja tecnologías reales del stack
// del proyecto (Fase 1: se reemplazaron las barras de progreso arbitrarias por una lista
// simple, decisión confirmada por el usuario).
export default {
  data() {
    return {
      experience: [
        { role: 'Pendiente — añade tu experiencia real aquí', period: 'Pendiente' },
      ],
      education: [
        { title: 'Pendiente — añade tu formación real aquí', period: 'Pendiente' },
      ],
      languages: [
        { name: 'Inglés', level: 'nivel pendiente de definir' },
      ],
      skills: ['HTML5', 'CSS', 'JavaScript', 'Vue 3', 'Tailwind CSS'],
    }
  },
}
</script>
