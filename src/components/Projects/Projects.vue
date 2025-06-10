<template>
  <section class="p-6 max-w-5xl mx-auto">

  
  <div >

    <!-- Título -->
    <h2 class="text-3xl font-semibold mb-6 border-b pb-2">Proyectos</h2>
    
    <!-- Sección Destacada -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div id="seccion-izq">
        <img
          v-if="featured"
          :src="featured.image"
          :alt="featured.title"
          class="w-full h-auto object-cover rounded shadow"
        />
      </div>
      <div id="seccion-der">
        <h3 v-if="featured" class="text-2xl font-semibold mb-2">{{ featured.title }}</h3>
        <p v-if="featured" class="text-gray-700">{{ featured.description }}</p>
      </div>
    </div>


    <!-- Grid de proyectos -->
    <div id="grid-container" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
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
        <p class="text-xs text-gray-600 mb-4">{{ project.description }}</p>
        <button class="bg-gray-300 px-4 py-2 text-sm hover:bg-gray-400 transition">SABER MÁS</button>
      </div>
    </div>

    <!-- Formulario para añadir proyectos -->
    <form @submit.prevent="addProject" id="form" class="bg-white p-6 rounded shadow space-y-4">
      <input
        v-model="newProject.title"
        id="title"
        type="text"
        placeholder="Título del proyecto"
        class="w-full border p-2 rounded"
        required
      />
      <input
        v-model="newProject.image"
        id="image"
        type="text"
        placeholder="URL de imagen"
        class="w-full border p-2 rounded"
        required
      />
      <textarea
        v-model="newProject.description"
        id="description"
        placeholder="Descripción"
        class="w-full border p-2 rounded"
        required
      ></textarea>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
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
        },
      ],
      newProject: {
        title: "",
        image: "",
        description: "",
      },
      featured: null,
    };
  },
  methods: {
    addProject() {
      if (!this.newProject.title || !this.newProject.image || !this.newProject.description) return;

      this.projects.push({ ...this.newProject });
      this.newProject = { title: "", image: "", description: "" };
    },
    setFeatured(project) {
      this.featured = project;
    },
  },
};
</script>

<style scoped>
/* Opcional para mejor diseño */
</style>
