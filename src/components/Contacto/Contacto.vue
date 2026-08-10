<template>
  <section id="contact" class="py-24 bg-darkcard/50 border-y border-darkborder">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Título -->
      <div class="mb-12">
        <p class="text-accent font-semibold tracking-[0.2em] uppercase text-sm mb-2">Contacto</p>
        <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tight">Hablemos</h2>
        <div class="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-cyan-400 rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <!-- Panel decorativo -->
        <div
          class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent via-accent2 to-indigo-900 p-8 flex flex-col justify-between min-h-[280px]"
        >
          <div
            class="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none"
          ></div>
          <div>
            <h3 class="font-display text-2xl font-bold mb-3 text-white">
              ¿Tienes un proyecto en mente?
            </h3>
            <p class="text-white/80 leading-relaxed">
              Cuéntame tu idea y trabajemos juntos para llevarla a la web. Respondo con la mayor
              brevedad posible.
            </p>
          </div>
          <ul class="space-y-3 text-white/90 mt-8">
            <li>
              <span class="font-semibold text-white">Ubicación:</span> Venezuela · trabajo remoto
            </li>
            <li>
              <span class="font-semibold text-white">Disponibilidad:</span> proyectos y consultoría
            </li>
          </ul>
        </div>

        <!-- Formulario -->
        <div class="bg-darkcard border border-darkborder rounded-2xl p-8">
          <h3 class="font-display text-xl font-bold mb-6">Envíame un mensaje</h3>
          <form id="contact-form" class="space-y-4" @submit.prevent="handleSubmit">
            <!-- Honeypot anti-spam: invisible para una persona real, pero los bots que
                 rellenan formularios automáticamente sí lo completan. Oculto con CSS
                 (no type="hidden", que los bots detectan fácil) y excluido de lectores de
                 pantalla y del tab de teclado. -->
            <div class="hidden" aria-hidden="true">
              <label for="empresa">Empresa</label>
              <input
                id="empresa"
                v-model="form.empresa"
                type="text"
                name="empresa"
                tabindex="-1"
                autocomplete="off"
              />
            </div>
            <div>
              <label for="name" class="block text-sm font-medium text-gray-400 mb-1">Nombre</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                name="name"
                placeholder="Tu nombre"
                class="w-full bg-dark border border-darkborder rounded-lg px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/50"
                required
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-400 mb-1"
                >Correo Electrónico</label
              >
              <input
                id="email"
                v-model="form.email"
                type="email"
                name="email"
                placeholder="Tu correo electrónico"
                class="w-full bg-dark border border-darkborder rounded-lg px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/50"
                required
              />
            </div>
            <div>
              <label for="message" class="block text-sm font-medium text-gray-400 mb-1"
                >Mensaje</label
              >
              <textarea
                id="message"
                v-model="form.message"
                name="message"
                placeholder="Tu mensaje"
                class="w-full bg-dark border border-darkborder rounded-lg px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/50"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full bg-gradient-to-r from-accent to-accent2 text-white px-4 py-3 rounded-lg font-medium shadow-lg shadow-accent/30 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-dark"
            >
              Enviar mensaje
            </button>
          </form>
          <p v-if="successMessage" class="text-emerald-400 mt-4">{{ successMessage }}</p>
          <p v-if="errorMessage" class="text-red-400 mt-4">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import emailjs from 'emailjs-com'

export default {
  name: 'ContactForm',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
        empresa: '', // honeypot: debe llegar siempre vacío en un envío real
      },
      successMessage: '',
      errorMessage: '',
    }
  },
  mounted() {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
  },
  methods: {
    async handleSubmit() {
      if (this.form.empresa) {
        // Un bot rellenó el campo honeypot: abortar en silencio, sin llamar a EmailJS.
        return
      }
      try {
        // Enviar el formulario usando EmailJS
        await emailjs.sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          document.getElementById('contact-form'), // Referencia al formulario
        )
        // Mostrar mensaje de éxito
        this.successMessage = '¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.'
        this.errorMessage = ''
        this.form = { name: '', email: '', message: '', empresa: '' }
      } catch (error) {
        console.error('Error al enviar el mensaje:', error)
        this.successMessage = ''
        this.errorMessage =
          'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.'
      }
    },
  },
}
</script>
