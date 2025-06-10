<template>
  <footer class="px-6 border-t text-sm text-gray-800 max-w-5xl mx-auto py-8">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
      <div>
      <!-- Parte izquierdo -->
      <h2 class="text-lg font-semibold">
        Portfolio de <span class="font-bold">Jair Flores</span>
      </h2>
      <div class="flex space-x-4 mt-2">
        <SocialIcon
          :icon="TwitterIcon"
          url="https://twitter.com"
          label="Twitter"
        />
        <SocialIcon
          :icon="GitHubIcon"
          url="https://github.com"
          label="GitHub"
        />
        <SocialIcon
          :icon="LinkedinIcon"
          url="https://linkedin.com"
          label="LinkedIn"
        />
      </div>
    </div>


      <!-- Parte derecha -->

        <!-- <p class="text-gray-600">© 2023 Jair Flores</p> -->

    <div class="text-right">
        <h3 class="text-base font-semibold mb-2">Enlaces</h3>
        <ul class="space-y-1">
          <li><a href="#inicio" class="hover:underline">Inicio</a></li>
          <li><a href="#about" class="hover:underline">Sobre mí</a></li>
          <li><a href="#project" class="hover:underline">Proyectos</a></li>
          <li><a href="#contact" class="hover:underline">Contacto</a></li>
        </ul>
      </div>
    </div>
    <p class="text-center text-gray-600 mt-6">
      © 2025 Jair Flores. Todos los derechos reservados.
    </p>
  </footer>
</template>
<script>
import SocialIcon from "../Foother/SocialIcon.vue";
import TwitterIcon from "../../assets/icons/icon-twitter.svg";
import GitHubIcon from "../../assets/icons/github.svg";
import LinkedinIcon from "../../assets/icons/linkedin.svg";

export default {
  name: "Contacto",
  components: {
    SocialIcon,
  },
  data() {
    return {
      TwitterIcon,
      GitHubIcon,
      LinkedinIcon,
    };
  },
};
</script>
