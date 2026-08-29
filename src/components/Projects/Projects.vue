<template>
  <section id="project" class="py-24 bg-darkcard/50 border-y border-darkborder">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Título -->
      <div class="mb-12">
        <p class="text-accent font-semibold tracking-[0.2em] uppercase text-sm mb-2">Proyectos</p>
        <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tight">Mi trabajo</h2>
        <div class="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-cyan-400 rounded-full"></div>
      </div>

      <!-- Proyecto Destacado -->
      <div
        v-if="featured"
        class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 bg-darkcard border border-accent/30 rounded-2xl overflow-hidden shadow-2xl shadow-accent/10"
      >
        <div class="relative">
          <img
            :src="featured.image"
            :alt="featured.title"
            class="w-full h-full min-h-[240px] object-cover"
          />
          <span
            class="absolute top-4 left-4 text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-accent to-accent2 text-white px-3 py-1 rounded-full"
          >
            Destacado
          </span>
        </div>
        <div class="p-8 flex flex-col justify-center">
          <h3 class="font-display text-2xl font-semibold mb-3">{{ featured.title }}</h3>
          <p class="text-gray-400 mb-4 leading-relaxed">{{ featured.description }}</p>
          <div v-if="featured.tags && featured.tags.length" class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="tag in featured.tags"
              :key="tag"
              class="text-xs bg-accent/10 text-accentlight border border-accent/30 px-3 py-1 rounded-full"
            >
              {{ tag }}
            </span>
          </div>
          <a
            v-if="featured.url"
            :href="featured.url"
            target="_blank"
            rel="noopener noreferrer"
            class="self-start bg-gradient-to-r from-accent to-accent2 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-dark"
          >
            Ver proyecto
          </a>
        </div>
      </div>

      <!-- Grid de proyectos -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="group bg-darkcard border border-darkborder rounded-2xl overflow-hidden hover:border-accent/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 transition cursor-pointer"
          role="button"
          tabindex="0"
          @click="setFeatured(project)"
          @keyup.enter="setFeatured(project)"
          @keyup.space="setFeatured(project)"
        >
          <div class="overflow-hidden">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div class="p-5">
            <h3 class="font-semibold mb-1">{{ project.title }}</h3>
            <p class="text-sm text-gray-500 mb-3 line-clamp-2">{{ project.description }}</p>
            <div v-if="project.tags && project.tags.length" class="flex flex-wrap gap-1.5 mb-3">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="text-xs bg-accent/10 text-accentlight border border-accent/30 px-2 py-0.5 rounded-full"
              >
                {{ tag }}
              </span>
            </div>
            <a
              v-if="project.url"
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block text-sm text-accentlight hover:text-white underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-accent rounded"
              @click.stop
            >
              Ver proyecto →
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import tiendaTelegramImage from '../../assets/01-home.png'

export default {
  name: 'ProjectsSection',
  data() {
    const projects = [
      {
        title: 'Tienda Online Telegram',
        image: tiendaTelegramImage,
        description:
          'Plataforma de e-commerce completa que opera dentro de Telegram: el cliente navega el catálogo, compra y paga desde una Mini App (WebView), con un bot conversacional como acompañamiento. Marketplace multi-vendedor con onboarding/KYC que resuelve el ciclo real de un pedido: pago con escrow retenido hasta la entrega verificada, liquidación a vendedores y devoluciones/RMA.',
        url: 'https://staging.tiendajjonline.com',
        tags: [
          'React 19',
          'TypeScript',
          'NestJS 11',
          'PostgreSQL',
          'Prisma',
          'Redis',
          'Telegram Bot API',
          'Docker',
          'Stripe',
          'TailwindCSS',
          'TanStack Query',
          'Playwright',
        ],
      },
      {
        title: 'Food finder',
        image: 'https://picsum.photos/400/200?random=1',
        description:
          'The Food Finder application shows a list of restaurants and their locations. The user can click these to see additional details about each location. In addition, they can log in to the app with their GitHub accounts by using OAuth so that they can maintain a wish list of locations.',
        url: 'https://foodfinder-fjpa4w2uc-zped08s-projects.vercel.app/',
        tags: ['JavaScript', 'OAuth', 'APIs'],
      },
    ]
    return {
      projects,
      featured: projects[0],
    }
  },
  methods: {
    setFeatured(project) {
      this.featured = project
    },
  },
}
</script>
