<template>
  <section class="p-6 max-w-5xl mx-auto">
    <div>
      <!-- Título -->
      <h2 class="text-3xl font-semibold mb-6 border-b pb-2">Proyectos</h2>

      <!-- Sección Destacada -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div>
          <img
            v-if="featured"
            :src="featured.image"
            :alt="featured.title"
            class="w-full h-auto object-cover rounded shadow"
          />
        </div>
        <div>
          <h3 v-if="featured" class="text-2xl font-semibold mb-2">
            {{ featured.title }}
          </h3>
          <p v-if="featured" class="text-gray-700 mb-2">
            {{ featured.description }}
          </p>
          <a
            v-if="featured?.url"
            :href="featured.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 underline text-sm"
          >
            Ver proyecto
          </a>
        </div>
      </div>

      <!-- Grid de proyectos -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="border p-4 shadow-sm bg-white"
        >
          <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-48 object-cover mb-4 cursor-pointer"
            @click="setFeatured(project)"
          />

          <h3 class="text-sm font-semibold mb-1">{{ project.title }}</h3>
          <p class="text-xs text-gray-600 mb-3">{{ project.description }}</p>

          <a
            v-if="project.url"
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block text-sm text-blue-600 underline"
          >
            Ver proyecto
          </a>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
// TODO (Fase 0 pendiente): reemplazar este único proyecto de ejemplo con 2-4 proyectos
// reales (nombre, descripción de tu rol específico, stack, link a demo/repo, captura real
// en vez de picsum.photos). Ver docs/IMPLEMENTATION_PLAN.md tarea 1.5.
export default {
  data() {
    return {
      projects: [
        {
          title: "Food finder",
          image: "https://picsum.photos/400/200?random=1",
          description: "The Food Finder application shows a list of restaurants and their locations. The user can click  these to see additional details about each location. In addition, they can log in to the app with their GitHub accounts by using OAuth so that they can maintain a wish list of locations.Descripción breve del proyecto de ejemplo.",
          url: "https://foodfinder-fjpa4w2uc-zped08s-projects.vercel.app/",
        },
      ],
      featured: null,
    };
  },
  methods: {
    setFeatured(project) {
      this.featured = project;
    },
  },
};
</script>

