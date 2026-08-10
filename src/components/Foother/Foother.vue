<template>
  <footer class="px-6 border-t border-darkborder text-sm text-gray-400 max-w-6xl mx-auto py-10">
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0"
    >
      <div>
        <h2 class="text-lg font-display font-semibold text-lightgray">
          Portfolio de <span class="text-accent font-bold">Jair Flores</span>
        </h2>
        <p class="mt-1 text-gray-500">Desarrollador Frontend</p>
        <div class="flex space-x-4 mt-4">
          <SocialIcon :icon="TwitterIcon" url="https://twitter.com" label="Twitter" />
          <SocialIcon :icon="GitHubIcon" url="https://github.com" label="GitHub" />
          <SocialIcon :icon="LinkedinIcon" url="https://linkedin.com" label="LinkedIn" />
        </div>
      </div>

      <div class="text-right">
        <h3 class="text-base font-semibold mb-2 text-lightgray">Enlaces</h3>
        <ul class="space-y-1">
          <li>
            <a
              href="#inicio"
              class="hover:text-accentlight hover:underline underline-offset-4 transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded"
              >Inicio</a
            >
          </li>
          <li>
            <a
              href="#about"
              class="hover:text-accentlight hover:underline underline-offset-4 transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded"
              >Sobre mí</a
            >
          </li>
          <li>
            <a
              href="#project"
              class="hover:text-accentlight hover:underline underline-offset-4 transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded"
              >Proyectos</a
            >
          </li>
          <li>
            <a
              href="#contact"
              class="hover:text-accentlight hover:underline underline-offset-4 transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded"
              >Contacto</a
            >
          </li>
        </ul>
      </div>
    </div>
    <p class="text-center text-gray-600 mt-8">
      © 2025 Jair Flores. Todos los derechos reservados.
    </p>
  </footer>
</template>
<script>
import SocialIcon from '../Foother/SocialIcon.vue'
import TwitterIcon from '../../assets/icons/icon-twitter.svg'
import GitHubIcon from '../../assets/icons/github.svg'
import LinkedinIcon from '../../assets/icons/linkedin.svg'

export default {
  name: 'AppFooter',
  components: {
    SocialIcon,
  },
  data() {
    return {
      TwitterIcon,
      GitHubIcon,
      LinkedinIcon,
    }
  },
}
</script>
