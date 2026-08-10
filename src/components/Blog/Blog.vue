<template>
  <section id="blog" class="py-24">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Título -->
      <div class="mb-12">
        <p class="text-accent font-semibold tracking-[0.2em] uppercase text-sm mb-2">Blog</p>
        <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tight">Artículos</h2>
        <div class="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-cyan-400 rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <article
          v-for="post in posts"
          :key="post.id"
          class="group bg-darkcard border border-darkborder rounded-2xl overflow-hidden hover:border-accent/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 transition flex flex-col"
        >
          <div
            v-if="post.image"
            class="overflow-hidden"
          >
            <img
              :src="post.image"
              :alt="post.title"
              class="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div
            v-else
            class="h-40 bg-gradient-to-br from-accent/25 via-accent2/20 to-cyan-400/10 relative flex items-center justify-center overflow-hidden"
          >
            <span class="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-accent/20 blur-2xl"></span>
            <span
              v-if="!post.url"
              class="text-xs font-semibold tracking-widest uppercase bg-dark/70 text-accentlight border border-accent/40 px-3 py-1.5 rounded-full"
            >
              Próximamente
            </span>
          </div>
          <div class="p-5 flex flex-col flex-1">
            <p v-if="post.date" class="text-xs text-gray-500 mb-1">{{ post.date }}</p>
            <h3 class="font-semibold mb-2">{{ post.title }}</h3>
            <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-1 mb-2">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="text-xs bg-accent/10 text-accentlight border border-accent/30 px-2 py-0.5 rounded-full"
              >
                {{ tag }}
              </span>
            </div>
            <p class="text-sm text-gray-500 mb-4 flex-1">{{ post.excerpt }}</p>
            <a
              v-if="post.url"
              :href="post.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-accentlight hover:text-white underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-accent rounded"
            >
              Leer más →
            </a>
            <span v-else class="text-sm text-gray-600 italic">Próximamente</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BlogSection',
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
