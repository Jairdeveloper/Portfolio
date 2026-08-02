<template>
  <section class="p-6 max-w-5xl mx-auto">
    <h2 class="text-3xl font-semibold mb-6 border-b pb-2">Blog</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <article
        v-for="post in posts"
        :key="post.id"
        class="border p-4 shadow-sm bg-white flex flex-col hover:shadow-lg transition-shadow duration-300"
      >
        <img
          v-if="post.image"
          :src="post.image"
          :alt="post.title"
          class="w-full h-40 object-cover mb-4 rounded"
        />
        <p v-if="post.date" class="text-xs text-gray-500 mb-1">{{ post.date }}</p>
        <h3 class="text-lg font-semibold mb-2">{{ post.title }}</h3>
        <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-1 mb-2">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="text-xs bg-gray text-dark px-2 py-0.5 rounded-full"
          >
            {{ tag }}
          </span>
        </div>
        <p class="text-sm text-gray-700 mb-4 flex-1">{{ post.excerpt }}</p>
        <a
          v-if="post.url"
          :href="post.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-blue-600 underline focus:outline-none focus:ring-2 focus:ring-dark rounded"
        >
          Leer más
        </a>
        <span v-else class="text-sm text-gray-400 italic">Próximamente</span>
      </article>
    </div>
  </section>
</template>

<script>
// TODO (Fase 0 pendiente): reemplazar estos posts placeholder con contenido real (título,
// resumen, fecha, etiquetas y el link donde publicaste cada uno — Medium, Dev.to,
// LinkedIn, etc.). Mientras `url` sea null/vacío, la tarjeta muestra "Próximamente" en vez
// de un link roto. Ver docs/IMPLEMENTATION_PLAN.md tarea 1.9 — decisión confirmada por el
// usuario: mismo componente sin backend ni páginas internas de post, solo tarjetas que
// enlazan a posts publicados en otro lado.
export default {
  data() {
    return {
      posts: [
        {
          id: 1,
          title: 'Pendiente — título de tu primer post',
          excerpt: 'Pendiente — resumen real de 1-2 frases sobre este post.',
          date: null,
          tags: [],
          image: null,
          url: null,
        },
        {
          id: 2,
          title: 'Pendiente — título de tu segundo post',
          excerpt: 'Pendiente — resumen real de 1-2 frases sobre este post.',
          date: null,
          tags: [],
          image: null,
          url: null,
        },
      ],
    }
  },
}
</script>
