<template>
  <section id="about" class="py-24">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Título -->
      <div class="mb-12">
        <p class="text-accent font-semibold tracking-[0.2em] uppercase text-sm mb-2">Sobre mí</p>
        <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tight">Conóceme</h2>
        <div class="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-cyan-400 rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Experiencia Laboral -->
        <div class="space-y-8">
          <div class="bg-darkcard border border-darkborder rounded-2xl p-6">
            <div class="flex items-center gap-3 mb-5">
              <span
                class="w-11 h-11 rounded-xl bg-accent/15 text-accent flex items-center justify-center"
              >
                <img :src="WorkIcon" alt="" class="w-5 h-5 brightness-0 invert opacity-90" />
              </span>
              <h3 class="font-semibold text-lg">Experiencia laboral</h3>
            </div>

            <div class="border-l-2 border-accent/40 pl-4 space-y-6">
              <div v-for="(job, index) in experience" :key="index">
                <p class="font-medium">{{ job.role }}</p>
                <p class="text-sm text-gray-500">{{ job.period }}</p>
              </div>
            </div>
          </div>

          <!-- Idiomas -->
          <div class="bg-darkcard border border-darkborder rounded-2xl p-6">
            <div class="flex items-center gap-3 mb-5">
              <span
                class="w-11 h-11 rounded-xl bg-accent/15 text-accent flex items-center justify-center"
              >
                <img :src="LanguageIcon" alt="" class="w-5 h-5 brightness-0 invert opacity-90" />
              </span>
              <h3 class="font-semibold text-lg">Idiomas</h3>
            </div>
            <div class="space-y-3">
              <p v-for="(lang, index) in languages" :key="index">
                {{ lang.name }} <span class="text-sm text-gray-500">— {{ lang.level }}</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Formación y habilidades -->
        <div class="space-y-8">
          <div class="bg-darkcard border border-darkborder rounded-2xl p-6">
            <div class="flex items-center gap-3 mb-5">
              <span
                class="w-11 h-11 rounded-xl bg-accent/15 text-accent flex items-center justify-center"
              >
                <img :src="EducationIcon" alt="" class="w-5 h-5 brightness-0 invert opacity-90" />
              </span>
              <h3 class="font-semibold text-lg">Formación / Estudios</h3>
            </div>

            <div class="border-l-2 border-accent/40 pl-4 space-y-6">
              <div v-for="(edu, index) in education" :key="index">
                <p class="font-medium">{{ edu.title }}</p>
                <p class="text-sm text-gray-500">{{ edu.period }}</p>
              </div>
            </div>
          </div>

          <!-- Otras habilidades -->
          <div class="bg-darkcard border border-darkborder rounded-2xl p-6">
            <div class="flex items-center gap-3 mb-5">
              <span
                class="w-11 h-11 rounded-xl bg-accent/15 text-accent flex items-center justify-center"
              >
                <img :src="SkillsIcon" alt="" class="w-5 h-5 brightness-0 invert opacity-90" />
              </span>
              <h3 class="font-semibold text-lg">Otras habilidades</h3>
            </div>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in skills"
                :key="skill"
                class="inline-block bg-accent/10 text-accentlight border border-accent/30 text-sm px-4 py-1.5 rounded-full"
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
import WorkIcon from '../../assets/icons/icon-work.svg'
import LanguageIcon from '../../assets/icons/icon-language.svg'
import EducationIcon from '../../assets/icons/icon-education.svg'
import SkillsIcon from '../../assets/icons/icon-skills.svg'

export default {
  name: 'AboutSection',
  data() {
    return {
      WorkIcon,
      LanguageIcon,
      EducationIcon,
      SkillsIcon,
      experience: [
        { role: 'Técnico en reparacion de celulares', period: '2015-2017' },
        { role: 'Técnico en instalación y mantenimiento de internet, cable y telefono', period: '2013-2014' }
      ],
      education: [{ title: 'Bachiller en Ciencias', period: '2004-2009' }],
      languages: [{ name: 'Inglés', level: 'Básico' }],
      skills: ['HTML5', 'CSS', 'JavaScript', 'Vue 3', 'Tailwind CSS'],
    }
  },
}
</script>
