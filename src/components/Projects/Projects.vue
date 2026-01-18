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

      <!-- Formulario -->
      <form @submit.prevent="addProject" class="bg-white p-6 rounded shadow space-y-4">
        <input
          v-model="newProject.title"
          type="text"
          placeholder="Título del proyecto"
          class="w-full border p-2 rounded"
          required
        />

        <input
          v-model="newProject.image"
          type="text"
          placeholder="URL de la imagen"
          class="w-full border p-2 rounded"
          required
        />

        <textarea
          v-model="newProject.description"
          placeholder="Descripción"
          class="w-full border p-2 rounded"
          required
        ></textarea>

        <input
          v-model="newProject.url"
          type="url"
          placeholder="URL del proyecto (https://...)"
          class="w-full border p-2 rounded"
        />

        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Añadir proyecto
        </button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        {
          title: "Proyecto de ejemplo",
          image: "https://picsum.photos/400/200?random=1",
          description: "Descripción breve del proyecto de ejemplo.",
          url: "https://example.com",
        },
      ],
      newProject: {
        title: "",
        image: "https://picsum.photos/400/200?random",
        description: "",
        url: "",
      },
      featured: null,
    };
  },
  methods: {
    addProject() {
      if (!this.newProject.title || !this.newProject.image || !this.newProject.description) return;

      this.projects.push({ ...this.newProject });
      this.newProject = { title: "", image: "", description: "", url: "" };
    },
    setFeatured(project) {
      this.featured = project;
    },
  },
};
</script>

